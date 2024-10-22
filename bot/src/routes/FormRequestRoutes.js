// routes/formRequestRoutes.js
const express = require('express');
const router = express.Router();
const { saveFormRequest } = require('../controllers/formRequestController');

router.post('/', saveFormRequest);

module.exports = router;
