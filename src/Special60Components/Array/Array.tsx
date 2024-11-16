import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Array.css';
import Navbar from '../Navbar/Navbar';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import questionsData from '../questions';

ChartJS.register(ArcElement, Tooltip, Legend);

export type Question = {
    id: number;
    title: string;
    difficulty: string;
    solved: boolean;
};

const Array: React.FC = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    // Extract first 8 questions and transform them into required format
    const initialQuestions = questionsData.slice(0, 8).map(q => ({
        id: q.id,
        title: q.title,
        difficulty: q.difficulty,
        solved: false
    }));

    // Split questions into two rows
    const initialBlocksArray = [
        initialQuestions.slice(0, 4),
        initialQuestions.slice(4, 8)
    ];

    const [blocksArray, setBlocksArray] = useState<Question[][]>(initialBlocksArray);

    useEffect(() => {
        const savedBlocks = localStorage.getItem('array-blocks');
        if (savedBlocks) {
            setBlocksArray(JSON.parse(savedBlocks));
        } else {
            localStorage.setItem('array-blocks', JSON.stringify(blocksArray));
        }
    }, []);

    const questions = blocksArray.flat();
    const totalQuestions = questions.length;
    const solvedQuestions = questions.filter(q => q.solved).length;
    const solvedPercentage = ((solvedQuestions / totalQuestions) * 100).toFixed(2);

    const allQuestionsSolved = solvedQuestions === totalQuestions;

    useEffect(() => {
        localStorage.setItem('array-complete', JSON.stringify(allQuestionsSolved));
    }, [allQuestionsSolved]);

    const handleQuestionClick = (questionId: number) => {
        const questionData = questionsData.find(q => q.id === questionId);
        console.log(questionId, questionData);
        navigate(`/learning-path/array/question/${questionId}`, { replace: true, state: { question: questionData } });
    };    

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const doughnutData = {
        labels: ['Solved', 'Unsolved'],
        datasets: [
            {
                data: [solvedQuestions, totalQuestions - solvedQuestions],
                backgroundColor: ['#5A6ACF', '#2FBFDE'],
                hoverBackgroundColor: ['#4C5DB0', '#28A1C8'],
                borderWidth: 1,
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        cutout: '70%',
    };

    return (
        <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <div className="titleDiv">
                <h1 className="title">Array</h1>
            </div>

            <div className="content-wrapper">
                <div className="question-blocks">
                    {questions.map(question => (
                        <QuestionBlock
                            key={question.id}
                            title={question.title}
                            difficulty={question.difficulty}
                            problemType="Problem Solving (Basic)"
                            maxScore={10}
                            successRate={93.00}
                            isSolved={question.solved}
                            isDarkMode={darkMode}
                            onSolveClick={() => handleQuestionClick(question.id)}
                            onQuestionClick={() => handleQuestionClick(question.id)}
                        />
                    ))}
                </div>
                <div className="chart">
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                    <div className="chart-value">
                        {solvedQuestions} / {totalQuestions}
                    </div>
                    <p className="progress">Progress: {solvedPercentage}% solved</p>
                </div>
            </div>
        </div>
    );
};

export default Array;