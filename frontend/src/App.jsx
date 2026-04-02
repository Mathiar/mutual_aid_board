/**App.js
 * 
 * description: main app component that manages request state and navigation
 * 
 */

import { useState, useEffect } from 'react';
import { getAllRequests, createRequest, updateRequest, deleteRequest } from './api';
import Header from './components/Header';
import Navigation from './components/Navigation';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';
import FilterSearch from './components/FilterSearch';
import './App.css';

function App() {
  // all request state
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // nav tabs state
  const [activeTab, setActiveTab] = useState('view-requests');
  
  // filtering + searching state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // fetch requests on component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const data = await getAllRequests();
      setRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  // add new request
  const handleAddRequest = async (newRequestData) => {
    const savedRequest = await createRequest(newRequestData);
    if (savedRequest) {
      setRequests([...requests, savedRequest]);
      
      setActiveTab('view-requests');
      // reset filters I think?
      setSearchTerm('');
      setStatusFilter('');
      setCategoryFilter('');
    }
  };

  // update request
  const handleUpdateRequest = async (id, updatedData) => {
    const updatedRequest = await updateRequest(id, updatedData);
    if (updatedRequest) {
      setRequests(requests.map(req => req._id === id ? updatedRequest : req));
    }
  };

  // delete request
  const handleDeleteRequest = async (id) => {
    const success = await deleteRequest(id);
    if (success) {
      setRequests(requests.filter(req => req._id !== id));
    }
  };

  // filters and search
  const getFilteredRequests = () => {
    let filtered = requests;

    // search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(req =>
        req.title.toLowerCase().includes(term) ||
        req.description.toLowerCase().includes(term)
      );
    }

    // status filter
    if (statusFilter) {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // category filter
    if (categoryFilter) {
      filtered = filtered.filter(req => req.category === categoryFilter);
    }

    return filtered;
  };

  // get requests for active tab
  const getTabRequests = () => {
    if (activeTab === 'help-someone') {
      // open requests on "Help Someone" tab
      return requests.filter(req => req.status === 'Open');
    }
    // "View All Requests" tab w/apply filters
    return getFilteredRequests();
  };

  const filteredRequests = getTabRequests();

  return (
    <div className="app">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-main">
        {/* Make a Request Tab */}
        {activeTab === 'make-request' && (
          <section className="tab-content">
            <RequestForm onAddRequest={handleAddRequest} />
          </section>
        )}

        {/* Help Someone Tab */}
        {activeTab === 'help-someone' && (
          <section className="tab-content">
            <h2>Open Requests - Help Someone in Need</h2>
            {loading ? (
              <p className="loading">Loading requests...</p>
            ) : (
              <>
                <p className="tab-description">
                  These requests are open and waiting for help. Click "Claim Request" to volunteer your assistance.
                </p>
                <RequestList 
                  requests={filteredRequests}
                  onUpdateRequest={handleUpdateRequest}
                  onDeleteRequest={handleDeleteRequest}
                />
                {filteredRequests.length === 0 && (
                  <p className="no-requests">No open requests at this time. Check back soon!</p>
                )}
              </>
            )}
          </section>
        )}

        {/* View All Requests Tab */}
        {activeTab === 'view-requests' && (
          <section className="tab-content">
            <h2>All Requests</h2>
            <FilterSearch 
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              onSearchChange={setSearchTerm}
              onStatusFilter={setStatusFilter}
              onCategoryFilter={setCategoryFilter}
            />
            {loading ? (
              <p className="loading">Loading requests...</p>
            ) : (
              <>
                <p className="results-count">
                  Showing {filteredRequests.length} of {requests.length} requests
                </p>
                <RequestList 
                  requests={filteredRequests}
                  onUpdateRequest={handleUpdateRequest}
                  onDeleteRequest={handleDeleteRequest}
                />
                {filteredRequests.length === 0 && (
                  <p className="no-requests">No requests match your filters. Try adjusting your search.</p>
                )}
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;