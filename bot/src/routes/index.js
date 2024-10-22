const express = require('express');
const formResponseRoutes = require('./FormResponseRoutes'); // Ваши маршруты для FormResponse
const formRequestRoutes = require('./FormRequestRoutes');

const router = express.Router();

// Подключаем маршруты формы
router.use('/form-response', formResponseRoutes);
router.use('/', formRequestRoutes); // Подключаем formRequestRoutes

module.exports = router;