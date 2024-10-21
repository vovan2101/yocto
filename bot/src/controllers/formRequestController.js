// controllers/formRequestController.js
const { AppDataSource } = require('../config/data-source');
const FormRequest = require('../entities/FormRequest');

exports.saveFormRequest = async (req, res) => {
  const { device_id, type, form_name } = req.body;
  try {
    const formRequestRepository = AppDataSource.getRepository('FormRequest');
    const newRequest = formRequestRepository.create({
      device_id,
      type,
      form_name,
    });
    await formRequestRepository.save(newRequest);
    res.status(200).json({ message: 'Form request saved successfully' });
  } catch (error) {
    console.error('Error saving form request:', error);
    res.status(500).json({ message: 'Error saving form request' });
  }
};
