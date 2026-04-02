/**requests.js
 * 
 * description: route definitions for the requests resource
 * 
 */

// Import libraries
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Routes for requests
// GET all requests
router.get('/', requestController.getAllRequests);

// GET a single request by ID
router.get('/:id', requestController.getRequestById);

// POST a new request
router.post('/', requestController.createRequest);

// PUT update a request
router.put('/:id', requestController.updateRequest);

// DELETE a request
router.delete('/:id', requestController.deleteRequest);

// Export the router
module.exports = router;