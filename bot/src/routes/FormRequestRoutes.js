// routes/formRequestRoutes.js
const express = require('express');
const router = express.Router();
const { saveFormRequest } = require('../controllers/FormRequestController');

router.post('/', saveFormRequest);

module.exports = router;