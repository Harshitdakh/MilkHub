const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity: {
    type: Number,
    required: true // e.g., 1.5, 0.5, or 10
  },
  unit: {
    type: String,
    enum: ['L', 'kg', 'pkt'],
    default: 'L'
  },
  productType: {
    type: String,
    // Expanded to include your new product line
    enum: ['Buffalo', 'Cow', 'Paneer', 'Curd', 'Lassi'],
    required: true
  },
  status: {
    type: String,
    enum: ['Delivered', 'Pending', 'Cancelled'],
    default: 'Delivered'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  // timestamps adds createdAt and updatedAt automatically
  timestamps: true 
});

module.exports = mongoose.model('Delivery', deliverySchema);