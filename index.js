import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';

const app = express();

// Middleware should be applied BEFORE routes
app.use(cors());
app.use(express.json());

// Content Security Policy middleware
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy",
        "default-src 'self'; connect-src 'self' https://localhost:3001;"
    );
    next();
});

const PORT = process.env.PORT || 3001;
const MONGO_URI = "mongodb://127.0.0.1:27017/ecom";

// Root route
app.get('/', (req, res) => {
    res.json('Hello, World!');
});

// Use product routes - this was imported but never used
app.use('/api/products', productRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB locally');

        // Start server AFTER successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });