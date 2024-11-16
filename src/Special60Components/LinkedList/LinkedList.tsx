import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Doughnut } from 'react-chartjs-2';
import '../Array/Array.css';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import {useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import questionsData from '../questions';

ChartJS.register(ArcElement, Tooltip, Legend);

export type Question = {
    id: number;
    title: string;
    difficulty: string;
    description: string;
    solved: boolean;
};

const LinkedList: React.FC = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    
    // Extract questions 9-16 and transform them into required format
    const initialQuestions = questionsData.slice(8, 16).map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        difficulty: q.difficulty,
        solved: false
    }));

    // Split questions into rows
    const initialBlocksArray = [
        initialQuestions.slice(0, 2),
        initialQuestions.slice(2, 4),
        initialQuestions.slice(4, 6),
        initialQuestions.slice(6, 8)
    ];

    const [blocksLinkedList, setBlocksLinkedList] = useState<Question[][]>(initialBlocksArray);

    useEffect(() => {
        const savedBlocks = localStorage.getItem('linkedlist-blocks');
        if (savedBlocks) {
            setBlocksLinkedList(JSON.parse(savedBlocks));
        } else {
            localStorage.setItem('linkedlist-blocks', JSON.stringify(blocksLinkedList));
        }
    }, []);

    const questions = blocksLinkedList.flat();
    const totalQuestions = questions.length;
    const solvedQuestions = questions.filter(q => q.solved).length;
    const solvedPercentage = ((solvedQuestions / totalQuestions) * 100).toFixed(2);

    const allQuestionsSolved = solvedQuestions === totalQuestions;

    useEffect(() => {
        localStorage.setItem('linkedlist-complete', JSON.stringify(allQuestionsSolved));
    }, [allQuestionsSolved]);

    const handleQuestionClick = (questionId: number) => {
        navigate(`/linkedlist/question/${questionId}`, {replace:true});
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
                <h1 className="title">Linked List</h1>
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
                <div className='chart'>
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

export default LinkedList;