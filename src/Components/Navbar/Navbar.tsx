import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-left">
        <Link to="/learning-path" className="nav-link">
          Learning Path
          </Link>
        <Link to="/problems" className="nav-link">
          Problems
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/cc/contest" className="nav-link">
          Contest
        </Link>
        <button className="notification-btn">
          <i className="fas fa-bell"></i>
        </button>
        <div className="dark-mode-toggle">
          <label className="toggle-switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
