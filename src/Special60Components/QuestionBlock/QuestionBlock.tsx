import React, { useState, useEffect } from 'react';
import './QuestionBlock.css';

interface QuestionBlockProps {
    title: string;
    difficulty: string;
    problemType: string;
    maxScore: number;
    successRate: number;
    isSolved: boolean;
    isDarkMode: boolean;
    onSolveClick: () => void;
    onQuestionClick:()=>void;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({
    title,
    difficulty,
    problemType,
    maxScore,
    successRate,
    isSolved,
    isDarkMode,
    onSolveClick,
}) => {
    const [favorited, setFavorited] = useState(false);

    // Key to store favorited state in localStorage
    const localStorageKey = `favorited-${title}`;

    useEffect(() => {
        // Retrieve favorited state from localStorage when component mounts
        const savedFavorite = localStorage.getItem(localStorageKey);
        if (savedFavorite) {
            setFavorited(JSON.parse(savedFavorite));
        }
    }, [localStorageKey]);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newFavoritedState = !favorited;
        setFavorited(newFavoritedState);
        localStorage.setItem(localStorageKey, JSON.stringify(newFavoritedState));
    };

    return (
        <div className={`question-block ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="question-header">
                <h3 className="question-title">{title}</h3>
                <div className="question-metadata">
                    <span className="difficulty">{difficulty}</span>
                    <span className="problem-type">{problemType}</span>
                    <span className="max-score">Max Score: {maxScore}</span>
                    <span className="success-rate">Success Rate: {successRate}%</span>
                </div>
            </div>
            <div className="actions">
                <button
                    className={`solve-challenge ${isSolved ? 'solved' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSolveClick();
                    }}
                    // disabled={isSolved}
                >
                    {isSolved ? 'Solved' : 'Solve Challenge'}
                </button>
                <span
                    className={`favorite-star ${favorited ? 'favorited' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    ☆
                </span>
            </div>
        </div>
    );
};

export default QuestionBlock;