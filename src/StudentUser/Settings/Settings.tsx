import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../styles.css";
const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="content-wrapper">
        <Sidebar isDarkMode={isDarkMode} />
        <main className="main-content">
          <div className="page-container">
            <h1>Settings</h1>
            <p>Adjust your application settings.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
