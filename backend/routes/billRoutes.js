const express = require('express');
const router = express.Router();
const { generateBill } = require('../controllers/billController');
const { protect, sellerOnly } = require('../middleware/authMiddleware');

// Only the Seller should be able to generate or update bills
router.post('/generate', protect, sellerOnly, generateBill);

module.exports = router;