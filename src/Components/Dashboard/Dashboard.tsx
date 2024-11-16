import { FC, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ModalForAi from "../ModalForAi/ModalForAi";
// import dotenv from "dotenv";
import "./Dashboard.css";

const Dashboard: FC = () => {
  const [codeInput, setCodeInput] = useState("");
  const [codeFeedback, setCodeFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  // dotenv.config();

  const API_KEY = "AIzaSyBNlU2bmduiRa1JFU6w7-gt_N-g_jHnHxw"; 
  const handleCodeSubmit = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    const prompt = `
      Provide feedback for the following code in this format:
      1. **Title:** [Provide the title of the code]
      2. **Summary:** [3-4 lines about the code quality]
      3. **Professional Expectations:** [How professionals expect the code to be written]
      4. **Example Code (if necessary):** [Well-formatted code example]
  
      Code Snippet:
      ${codeInput}
    `;
  
    const result = await model.generateContent(prompt);
    const feedbackText = result.response.text();

    setCodeFeedback(feedbackText);
    setIsModalOpen(true);
  };
  
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/problems">Problems</a></li>
        </ul>
      </nav>
      <div className="dashboard">
        <div className="left-side">
          <div className="code-editor">
            <textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Enter your code here"
            ></textarea>
            <button onClick={handleCodeSubmit}>Submit Code</button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalForAi codeFeedback={codeFeedback} onClose={closeModal} />
      )}
    </div>
  );
};

export default Dashboard;
