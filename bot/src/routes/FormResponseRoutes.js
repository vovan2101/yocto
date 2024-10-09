const express = require('express');
const { saveFormResponse, getFormResponse } = require('../controllers/FormResponseController');

const router = express.Router();

// Роут для сохранения данных формы
router.post('/', saveFormResponse);

// Роут для получения данных формы по id
router.get('/:id', getFormResponse);

router.get('/device/:device_id', getFormResponse);

module.exports = router;
