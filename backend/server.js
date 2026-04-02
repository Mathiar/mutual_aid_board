/**server.js
 * 
 * description: server file for Mutual Aid Baord
 * 
 */

// Import libraries
const express = require('express');
require('dotenv').config();
require('./config/db');
const requestRoutes = require('./routes/requests');

// Create app object
const app = express();

// Server settings
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Import CORS
const cors = require('cors');  
app.use(cors());

// Routes
app.get('/', (request, response) => {
  response.status(200).json({ message: 'Welcome to Mutual Aid Board API' });
});

// Use the requests router
app.use('/requests', requestRoutes);

// Catch-all route for unknown paths
app.use((request, response) => {
  response.status(404).json({ message: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});