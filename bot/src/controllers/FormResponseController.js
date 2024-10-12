const { AppDataSource } = require('../config/data-source');
const FormResponse = require('../entities/FormResponse');

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
      ['industry', 'customer_acquisition', 'product', 'business_model'].forEach((field) => {
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
  

module.exports = {
  saveFormResponse,
  getFormResponse,
};