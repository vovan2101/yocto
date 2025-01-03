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

// Проверить, отправлял ли пользователь формы выбранным инвесторам
const checkInvestors = async (req, res) => {
  try {
    const { device_id, selected_investors, company_name, company_website } = req.body;

    if (!device_id || !selected_investors) {
      return res.status(400).json({ message: 'Selected investors are required' });
    }

    const specialDeviceId = 'aa20d0ba-ee7b-433f-bfd2-174b284be8f2';
    const anotherSpecialDeviceId = 'a9c0edce-df09-4d22-9f5b-768c6d075900';

    // Если это особый device_id, пропускаем проверки
    if (device_id === specialDeviceId || anotherSpecialDeviceId) {
      return res.json({ canSubmit: true });
    }

    const repository = AppDataSource.getRepository(FormResponse);

    // Найти все записи с таким же company_name и company_website (независимо от регистра)
    const existingForms = await repository.find({
      where: {
        company_name: ILike(company_name),
        company_website: ILike(company_website),
      },
    });

    let alreadySentInvestors = [];

    if (existingForms && existingForms.length > 0) {
      for (const form of existingForms) {
        const sentInvestors = form.sent_investors || [];
        alreadySentInvestors = selected_investors.filter(investor => sentInvestors.includes(investor));

        // Если форма была отправлена всем выбранным инвесторам
        if (alreadySentInvestors.length === selected_investors.length) {
          return res.json({
            canSubmit: false,
            message: 'You have already submitted forms to all selected investors.',
            alreadySentInvestors: [],
          });
        }
      }
    }

    if (alreadySentInvestors.length > 0) {
      // Если форма была отправлена не всем выбранным инвесторам
      return res.json({
        canSubmit: false,
        message: `Forms have already been submitted to the following investors: ${alreadySentInvestors.join(', ')}. Please remove these investors from your selection and try again.`,
        alreadySentInvestors,
      });
    }

    // Продолжаем с существующей логикой
    let userForm = await repository.findOne({ where: { device_id } });

    if (!userForm) {
      userForm = repository.create({
        device_id,
        company_name,
        company_website,
        sent_investors: selected_investors,
      });
    } else {
      userForm.company_name = company_name;
      userForm.company_website = company_website;

      const sentInvestors = userForm.sent_investors || [];
      const investorsToSend = selected_investors.filter(investor => !sentInvestors.includes(investor));

      if (investorsToSend.length > 0) {
        userForm.sent_investors = Array.from(new Set([...sentInvestors, ...investorsToSend]));
      } else {
        return res.json({
          canSubmit: false,
          message: 'You have already submitted forms to all selected investors.',
          alreadySentInvestors: [],
        });
      }
    }

    await repository.save(userForm);
    return res.json({ canSubmit: true });
  } catch (error) {
    console.error('Error checking investors:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  saveFormResponse,
  getFormResponse,
  checkInvestors,
};
