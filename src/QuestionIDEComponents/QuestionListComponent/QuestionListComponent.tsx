import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './QuestionListComponent.css';

interface Testcases {
    input: string;
    output: string;
}

interface Constraints {
    time: string;
    space: string;
}

interface Question {
    id: number;
    title: string;
    description: string;
    input: string;
    output: string;
    difficulty: string;
    testcases: Testcases[];
    constraints: Constraints;
    tags: string;
}

interface QuestionListProps {
    questionsData: Question[];
    handleQuestionClick: (question: Question) => void;
}

const QuestionListComponent: React.FC<QuestionListProps> = ({ questionsData, handleQuestionClick }) => {
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const handleDifficultyClick = (difficulty: string) => {
        setSelectedDifficulties((prev) =>
            prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
        );
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const filteredQuestions = questionsData.filter((question) => {
        const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(question.difficulty);
        const matchesTag = selectedTags.length === 0 || selectedTags.some((tag) => question.tags.includes(tag));
        return matchesDifficulty && matchesTag;
    });

    const uniqueDifficulties = Array.from(new Set(questionsData.map((question) => question.difficulty)));
    const uniqueTags = Array.from(new Set(questionsData.flatMap((question) => question.tags.split(','))));

    return (
        <div id='questionsListContainer'>
            <div id='questionsList'>
                <h1>Questions List</h1>
                <ul>
                    {filteredQuestions.map((question: Question) => (
                        <li key={question.id}>
                            <Link to={`/question/${question.id}`} onClick={() => handleQuestionClick(question)}>{question.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div id='filterPanel'>
                <h2>Filter Questions</h2>
                <div id='difficultyButtons'>
                    <h3>Select Difficulty:</h3>
                    <div className='buttonPanel'>
                        {uniqueDifficulties.map((difficulty, index) => (
                            <button
                                key={index}
                                onClick={() => handleDifficultyClick(difficulty)}
                                className={selectedDifficulties.includes(difficulty) ? 'selected' : ''}
                            >
                                {difficulty}
                            </button>
                        ))}
                    </div>
                </div>

                <div id='tagButtons'>
                    <h3>Select Tag:</h3>
                    <div className='buttonPanel'>
                        {uniqueTags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => handleTagClick(tag)}
                                className={selectedTags.includes(tag) ? 'selected' : ''}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionListComponent;
