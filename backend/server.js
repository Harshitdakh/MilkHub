const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. Middleware
app.use(cors({
  origin: ["https://milkhub-rho.vercel.app", "http://localhost:5173"], // Add your Vercel URL here
  credentials: true
})); // ALLOWS REACT TO CONNECT (Critical for your demo)
app.use(express.json()); // Essential to read req.body data

// 4. API Routes
// We mount each route file to a specific path
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));

/**
 * 5. Integrated Route: Fetch Buyers for Mahavir's Dashboard
 * We keep this here or move to a separate userRoute. 
 * This fulfills the SellerDashboard table requirement.
 */
app.get('/api/users/buyers', async (req, res) => {
    try {
        console.log("Fetching buyers for Mahavir Dhud...");
        // Filters only users with the 'buyer' role
        const buyers = await User.find({ role: 'buyer' }).select('-password'); 
        console.log(`Found ${buyers.length} buyers in Mandsaur.`);
        res.status(200).json(buyers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching buyers", error: error.message });
    }
});

// 6. Root/Test Route
app.get('/', (req, res) => {
    res.send('MilkHub API is running smoothly...');
});

// 7. Error Handling Middleware (For a professional finish)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// 8. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
    🚀 Server running on port ${PORT}
    📍 Environment: ${process.env.NODE_ENV || 'development'}
    🥛 MilkHub API Ready
    `);
});