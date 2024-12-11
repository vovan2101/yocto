const express = require('express');
const { saveFormResponse, getFormResponse, checkInvestors, deleteUserData } = require('../controllers/FormResponseController');

const router = express.Router();

// Роут для сохранения данных формы
router.post('/', saveFormResponse);

// Роут для получения данных формы по id
router.get('/:id', getFormResponse);

router.get('/device/:device_id', getFormResponse);

// Проверить инвесторов перед отправкой формы
router.post('/check-investors', checkInvestors);

// Роут для проверки и обновления статусов инвесторов
router.post('/check-status', checkAndUpdateFormStatus);

// Route for deleting user data
router.delete('/delete-data', deleteUserData);

module.exports = router;
