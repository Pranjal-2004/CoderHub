import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../styles.css";
const Home: React.FC = () => {
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
            <h1>Home</h1>
            <p>Welcome to your dashboard!</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
