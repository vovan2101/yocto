const { AppDataSource } = require('../config/data-source');
const FormResponse = require('../entities/FormResponse');

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

    if (formResponse) {
      console.log('Обновление существующей записи:', formResponse);
      // Обновляем существующую запись
      repository.merge(formResponse, data);
    } else {
      console.log('Создание новой записи');
      // Создаем новую запись
      formResponse = repository.create({ device_id, ...data });
    }

    // Сохраняем запись
    const result = await repository.save(formResponse);
    console.log('Результат сохранения:', result);

    return res.json(result);
  } catch (error) {
    console.error('Ошибка при сохранении данных формы:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Получить данные формы
const getFormResponse = async (req, res) => {
  try {
    const repository = AppDataSource.getRepository(FormResponse);
    const { device_id } = req.params;

    console.log('Получение данных формы для device_id:', device_id);

    const response = await repository.findOne({ where: { device_id } });

    if (!response) {
      console.warn('Данные формы не найдены для device_id:', device_id);
      return res.status(404).json({ message: 'Response not found' });
    }

    console.log('Найденные данные формы:', response);

    if (response.industry === null) {
      response.industry = [];
    }
    if (response.customer_acquisition === null) {
      response.customer_acquisition = [];
    }
    if (response.product === null) {
      response.product = [];
    }
    if (response.business_model === null) {
      response.business_model = [];
    }

    return res.json(response);
  } catch (error) {
    console.error('Ошибка при получении данных формы:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveFormResponse,
  getFormResponse,
};
