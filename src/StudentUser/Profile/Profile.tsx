import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

ChartJS.register(ArcElement, Tooltip, Legend);

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

type Question = {
  id: number;
  title: string;
  language: string;
  level: "easy" | "medium" | "hard";
};

export default function Profile() {
  const [profileData, setProfileData] = useState({
    username: "Tom Holland",
    tagline: "Whyamicodingbruh",
    location: "Paris",
    github: "TomZend",
    rank: "Rank 724,190",
    interests: "Interested in DSA",
    avatarUrl: "src/assets/Components/UserComponents/spidey.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);

  const MAX_SKILLS = 6;
  const [skills, setSkills] = useState([
    "JavaScript",
    "Python",
    "React",
    "Data Structures",
    "Algorithms",
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [editingSkill, setEditingSkill] = useState<{
    index: number;
    value: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [activeDays] = useState<{ [key in Month]: number }>({
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  });

  const [questionsData] = useState({
    total: 3352,
    easy: { solved: 11, total: 834 },
    medium: { solved: 10, total: 1753 },
    hard: { solved: 0, total: 765 },
  });

  const [questions] = useState<Question[]>([
    { id: 1, title: "Question 1", language: "Java", level: "easy" },
    { id: 2, title: "Question 2", language: "Python", level: "medium" },
    { id: 3, title: "Question 3", language: "Java", level: "hard" },
    { id: 4, title: "Question 4", language: "Python", level: "easy" },
    { id: 5, title: "Question 5", language: "JavaScript", level: "medium" },
  ]);

  const [languageFilter, setLanguageFilter] = useState("none");
  const [difficultyFilter, setDifficultyFilter] = useState("none");
  const [shouldApplyFilter, setShouldApplyFilter] = useState(false);

  // Function to get month number from month name
  const getMonthNumber = (month: string): number => {
    const monthMap: { [key: string]: number } = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    return monthMap[month];
  };

  // Function to format date as DD/MM/YYYY
  const formatDate = (day: number, month: string): string => {
    const currentYear = new Date().getFullYear();
    const monthNum = getMonthNumber(month);
    const dayStr = day < 10 ? `0${day}` : day.toString();
    const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum.toString();
    return `${dayStr}/${monthStr}/${currentYear}`;
  };

  const getFilteredQuestions = () => {
    if (!shouldApplyFilter) return questions;

    return questions.filter((question) => {
      const matchesLanguage =
        languageFilter === "none" ||
        question.language.toLowerCase() === languageFilter.toLowerCase();
      const matchesDifficulty =
        difficultyFilter === "none" || question.level === difficultyFilter;
      return matchesLanguage && matchesDifficulty;
    });
  };

  const handleApplyFilter = () => {
    setShouldApplyFilter(true);
  };

  const handleResetFilter = () => {
    setLanguageFilter("none");
    setDifficultyFilter("none");
    setShouldApplyFilter(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (skills.length >= MAX_SKILLS) {
      setErrorMessage(`Maximum ${MAX_SKILLS} skills allowed`);
      setNewSkill("");
      return;
    }

    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setNewSkill("");
    } else if (skills.includes(trimmedSkill)) {
      setErrorMessage("This skill already exists");
    }
  };

  const handleEditSkill = (index: number) => {
    setEditingSkill({ index, value: skills[index] });
    setErrorMessage("");
  };

  const handleUpdateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkill) {
      const trimmedSkill = editingSkill.value.trim();
      if (trimmedSkill && !skills.includes(trimmedSkill)) {
        const newSkills = [...skills];
        newSkills[editingSkill.index] = trimmedSkill;
        setSkills(newSkills);
        setEditingSkill(null);
        setErrorMessage("");
      } else if (skills.includes(trimmedSkill)) {
        setErrorMessage("This skill already exists");
      }
    }
  };

  const handleDeleteSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    setErrorMessage("");
  };

  const getPercentage = (solved: number, total: number) =>
    (solved / total) * 100;

  const accuracy = getPercentage(
    questionsData.easy.solved +
      questionsData.medium.solved +
      questionsData.hard.solved,
    questionsData.easy.total +
      questionsData.medium.total +
      questionsData.hard.total
  ).toFixed(2);

  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [
          questionsData.easy.solved,
          questionsData.medium.solved,
          questionsData.hard.solved,
        ],
        backgroundColor: ["#5A6ACF", "#2FBFDE", "#FFCF56"],
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.raw + " solved";
          },
        },
      },
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const centerTextPlugin: Plugin = {
    id: "centerText",
    beforeDraw(chart: any) {
      const { ctx, chartArea } = chart;
      const width = chartArea.right - chartArea.left;
      const height = chartArea.bottom - chartArea.top;
      const fontSize = height / 15;
      ctx.save();
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `Accuracy - ${accuracy}%`,
        chartArea.left + width / 2,
        chartArea.top + height / 2
      );
      ctx.restore();
    },
  };

  ChartJS.register(centerTextPlugin);

  const toggleEditMode = () => {
    if (isEditing) {
      setProfileData(editData);
    }
    setIsEditing(!isEditing);
  };
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="content-wrapper">
        <Sidebar isDarkMode={isDarkMode} />
        <main className="main-content">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                <img src={profileData.avatarUrl} alt="Profile" />
              </div>
              <div className="profile-info">
                {isEditing ? (
                  <>
                    <input
                      className="edit-input"
                      type="text"
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                    />
                    <input
                      className="edit-input"
                      type="text"
                      value={editData.tagline}
                      onChange={(e) =>
                        setEditData({ ...editData, tagline: e.target.value })
                      }
                    />
                    <input
                      className="edit-input"
                      type="text"
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                    />
                    <input
                      className="edit-input"
                      type="text"
                      value={editData.github}
                      onChange={(e) =>
                        setEditData({ ...editData, github: e.target.value })
                      }
                    />
                    <textarea
                      className="edit-input"
                      value={editData.interests}
                      onChange={(e) =>
                        setEditData({ ...editData, interests: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>
                    <h2>{profileData.username}</h2>
                    <p>{profileData.tagline}</p>
                    <p>{profileData.location}</p>
                    <p>
                      <strong>GitHub:</strong>{" "}
                      <a
                        href={`https://github.com/${profileData.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {profileData.github}
                      </a>
                    </p>
                    <p className="rank">{profileData.rank}</p>
                    <p>{profileData.interests}</p>
                  </>
                )}
                <button className="edit-button" onClick={toggleEditMode}>
                  {isEditing ? "Save" : "Edit Profile"}
                </button>
              </div>
            </div>

            <div className="card active-days-card">
              <h3>Active Days</h3>
              <div className="active-days-grid">
                {Object.keys(activeDays).map((month, index) => (
                  <div key={index} className="month">
                    <h4>{month}</h4>
                    <div className="days-grid">
                      {Array.from({ length: activeDays[month as Month] }).map(
                        (_, day) => (
                          <div
                            key={day}
                            className="day-box active"
                            title={formatDate(day + 1, month)}
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card stats-card">
              <h3>Total Solved Questions</h3>
              <div className="question-stats">
                <div className="stat-item">
                  Easy: {questionsData.easy.solved} / {questionsData.easy.total}
                </div>
                <div className="stat-item">
                  Medium: {questionsData.medium.solved} /{" "}
                  {questionsData.medium.total}
                </div>
                <div className="stat-item">
                  Hard: {questionsData.hard.solved} / {questionsData.hard.total}
                </div>
              </div>
              <div className="chart-container">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="card questions-card">
              <h3>Created Questions</h3>
              <div className="filter-controls">
                <select
                  className="filter-dropdown"
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                >
                  <option value="none">Select Language</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                <select
                  className="filter-dropdown"
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <option value="none">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <div className="filter-buttons">
                  <button className="apply-button" onClick={handleApplyFilter}>
                    Apply Filters
                  </button>
                  <button className="reset-button" onClick={handleResetFilter}>
                    Reset
                  </button>
                </div>
              </div>
              <div className="questions-list">
                {getFilteredQuestions().map((question) => (
                  <div key={question.id} className="question-item">
                    Question {question.id} ({question.language}) -{" "}
                    {question.level}
                  </div>
                ))}
              </div>
            </div>

            <div className="right-section">
              <div className="card badge-card">
                <h3>Badges</h3>
                <div className="badges-container">
                  <span className="badge">LeetCode Warrior</span>
                  <span className="badge">Coding Ninja</span>
                </div>
              </div>

              <div className="card community-stats-card">
                <h3>Community Stats</h3>
                <div className="stats-content">
                  <p>Reputation: 1500</p>
                  <p>Followers: 200</p>
                  <p>Following: 180</p>
                </div>
              </div>

              <div className="card languages-skills-card">
                <div className="skills-header">
                  <h3>Languages & Skills</h3>
                  <span className="skills-count">
                    {skills.length} / {MAX_SKILLS}
                  </span>
                </div>

                <form onSubmit={handleAddSkill} className="add-skill-form">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    className="skill-input"
                    disabled={skills.length >= MAX_SKILLS}
                  />
                  <button
                    type="submit"
                    className="skill-button"
                    disabled={skills.length >= MAX_SKILLS}
                  >
                    Add
                  </button>
                </form>

                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}

                <ul className="skills-list">
                  {skills.map((skill, index) => (
                    <li key={index} className="skill-item">
                      {editingSkill?.index === index ? (
                        <form
                          onSubmit={handleUpdateSkill}
                          className="edit-skill-form"
                        >
                          <input
                            type="text"
                            value={editingSkill.value}
                            onChange={(e) =>
                              setEditingSkill({
                                ...editingSkill,
                                value: e.target.value,
                              })
                            }
                            className="skill-input"
                          />
                          <div className="skill-buttons">
                            <button type="submit" className="skill-button save">
                              Save
                            </button>
                            <button
                              type="button"
                              className="skill-button cancel"
                              onClick={() => setEditingSkill(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="skill-content">
                          <span>{skill}</span>
                          <div className="skill-actions">
                            <button
                              className="skill-button edit"
                              onClick={() => handleEditSkill(index)}
                            >
                              Edit
                            </button>
                            <button
                              className="skill-button delete"
                              onClick={() => handleDeleteSkill(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
