const express = require('express');
const router = express.Router();
const { generatePDF, getNextBillNumber } = require('../controllers/pdf.controller');

router.post('/generate-pdf', generatePDF);
router.get('/next-bill-number', getNextBillNumber);

module.exports = router;
