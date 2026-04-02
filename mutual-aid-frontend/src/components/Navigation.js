import '../styles/Navigation.css';

/**Navigation.js
 * 
 * description: navigation menu component for switching between views
 * 
 */

function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="navigation">
      <button
        className={`nav-button ${activeTab === 'make-request' ? 'active' : ''}`}
        onClick={() => onTabChange('make-request')}
      >
        Make a Request
      </button>
      <button
        className={`nav-button ${activeTab === 'help-someone' ? 'active' : ''}`}
        onClick={() => onTabChange('help-someone')}
      >
        Help Someone
      </button>
      <button
        className={`nav-button ${activeTab === 'view-requests' ? 'active' : ''}`}
        onClick={() => onTabChange('view-requests')}
      >
        View All Requests
      </button>
    </nav>
  );
}

export default Navigation;