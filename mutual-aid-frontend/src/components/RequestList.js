/**RequestList.js
 * 
 * description: list component that displays all requests as cards
 * 
 */

import RequestCard from './RequestCard';
import '../styles/RequestList.css';

function RequestList({ requests, onUpdateRequest, onDeleteRequest }) {
  return (
    <div className="request-list">
      {requests.map(request => (
        <RequestCard
          key={request._id}
          request={request}
          onUpdateRequest={onUpdateRequest}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}

export default RequestList;