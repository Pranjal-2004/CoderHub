// QuestionPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Question } from '../Array/Array';

const QuestionPage: React.FC = () => {
    const { topic, questionId } = useParams<{ topic: string; questionId: string }>();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const savedBlocks = JSON.parse(localStorage.getItem(`${topic}-blocks`) || '[]');

                const questionList = Array.isArray(savedBlocks) ? savedBlocks.flat() : [];


                const foundQuestion = questionList.find((q: Question) => q.id === Number(questionId));



                setQuestion(foundQuestion || null);
            } catch (error) {
                console.error('Error fetching question data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestionData();
    }, [questionId, topic]);

    const handleQuestionSubmit = () => {
        if (question) {

            const savedBlocks = JSON.parse(localStorage.getItem(`${topic}-blocks`) || '[]');


            const updatedBlocks = savedBlocks.map((block: Question[]) =>
                block.map((q: Question) =>
                    q.id === question.id ? { ...q, solved: true } : q
                )
            );

            localStorage.setItem(`${topic}-blocks`, JSON.stringify(updatedBlocks));
            navigate(`/${topic}`, { replace: true });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!question) {
        return <div>Question not found</div>;
    }

    return (
        <div className="question-page">
            <h1>Question {question.id}</h1>
            <p>{question.title}</p>
            <button
                className="submit-button"
                onClick={handleQuestionSubmit}
            >
                Submit Solution
            </button>
        </div>
    );
};

export default QuestionPage;