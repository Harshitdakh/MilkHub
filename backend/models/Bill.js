const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: Number, // 1 for Jan, 2 for Feb, etc.
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  totalLiters: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Bill', billSchema);