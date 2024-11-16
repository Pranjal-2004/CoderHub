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
                <li><button onClick={() => navigate('/u/guest/home')}>CODER'S HUB</button></li>
                <li><button onClick={() => navigate('/u/guest/profile')}>Profile</button></li>
                <li><button onClick={() => navigate('/question')}>Problems</button></li>
            </ul>
            <button onClick={() => navigate('/u/contest')} id='buttonContest'>Contest</button>
            <label className="dark-mode-toggle">
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                <span className="toggle-slider"></span>
            </label>
        </nav>
    );
};

export default Navbar;