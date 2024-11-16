import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Cpptsx.css';

const Cpptsx: React.FC = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [isArrayComplete, setIsArrayComplete] = useState(false);
    const [isLinkedListComplete, setIsLinkedListComplete] = useState(false);

    useEffect(() => {
        setIsArrayComplete(JSON.parse(localStorage.getItem('array-complete') || 'false'));
        setIsLinkedListComplete(JSON.parse(localStorage.getItem('linkedlist-complete') || 'false'));
    }, []);

    const handleNavigate = (path: string, isAccessible: boolean) => {
        if (isAccessible) {
            navigate(path);
        } else {
            alert("Complete previous topic to move to this topic.");
        }
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`cpptsx-container ${darkMode ? 'dark-mode' : ''}`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <h1 id="cpph1">Prepare By Topic</h1>
            <div className="blocks">
                <div className="block" onClick={() => handleNavigate('/learning-path/array', true)}>
                    Array
                </div>
                <div
                    className={`block ${isArrayComplete ? '' : 'disabled'}`}
                    onClick={() => handleNavigate('/learning-path/linkedlist', isArrayComplete)}
                    data-tooltip={isArrayComplete ? '' : 'Complete Array to unlock Linked List'}
                >
                    {isArrayComplete ? 'Linked List' : 'Linked List (Locked)'}
                </div>
                <div
                    className={`block ${isLinkedListComplete ? '' : 'disabled'}`}
                    onClick={() => handleNavigate('learning-path/string', isLinkedListComplete)}
                    data-tooltip={isLinkedListComplete ? '' : 'Complete Linked List to unlock String'}
                >
                    {isLinkedListComplete ? 'String' : 'String (Locked)'}
                </div>
                <div
                    className={`block ${isLinkedListComplete ? '' : 'disabled'}`}
                    onClick={() => handleNavigate('learning-path/tree', isLinkedListComplete)}
                    data-tooltip={isLinkedListComplete ? '' : 'Complete Linked List to unlock Tree'}
                >
                    {isLinkedListComplete ? 'Tree' : 'Tree (Locked)'}
                </div>
                <div
                    className={`block ${isLinkedListComplete ? '' : 'disabled'}`}
                    onClick={() => handleNavigate('/learning-path/graph', isLinkedListComplete)}
                    data-tooltip={isLinkedListComplete ? '' : 'Complete Linked List to unlock Graph'}
                >
                    {isLinkedListComplete ? 'Graph' : 'Graph (Locked)'}
                </div>
            </div>
        </div>
    );
};

export default Cpptsx;