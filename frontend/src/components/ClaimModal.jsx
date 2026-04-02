/**ClaimModal.js
 * 
 * description: modal component for collecting helper information when claiming a request
 * 
 */

import { useState } from 'react';
import '../styles/ClaimModal.css';

function ClaimModal({ request, onClaim, onClose }) {

  const [helperName, setHelperName] = useState('');
  const [helperPhone, setHelperPhone] = useState('');
  const [helperEmail, setHelperEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!helperName.trim()) {
      setError('Helper name is required');
      return;
    }

    const claimData = {
      status: 'Claimed',
      helperName,
      helperPhone,
      helperEmail
    };

    onClaim(request._id, claimData);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Claim Request</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="request-title">"{request.title}"</p>
          <p className="request-description">by {request.requestorName}</p>

          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="helperName">Your Name *</label>
              <input
                type="text"
                id="helperName"
                placeholder="Enter your name"
                value={helperName}
                onChange={(e) => {
                  setHelperName(e.target.value);
                  setError('');
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="helperPhone">Phone Number</label>
              <input
                type="tel"
                id="helperPhone"
                placeholder="Enter your phone number"
                value={helperPhone}
                onChange={(e) => setHelperPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="helperEmail">Email Address</label>
              <input
                type="email"
                id="helperEmail"
                placeholder="Enter your email address"
                value={helperEmail}
                onChange={(e) => setHelperEmail(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Claim Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClaimModal;