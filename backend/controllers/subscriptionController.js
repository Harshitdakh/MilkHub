const Subscription = require('../models/Subscription');

/**
 * @desc    Create or Update a daily subscription
 * @route   POST /api/subscription/set-daily
 * @access  Private (Buyer Only)
 */
exports.setSubscription = async (req, res) => {
    try {
        const { category, product, price, qty } = req.body;
        const userId = req.user._id; // Extracted from 'protect' middleware

        // 1. Determine the correct unit based on the product automatically
        let unit = 'L';
        if (product === 'Paneer') unit = 'kg';
        else if (product === 'Curd' || product === 'Lassi') unit = 'pkt';

        // 2. Look for an existing subscription for this user
        let sub = await Subscription.findOne({ userId });

        if (sub) {
            // Update the existing subscription
            sub.category = category || 'milk';
            sub.milkType = product;
            sub.pricePerLiter = price;
            sub.quantity = qty;
            sub.unit = unit;
            sub.totalDailyCost = price * qty;
            sub.status = 'Pending'; // Reset status to pending for the new day
            sub.updatedAt = Date.now();

            await sub.save();
            return res.status(200).json({
                success: true,
                message: "Subscription updated successfully!",
                data: sub
            });
        }

        // 3. If no subscription exists, create a new one
        const newSub = new Subscription({
            userId,
            category: category || 'milk',
            milkType: product,
            pricePerLiter: price,
            quantity: qty,
            unit,
            totalDailyCost: price * qty,
            status: 'Pending'
        });

        await newSub.save();
        res.status(201).json({
            success: true,
            message: "Daily subscription set successfully!",
            data: newSub
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Could not set subscription.",
            error: error.message
        });
    }
};

/**
 * @desc    Get the current user's subscription
 * @route   GET /api/subscription/my-subscription
 * @access  Private
 */
exports.getMySubscription = async (req, res) => {
    try {
        const sub = await Subscription.findOne({ userId: req.user._id });

        if (!sub) {
            return res.status(200).json({
                success: false,
                data: null,
                message: "No active subscription found."
            });
        }

        res.status(200).json({
            success: true,
            data: sub
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Could not fetch subscription.",
            error: error.message
        });
    }
};