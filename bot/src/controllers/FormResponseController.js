const { AppDataSource } = require('../config/data-source');
const FormResponse = require('../entities/FormResponse');

// Сохранить данные формы
const saveFormResponse = async (req, res) => {
  try {
    const repository = AppDataSource.getRepository(FormResponse);
    const { device_id, ...data } = req.body;

    if (!device_id) {
      return res.status(400).json({ message: 'Device ID is required' });
    }

    let formResponse = await repository.findOne({ where: { device_id } });

    if (formResponse) {
      // Обновляем существующую запись
      repository.merge(formResponse, data);
    } else {
      // Создаем новую запись
      formResponse = repository.create({ device_id, ...data });
    }

    // Сохраняем запись
    const result = await repository.save(formResponse);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Получить данные формы
const getFormResponse = async (req, res) => {
  try {
    const repository = AppDataSource.getRepository(FormResponse);
    const { device_id } = req.params;
    const response = await repository.findOne({ where: { device_id } });

    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
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
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  saveFormResponse,
  getFormResponse,
};
