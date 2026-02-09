const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// POST: Save or Update Daily Subscription
router.post('/set-daily', async (req, res) => {
  const { userId, milkType, price, qty } = req.body;

  try {
    // Look for existing subscription for this user
    let sub = await Subscription.findOne({ userId });

    if (sub) {
      // Update existing
      sub.milkType = milkType;
      sub.pricePerLiter = price;
      sub.quantity = qty;
      sub.totalDailyCost = price * qty;
      sub.updatedAt = Date.now();
      await sub.save();
    } else {
      // Create new
      sub = new Subscription({
        userId,
        milkType,
        pricePerLiter: price,
        quantity: qty,
        totalDailyCost: price * qty
      });
      await sub.save();
    }
    res.status(200).json({ message: "Subscription saved successfully!", data: sub });
  } catch (err) {
    res.status(500).json({ error: "Server Error: Could not save subscription" });
  }
});

module.exports = router;