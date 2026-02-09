const express = require('express');
const router = express.Router();
// We import the logic from the controller file
const { setSubscription, getMySubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/subscription/set-daily
 * @desc    Save or Update a buyer's daily dairy order
 */
router.post('/set-daily', protect, setSubscription);

/**
 * @route   GET /api/subscription/my-subscription
 * @desc    Fetch the current user's active subscription
 */
router.get('/my-subscription', protect, getMySubscription);

module.exports = router;