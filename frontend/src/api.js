/**api.js
 * 
 * description: utility functions for calling the backend API
 * 
 */

const API_URL = `${import.meta.env.VITE_API_URL}/requests`;

// GET all requests
export const getAllRequests = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch requests');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
};

// GET a single request by ID
export const getRequestById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch request');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching request:', error);
    return null;
  }
};

// POST create a new request
export const createRequest = async (requestData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    if (!response.ok) {
      throw new Error('Failed to create request');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating request:', error);
    return null;
  }
};

// PUT update a request
export const updateRequest = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) {
      throw new Error('Failed to update request');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating request:', error);
    return null;
  }
};

// DELETE a request
export const deleteRequest = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete request');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting request:', error);
    return null;
  }
};