const express = require('express');
const router = express.Router();
const { searchMedicines, addMedicine } = require('../controllers/medicine.controller');
const { requireAuth } = require('../middleware/auth.middleware');

// Protect all medicine routes
router.use(requireAuth);

router.get('/search', searchMedicines);
router.post('/', addMedicine);

module.exports = router;
