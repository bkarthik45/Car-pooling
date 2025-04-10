import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import cors from 'cors';
import connectDB from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js'

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

//Load Routes

app.use("/api/user", userRoutes)

// Set up environment variables
const PORT = process.env.PORT || 8000; // Fallback if PORT is not in .env
const DATABASE_URL = process.env.DATABASE_URL;

// Database Connection
connectDB(DATABASE_URL);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
