const Delivery = require('../models/deliverymodel');
const Subscription = require('../models/Subscription');

/**
 * @desc    Mark milk as delivered & create a permanent record
 * @route   POST /api/delivery/mark-delivered
 * @access  Private (Seller Only)
 */
exports.markAsDelivered = async (req, res) => {
    const { buyerId, quantity, milkType } = req.body;
    const today = new Date().toISOString().split('T')[0];

    try {
        // 1. Update the Subscription status so the Buyer's dashboard turns green
        const updatedSub = await Subscription.findOneAndUpdate(
            { userId: buyerId },
            { 
                lastDeliveryDate: today,
                status: 'Delivered' 
            },
            { new: true }
        );

        if (!updatedSub) {
            return res.status(404).json({ 
                success: false, 
                message: "No active subscription found for this buyer." 
            });
        }

        // 2. Create a permanent Delivery log for the history table and charts
        const newDelivery = new Delivery({
            sellerId: req.user._id, // Set by your 'protect' middleware
            buyerId,
            quantity: quantity || updatedSub.quantity,
            milkType: milkType || updatedSub.milkType,
            status: 'Delivered',
            date: new Date()
        });

        await newDelivery.save();

        res.status(200).json({ 
            success: true, 
            message: "Delivery marked and logged successfully!", 
            subscription: updatedSub,
            deliveryRecord: newDelivery
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error: Could not record delivery.",
            error: error.message 
        });
    }
};

/**
 * @desc    Get all delivery history for a specific buyer (for the history table)
 * @route   GET /api/delivery/buyer/:buyerId
 * @access  Private
 */
exports.getBuyerDeliveries = async (req, res) => {
    try {
        // Find all records in the delivery log for this specific user
        const deliveries = await Delivery.find({ buyerId: req.params.buyerId })
            .sort({ date: -1 }); // Show newest first

        res.status(200).json({
            success: true,
            count: deliveries.length,
            data: deliveries
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error: Could not fetch history.",
            error: error.message 
        });
    }
};