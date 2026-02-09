const express = require('express');
const router = express.Router();
const { markAsDelivered, getBuyerDeliveries } = require('../controllers/deliveryController');
const { protect, sellerOnly } = require('../middleware/authMiddleware');
const { setSubscription, getMySubscription } = require('../controllers/subscriptionController');

// POST: Mahavir marks milk as delivered (Protected + Seller Only)
// Maps to: POST /api/delivery/mark-delivered
router.post('/mark-delivered', protect, sellerOnly, markAsDelivered);

// GET: Buyer fetches their own delivery status
// Maps to: GET /api/delivery/buyer/:buyerId
router.get('/buyer/:buyerId', protect, getBuyerDeliveries);

module.exports = router;