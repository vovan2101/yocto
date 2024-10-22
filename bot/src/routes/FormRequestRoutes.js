// routes/formRequestRoutes.js
const express = require('express');
const router = express.Router();
const { saveFormRequest } = require('../controllers/formRequestController');

router.post('/form-requests', saveFormRequest);

module.exports = router;