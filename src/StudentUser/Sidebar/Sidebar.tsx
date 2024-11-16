import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles.css";

interface SidebarProps {
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch the username from localStorage
  const username = localStorage.getItem("username") || "Guest";

  const handleLogout = () => {
    // Clear user session (optional)
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="sidebar-content">
        <ul className="sidebar-nav">
          <li>
            <Link
              to={`/u/${encodeURIComponent(username)}/home`}
              className={`sidebar-link ${
                location.pathname === `/u/${encodeURIComponent(username)}/home` ? "active" : ""
              }`}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/u/${encodeURIComponent(username)}/profile`}
              className={`sidebar-link ${
                location.pathname === `/u/${encodeURIComponent(username)}/profile` ? "active" : ""
              }`}
            >
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/u/${encodeURIComponent(username)}/settings`}
              className={`sidebar-link ${
                location.pathname === `/u/${encodeURIComponent(username)}/settings` ? "active" : ""
              }`}
            >
              <i className="fas fa-cog"></i>
              <span>Settings</span>
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
