import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';

interface SidebarProps {
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="sidebar-content">
        <ul className="sidebar-nav">
          <li>
            <Link
              to="/cc/home"
              className={`sidebar-link ${location.pathname === '/cc/home' ? 'active' : ''}`}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cc/profile"
              className={`sidebar-link ${location.pathname === '/cc/profile' ? 'active' : ''}`}
            >
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cc/settings"
              className={`sidebar-link ${location.pathname === '/cc/settings' ? 'active' : ''}`}
            >
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to=""
              className={`sidebar-link ${location.pathname === '' ? 'active' : ''}`}
            >
              <i className="fas fa-question-circle"></i>
              <span>Add New Question</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminapprovedq"
              className={`sidebar-link ${location.pathname === '/adminapprovedq' ? 'active' : ''}`}
            >
              <i className="fas fa-question-circle"></i>
              <span>Admin Approved Questions</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
