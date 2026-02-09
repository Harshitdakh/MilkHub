const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['milk', 'dairy'], 
    default: 'milk' 
  },
  // We keep the name milkType but it now stores 'Cow', 'Buffalo', 'Paneer', 'Curd', or 'Lassi'
  milkType: { 
    type: String, 
    required: true 
  }, 
  pricePerLiter: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  // Essential for distinguishing between Liters of milk and Kilograms of Paneer
  unit: { 
    type: String, 
    enum: ['L', 'kg', 'pkt'], 
    default: 'L' 
  },
  totalDailyCost: { 
    type: Number, 
    required: true 
  },
  // Controls the "Pending" vs "Delivered" status on both dashboards
  status: { 
    type: String, 
    enum: ['Pending', 'Delivered'], 
    default: 'Pending' 
  },
  // Used to reset the status to 'Pending' if the date changes
  lastDeliveryDate: { 
    type: String 
  }, 
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  // Automatically adds createdAt and updatedAt fields
  timestamps: true 
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);