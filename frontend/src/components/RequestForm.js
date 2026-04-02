/**RequestForm.js
 * 
 * description: form component for creating new requests
 * 
 */

import { useState } from 'react';
import '../styles/RequestForm.css';

function RequestForm({ onAddRequest }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [requestorName, setRequestorName] = useState('');
  const [requestorPhone, setRequestorPhone] = useState('');
  const [requestorEmail, setRequestorEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRequest = {
      title,
      description,
      category,
      location,
      requestorName,
      requestorPhone,
      requestorEmail
    };

    onAddRequest(newRequest);

    setTitle('');
    setDescription('');
    setCategory('');
    setLocation('');
    setRequestorName('');
    setRequestorPhone('');
    setRequestorEmail('');
  };

  return (
    <div className="request-form-container">
      <h2>Create a New Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Request Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id="description"
            name="description"
            placeholder="Describe what you need help with"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category (e.g., Groceries, Transportation, etc.)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="requestorName"
            name="requestorName"
            placeholder="Your Name"
            value={requestorName}
            onChange={(e) => setRequestorName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            id="requestorPhone"
            name="requestorPhone"
            placeholder="Your Phone Number"
            value={requestorPhone}
            onChange={(e) => setRequestorPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="requestorEmail"
            name="requestorEmail"
            placeholder="Your Email"
            value={requestorEmail}
            onChange={(e) => setRequestorEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          Post Request
        </button>
      </form>
    </div>
  );
}

export default RequestForm;