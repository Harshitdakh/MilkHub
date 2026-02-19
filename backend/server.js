const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const User = require('./models/User');
const mongoose = require('mongoose');

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. Middleware
// CORS: Updated with your specific MilkHub URLs
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "https://milkhub-rho.vercel.app",
    "https://milk-hub-one.vercel.app" // Adding the one from your link
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        // Match any Vercel deployment URL
        if (/\.vercel\.app$/.test(origin)) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            console.log("CORS Blocked Origin:", origin); // Helpful for debugging
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(helmet());

// 4. API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));

/**
 * 5. Integrated Route: Fetch Buyers for Mahavir's Dashboard
 */
app.get('/api/users/buyers', async (req, res) => {
    try {
        const buyers = await User.find({ role: 'buyer' }).select('-password');
        res.status(200).json(buyers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching buyers", error: error.message });
    }
});

// 6. Root/Test Route
app.get('/', (req, res) => {
    res.send('MilkHub API is running smoothly...');
});

// 7. Health Check Endpoint
app.get('/api/health', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
    res.status(dbState === 1 ? 200 : 503).json({
        status: dbState === 1 ? 'ok' : 'degraded',
        db: dbStatus[dbState] || 'unknown',
        uptime: Math.floor(process.uptime()) + 's',
        timestamp: new Date().toISOString()
    });
});

// 7. Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// 8. Start the Server
// For Render, we want it to listen on the assigned PORT immediately.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
    🚀 Server running on port ${PORT}
    📍 Environment: ${process.env.NODE_ENV || 'development'}
    🥛 MilkHub API Ready
    `);
});

module.exports = app;