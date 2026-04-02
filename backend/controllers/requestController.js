/**requestController.js
 * 
 * description: controller functions for CRUD operations on requests
 * 
 */

const Request = require('../models/Request.js');

// GET all requests
exports.getAllRequests = async (request, response) => {
  try {
    const requests = await Request.find();
    response.status(200).json(requests);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

// GET a single request by ID
exports.getRequestById = async (request, response) => {
  try {
    const requestData = await Request.findById(request.params.id);
    if (!requestData) {
      return response.status(404).json({ message: 'Request not found' });
    }
    response.status(200).json(requestData);
  } catch (error) {
    response.status(500).json({ message: 'Error fetchning request', error: error.message });
  }
};

// POST create a new request
exports.createRequest = async (request, response) => {
  try {
    const newRequest = new Request({
      title: request.body.title,
      description: request.body.description,
      category: request.body.category,
      location: request.body.location,
      requestorName: request.body.requestorName,
      requestorPhone: request.body.requestorPhone,
      requestorEmail: request.body.requestorEmail,
      status: 'Open'
    });

    const savedRequest = await newRequest.save();
    response.status(201).json(savedRequest);
  } catch (error) {
    response.status(400).json({ message: 'Error creating request', error: error.message });
  }
};

// PUT update a request
exports.updateRequest = async (request, response) => {
  try {
    const requestData = await Request.findById(request.params.id);
    if (!requestData) {
      return response.status(404).json({ message: 'Request not found' });
    }

    // Update fields if provided
    if (request.body.title) requestData.title = request.body.title;
    if (request.body.description) requestData.description = request.body.description;
    if (request.body.category) requestData.category = request.body.category;
    if (request.body.location) requestData.location = request.body.location;
    if (request.body.requestorName) requestData.requestorName = request.body.requestorName;
    if (request.body.requestorPhone) requestData.requestorPhone = request.body.requestorPhone;
    if (request.body.requestorEmail) requestData.requestorEmail = request.body.requestorEmail;
    if (request.body.helperName) requestData.helperName = request.body.helperName;
    if (request.body.helperPhone) requestData.helperPhone = request.body.helperPhone;
    if (request.body.helperEmail) requestData.helperEmail = request.body.helperEmail;
    if (request.body.status) {
      requestData.status = request.body.status;
      // Auto-set timestamps when status changes
      if (request.body.status === 'Claimed') {
        requestData.claimedTimestamp = new Date();
      }
      if (request.body.status === 'Completed') {
        requestData.completedTimestamp = new Date();
      }
    }

    const updatedRequest = await requestData.save();
    response.status(200).json(updatedRequest);
  } catch (error) {
    response.status(400).json({ message: 'Error updating request', error: error.message });
  }
};

// DELETE a request
exports.deleteRequest = async (request, response) => {
  try {
    const requestData = await Request.findByIdAndDelete(request.params.id);
    if (!requestData) {
      return response.status(404).json({ message: 'Request not found' });
    }
    response.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    response.status(500).json({ message: 'Error deleting request', error: error.message });
  }
};