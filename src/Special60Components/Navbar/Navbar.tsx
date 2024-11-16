import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

type NavbarProps = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <ul>
                <li><button onClick={() => navigate('/u/:username/home')}>CODER'S HUB</button></li>
                <li><button onClick={() => navigate('/u/:username/profile')}>Profile</button></li>
                <li><button onClick={() => navigate('/question')}>Problems</button></li>
            </ul>
            <button className="toggle-button" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </nav>
    );
};

export default Navbar;