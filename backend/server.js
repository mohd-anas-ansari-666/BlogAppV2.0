const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const serverless = require('serverless-http'); // Import serverless-http for vercel
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Use CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization, x-auth-token'
}));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blog'));

// config for local system 
// Set the port
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Config for Vercel
// Export the handler for Vercel serverless functions
// module.exports.handler = serverless(app); // Wrap the app in serverless-http
