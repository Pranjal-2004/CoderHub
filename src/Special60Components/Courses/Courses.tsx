import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Courses.css';

const Courses: React.FC = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`courses-container ${darkMode ? 'dark-mode' : 'light'}`}>
            
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <h1 id="coursesh1">Courses</h1>
            <div className="course-grid">
                <div className="course-card" onClick={() => handleNavigate('/learning-path/courses/cpp')}>
                    <div className="course-icon">C++</div>
                    <div className="course-description">Learn C++ Basics and Advanced Topics</div>
                </div>
                <div className="course-card" onClick={() => handleNavigate('/learning-path/courses/java')}>
                    <div className="course-icon">Java</div>
                    <div className="course-description">Master Java for Development</div>
                </div>
                <div className="course-card" onClick={() => handleNavigate('/learning-path/courses/sql')}>
                    <div className="course-icon">SQL</div>
                    <div className="course-description">SQL Basics and Query Practice</div>
                </div>
                <div className="course-card" onClick={() => handleNavigate('/learning-path/courses/python')}>
                    <div className="course-icon">Python</div>
                    <div className="course-description">Python Programming from Basics</div>
                </div>
                <div className="course-card" onClick={() => handleNavigate('/learning-path/courses/ruby')}>
                    <div className="course-icon">Ruby</div>
                    <div className="course-description">Ruby Programming Essentials</div>
                </div>
                <div className="course-card" onClick={() => handleNavigate('/learning-path/courses/js')}>
                    <div className="course-icon">JavaScript</div>
                    <div className="course-description">JavaScript for Beginners</div>
                </div>
            </div>
        </div>
    );
};

export default Courses;