const express = require('express');
const formResponseRoutes = require('./FormResponseRoutes'); // Ваши маршруты для FormResponse

const router = express.Router();

// Подключаем маршруты формы
router.use('/form-response', formResponseRoutes);

module.exports = router;