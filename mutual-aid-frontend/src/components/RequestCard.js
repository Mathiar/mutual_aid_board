/**RequestCard.js
 * 
 * description: individual request card component with action buttons
 * 
 */

import { useState } from 'react';
import ClaimModal from './ClaimModal';
import '../styles/RequestCard.css';

function RequestCard({ request, onUpdateRequest, onDeleteRequest }) {
  const [showClaimModal, setShowClaimModal] = useState(false);

  const handleOpenClaimModal = () => {
    setShowClaimModal(true);
  };

  const handleCloseClaimModal = () => {
    setShowClaimModal(false);
  };

  const handleClaim = (id, claimData) => {
    onUpdateRequest(id, claimData);
    setShowClaimModal(false);
  };

  const handleComplete = () => {
    onUpdateRequest(request._id, { status: 'Completed' });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      onDeleteRequest(request._id);
    }
  };

  const getStatusClass = () => {
    switch (request.status) {
      case 'Open':
        return 'status-open';
      case 'Claimed':
        return 'status-claimed';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <>
      <div className={`request-card ${getStatusClass()}`}>
        <div className="card-header">
          <h3>{request.title}</h3>
          <span className={`status-badge ${getStatusClass()}`}>
            {request.status}
          </span>
        </div>

        <div className="card-body">
          <p className="description">{request.description}</p>

          <div className="card-info">
            <div className="info-item">
              <strong>Category:</strong> {request.category}
            </div>
            {request.location && (
              <div className="info-item">
                <strong>Location:</strong> {request.location}
              </div>
            )}
            <div className="info-item">
              <strong>Requested by:</strong> {request.requestorName}
            </div>
            {request.requestorPhone && (
              <div className="info-item">
                <strong>Phone:</strong> {request.requestorPhone}
              </div>
            )}
            {request.requestorEmail && (
              <div className="info-item">
                <strong>Email:</strong> {request.requestorEmail}
              </div>
            )}
          </div>

          {request.status === 'Claimed' && request.helperName && (
            <div className="helper-info">
              <h4>Helper Information:</h4>
              <div className="info-item">
                <strong>Helper:</strong> {request.helperName}
              </div>
              {request.helperPhone && (
                <div className="info-item">
                  <strong>Phone:</strong> {request.helperPhone}
                </div>
              )}
              {request.helperEmail && (
                <div className="info-item">
                  <strong>Email:</strong> {request.helperEmail}
                </div>
              )}
            </div>
          )}

          <div className="card-timestamps">
            <small>Posted: {new Date(request.createdTimestamp).toLocaleString()}</small>
            {request.claimedTimestamp && (
              <small>Claimed: {new Date(request.claimedTimestamp).toLocaleString()}</small>
            )}
            {request.completedTimestamp && (
              <small>Completed: {new Date(request.completedTimestamp).toLocaleString()}</small>
            )}
          </div>
        </div>

        <div className="card-actions">
          {request.status === 'Open' && (
            <button className="btn-claim" onClick={handleOpenClaimModal}>
              Claim Request
            </button>
          )}
          {request.status === 'Claimed' && (
            <button className="btn-complete" onClick={handleComplete}>
              Mark Complete
            </button>
          )}
          <button className="btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {showClaimModal && (
        <ClaimModal
          request={request}
          onClaim={handleClaim}
          onClose={handleCloseClaimModal}
        />
      )}
    </>
  );
}

export default RequestCard;