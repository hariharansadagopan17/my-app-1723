import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors

import productRoutes from './routes/productRoutes.js'; // Import product routes

const port = 5000;
dotenv.config(); // Load environment variables from .env file

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});

// Middleware
app.use(cors()); // Use cors middleware

// Basic route
app.get('/', (req, res) => {
    res.send('Express server is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Mount product routes
app.use('/api/products', productRoutes);