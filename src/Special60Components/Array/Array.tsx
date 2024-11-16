import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "./Array.css";
import Navbar from "../Navbar/Navbar";
import QuestionBlock from "../QuestionBlock/QuestionBlock";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import questionsData from "../questions";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../../firebase/firebase.config";
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
  const [solvedQuestionIds, setSolvedQuestionIds] = useState<number[]>([]);

  // Extract first 8 questions and transform them into required format
  const initialQuestions = questionsData.slice(0, 8).map((q) => ({
    id: q.id,
    title: q.title,
    difficulty: q.difficulty,
    solved: false,
  }));

  // Split questions into two rows
  const initialBlocksArray = [
    initialQuestions.slice(0, 4),
    initialQuestions.slice(4, 8),
  ];

  const [blocksArray, setBlocksArray] =
    useState<Question[][]>(initialBlocksArray);

  useEffect(() => {
    const fetchSolvedQuestions = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error("User is not authenticated");
          return;
        }

        const userId = user.uid;

        if (!userId) {
          console.error("No user ID found");
          return;
        }

        // Reference to the user document
        const userDocRef = doc(firestore, "users", userId);

        // Check if the user document exists
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          console.error("User document not found");
          return;
        }

        // Reference to the questions subcollection
        const questionsCollectionRef = collection(
          firestore,
          "users",
          userId,
          "questions"
        );
        const questionsSnapshot = await getDocs(questionsCollectionRef);

        // Get all question IDs that exist in the subcollection
        const solvedIds = questionsSnapshot.docs.map((doc) =>
          parseInt(doc.id, 10)
        );
        setSolvedQuestionIds(solvedIds);

        // Update the blocksArray with solved status
        const updatedBlocksArray = initialBlocksArray.map((row) =>
          row.map((question) => ({
            ...question,
            solved: solvedIds.includes(question.id),
          }))
        );

        setBlocksArray(updatedBlocksArray);
        localStorage.setItem(
          "array-blocks",
          JSON.stringify(updatedBlocksArray)
        );
      } catch (error) {
        console.error("Error fetching solved questions:", error);
      }
    };

    fetchSolvedQuestions();
  }, []);

  const questions = blocksArray.flat();
  const totalQuestions = questions.length;
  const solvedQuestions = solvedQuestionIds.length;
  const solvedPercentage = ((solvedQuestions / totalQuestions) * 100).toFixed(
    2
  );

  const allQuestionsSolved = solvedQuestions === totalQuestions;

  useEffect(() => {
    localStorage.setItem("array-complete", JSON.stringify(allQuestionsSolved));
  }, [allQuestionsSolved]);

  const handleQuestionClick = (questionId: number) => {
    const questionData = questionsData.find((q) => q.id === questionId);
    navigate(`/learning-path/array/question/${questionId}`, {
      replace: true,
      state: {
        question: questionData,
        solved: solvedQuestionIds.includes(questionId),
      },
    });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const doughnutData = {
    labels: ["Solved", "Unsolved"],
    datasets: [
      {
        data: [solvedQuestions, totalQuestions - solvedQuestions],
        backgroundColor: ["#5A6ACF", "#2FBFDE"],
        hoverBackgroundColor: ["#4C5DB0", "#28A1C8"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    cutout: "70%",
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="titleDiv">
        <h1 className="title">Array</h1>
      </div>

      <div className="content-wrapper">
        <div className="question-blocks">
          {questions.map((question) => (
            <QuestionBlock
              key={question.id}
              title={question.title}
              difficulty={question.difficulty}
              problemType="Problem Solving (Basic)"
              maxScore={10}
              successRate={93.0}
              isSolved={solvedQuestionIds.includes(question.id)}
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
