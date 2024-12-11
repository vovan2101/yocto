const { AppDataSource } = require('../config/data-source');
const FormResponse = require('../entities/FormResponse');
const { ILike } = require('typeorm');

// Получить данные формы
const getFormResponse = async (req, res) => {
  try {
    const repository = AppDataSource.getRepository(FormResponse);
    const { device_id } = req.params;

    console.log('Получение данных формы для device_id:', device_id);

    if (!device_id) {
      console.warn('Device ID is required in params');
      return res.status(400).json({ message: 'Device ID is required' });
    }

    const response = await repository.findOne({ where: { device_id } });

    console.log('Результат поиска в базе данных:', response);

    if (!response) {
      console.warn('Данные формы не найдены для device_id:', device_id);
      return res.status(404).json({ message: 'Response not found' });
    }

    // Приведение полей с null к пустым массивам
    ['industry', 'customer_acquisition', 'product', 'business_model', 'selected_investors'].forEach((field) => {
      if (response[field] === null) {
        response[field] = [];
      }
    });

    return res.json(response);
  } catch (error) {
    console.error('Ошибка при получении данных формы:', error);
    return res.status(500).json({ message: error.message });
  }
};

// Сохранить данные формы
const saveFormResponse = async (req, res) => {
  try {
    const repository = AppDataSource.getRepository(FormResponse);
    const { device_id, ...data } = req.body;

    console.log('Сохранение данных формы:', { device_id, data });

    if (!device_id) {
      console.warn('Device ID is required');
      return res.status(400).json({ message: 'Device ID is required' });
    }

    let formResponse = await repository.findOne({ where: { device_id } });

    console.log('Результат поиска при сохранении:', formResponse);

    if (formResponse) {
      console.log('Обновление существующей записи для device_id:', device_id);
      // Обновляем существующую запись
      repository.merge(formResponse, data);
    } else {
      console.log('Создание новой записи для device_id:', device_id);
      // Создаем новую запись
      formResponse = repository.create({ device_id, ...data });
    }

    // Сохраняем запись
    const result = await repository.save(formResponse);
    console.log('Результат сохранения:', result);

    return res.json(result);
  } catch (error) {
    console.error('Ошибка при сохранении данных формы:', error);
    return res.status(500).json({ message: error.message });
  }
};

const checkInvestors = async (req, res) => {
  try {
    const { device_id, selected_investors, company_name, company_website } = req.body;

    if (!device_id || !selected_investors) {
      return res.status(400).json({ message: 'Selected investors are required' });
    }

    const repository = AppDataSource.getRepository(FormResponse);

    const existingForms = await repository.find({
      where: {
        company_name: ILike(company_name),
        company_website: ILike(company_website),
      },
    });

    let investorsToSubmit = [...selected_investors];

    if (existingForms && existingForms.length > 0) {
      for (const form of existingForms) {
        const sentInvestors = form.sent_investors || [];
        const statuses = form.status || {};

        investorsToSubmit = investorsToSubmit.filter((investor) => {
          if (sentInvestors.includes(investor)) {
            return statuses[investor] === 'error'; // Оставляем только тех, у кого была ошибка
          }
          return true; // Остальные ещё не были отправлены
        });
      }
    }

    // Если нет инвесторов для отправки
    if (investorsToSubmit.length === 0) {
      return res.json({ canSubmit: false });
    }

    const form = existingForms[0] || repository.create({ device_id, company_name, company_website });

    // Обновляем список отправленных инвесторов
    form.sent_investors = Array.from(new Set([...(form.sent_investors || []), ...investorsToSubmit]));

    // Устанавливаем начальный статус для новых отправок
    form.status = {
      ...(form.status || {}),
      ...investorsToSubmit.reduce((acc, investor) => {
        acc[investor] = 'pending'; // Изначально статус "pending"
        return acc;
      }, {}),
    };

    await repository.save(form);

    return res.json({ canSubmit: true });
  } catch (error) {
    console.error('Error checking investors:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const checkAndUpdateFormStatus = async (req, res) => {
  try {
    const { device_id, company_name, company_website } = req.body;

    if (!device_id || !company_name || !company_website) {
      return res.status(400).json({ message: 'Invalid parameters' });
    }

    const repository = AppDataSource.getRepository(FormResponse);

    const form = await repository.findOne({
      where: {
        company_name: ILike(company_name),
        company_website: ILike(company_website),
        device_id,
      },
    });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const statuses = form.status || {};

    // Обновляем только статусы с "pending"
    const updatedStatuses = { ...statuses };
    for (const investor in statuses) {
      if (statuses[investor] === 'pending') {
        const newStatus = await checkRealStatusUpdate(investor); // Замените на реальный вызов API
        updatedStatuses[investor] = newStatus || 'error';
      }
    }

    form.status = updatedStatuses;
    await repository.save(form);

    return res.status(200).json({ status: 'updated' });
  } catch (error) {
    console.error('Error checking and updating form status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const checkRealStatusUpdate = async (investor) => {
  try {
    // Реальный запрос к API для проверки статуса
    const response = await fetch(`https://api.investors.com/status/${investor}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${process.env.API_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch status');
    }

    const data = await response.json();
    return data.status; // Предполагается, что API возвращает "success" или "error"
  } catch (error) {
    console.error(`Error checking status for investor ${investor}:`, error);
    return 'error'; // В случае ошибки возвращаем статус "error"
  }
};



const deleteUserData = async (req, res) => {
  try {
    const { device_id } = req.body;

    if (!device_id) {
      return res.status(400).json({ success: false, message: 'Device ID is required' });
    }

    const repository = AppDataSource.getRepository(FormResponse);
    const result = await repository.delete({ device_id });

    if (result.affected > 0) {
      return res.json({ success: true, message: 'Data deleted successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'Data not found for the provided device ID' });
    }
  } catch (error) {
    console.error('Error deleting user data:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = {
  saveFormResponse,
  getFormResponse,
  checkInvestors,
  deleteUserData,
  checkAndUpdateFormStatus,
  checkRealStatusUpdate
};
