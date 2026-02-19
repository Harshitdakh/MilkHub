const express = require('express');
const router = express.Router();
const { generateBill, getBuyerBills } = require('../controllers/billController');
const { protect, sellerOnly } = require('../middleware/authMiddleware');

// Only the Seller should be able to generate or update bills
router.post('/generate', protect, sellerOnly, generateBill);

// Any authenticated user can view bills for a buyer
router.get('/buyer/:buyerId', protect, getBuyerBills);

module.exports = router;