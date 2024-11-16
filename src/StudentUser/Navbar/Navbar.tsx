// Navbar.tsx
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
        <Link to='/learning-path' >
          Learning Path
        </Link>
        <Link to="/question" className="nav-link">
          Problems
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/u/contest" className="nav-link">
          Contest
        </Link>
        <label className="dark-mode-toggle">
          <input 
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;