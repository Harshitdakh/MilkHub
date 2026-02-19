const Bill = require('../models/Bill');
const Delivery = require('../models/deliverymodel');

// @desc    Generate/Calculate bill for a buyer for a specific month
// @route   POST /api/bills/generate
exports.generateBill = async (req, res) => {
  try {
    const { buyerId, month, year, ratePerLiter } = req.body;

    // 1. Find all 'delivered' entries for this buyer in that month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const deliveries = await Delivery.find({
      buyerId,
      date: { $gte: startDate, $lte: endDate },
      status: 'delivered'
    });

    // 2. Calculate total liters
    const totalLiters = deliveries.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = totalLiters * ratePerLiter;

    // 3. Save or Update the bill
    const bill = await Bill.findOneAndUpdate(
      { buyerId, month, year },
      {
        sellerId: req.user._id,
        totalLiters,
        totalAmount,
        status: 'unpaid'
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, data: bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all bills for a buyer
 * @route   GET /api/bills/buyer/:buyerId
 * @access  Private
 */
exports.getBuyerBills = async (req, res) => {
  try {
    const bills = await Bill.find({ buyerId: req.params.buyerId })
      .sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};