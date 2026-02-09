const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Identity Information
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true // Essential for Mandsaur delivery tracking
  },

  // Role Management for Separate Dashboards
  role: { 
    type: String, 
    enum: ['buyer', 'seller'], 
    default: 'buyer',
    required: true 
  },

  // Professional Product Subscriptions (Paneer, Curd, Chass, Lassi)
  subscriptions: [{
    productName: { 
      type: String, 
      enum: ['Milk', 'Paneer', 'Curd', 'Chass', 'Lassi'] 
    },
    quantity: { 
      type: Number, 
      default: 0 // Liters for liquids, Kg for Paneer
    },
    frequency: { 
      type: String, 
      enum: ['Daily', 'Alternate', 'On-Call'],
      default: 'Daily' 
    }
  }],

  // Chart Data: Tracks monthly details for billing analytics
  monthlyStats: [{
    month: { 
      type: String // Format: "Feb 2026"
    }, 
    totalLiters: { 
      type: Number, 
      default: 0 
    },
    totalAmount: { 
      type: Number, 
      default: 0 
    }
  }],

  // Language & UI Preferences
  language: { 
    type: String, 
    enum: ['en', 'hi'], 
    default: 'en' 
  }

}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);