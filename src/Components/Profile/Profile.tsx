import React, { FC, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../styles.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";
import "./Profile.css";

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
  level: "easy" | "medium" | "hard" | "None";
};

export default function Profile() {
  const [profileData, setProfileData] = useState({
    username: "Content Creator",
    tagline: "Creator_Abel",
    location: "Paris",
    github: "AbelTesf",
    interests: "Competitive Coding",
    avatarUrl: "src/assets/Components/UserComponents/contentc.avif",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);

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
    easy: { created: 5, total: 834 },
    medium: { created: 7, total: 1753 },
    hard: { created: 8, total: 765 },
  });

  const [questions] = useState<Question[]>([
    { id: 1, title: "Question 1", language: "Java", level: "easy" },
    { id: 2, title: "Question 2", language: "Python", level: "medium" },
    { id: 3, title: "Question 3", language: "Java", level: "hard" },
    { id: 4, title: "Question 4", language: "Python", level: "None" },
    { id: 5, title: "Question 5", language: "JavaScript", level: "None" },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("None");
  const [selectedLevel, setSelectedLevel] = useState<
    "easy" | "medium" | "hard" | "None"
  >("None");
  const [filterLanguage, setFilterLanguage] = useState<boolean>(false);
  const [filterLevel, setFilterLevel] = useState<boolean>(false);

  // const getPercentage = (created: number, total: number) =>
  //   (created / total) * 100;

  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [
          questionsData.easy.created,
          questionsData.medium.created,
          questionsData.hard.created,
        ],
        backgroundColor: ["#5A6ACF", "#2FBFDE", "#FFCF56"],
      },
    ],
  };

  const [newSkill, setNewSkill] = useState("");
  const [editingSkill, setEditingSkill] = useState<{
    index: number;
    value: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const MAX_SKILLS = 6;
  const [skills, setSkills] = useState([
    "JavaScript",
    "Python",
    "React",
    "Data Structures",
    "Algorithms",
  ]);

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

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} created`,
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

  const toggleEditMode = () => {
    if (isEditing) setProfileData(editData);
    setIsEditing(!isEditing);
  };

  const filteredQuestions = questions.filter((question) => {
    let matchesLanguage =
      selectedLanguage === "None" || question.language === selectedLanguage;
    let matchesLevel =
      selectedLevel === "None" || question.level === selectedLevel;
    return matchesLanguage && matchesLevel;
  });
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
                    <p>{profileData.interests}</p>
                  </>
                )}
                <button className="edit-button" onClick={toggleEditMode}>
                  {isEditing ? "Save" : "Edit Profile"}
                </button>
              </div>
            </div>

            <div className="active-days-container">
              {Object.keys(activeDays)
                .slice(0, 3)
                .map((month, index) => (
                  <div key={index} className="month">
                    <h4>{month}</h4>
                    <div className="days-grid">
                      {Array.from({
                        length: activeDays[month as keyof typeof activeDays],
                      }).map((_, day) => (
                        <div
                          key={day}
                          className="day-box active"
                          title={`${day + 1}/${month.slice(0, 3)}/2024`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              {Object.keys(activeDays)
                .slice(3, 6)
                .map((month, index) => (
                  <div key={index} className="month">
                    <h4>{month}</h4>
                    <div className="days-grid">
                      {Array.from({
                        length: activeDays[month as keyof typeof activeDays],
                      }).map((_, day) => (
                        <div
                          key={day}
                          className="day-box active"
                          title={`${day + 1}/${month.slice(0, 3)}/2024`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              {Object.keys(activeDays)
                .slice(6)
                .map((month, index) => (
                  <div key={index} className="month">
                    <h4>{month}</h4>
                    <div className="days-grid">
                      {Array.from({
                        length: activeDays[month as keyof typeof activeDays],
                      }).map((_, day) => (
                        <div
                          key={day}
                          className="day-box active"
                          title={`${day + 1}/${month.slice(0, 3)}/2024`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            <div className="card total-questions-card">
              <h3>Total Questions Created</h3>
              <div className="question-stats">
                <div className="stat-item">
                  Easy: {questionsData.easy.created} /{" "}
                  {questionsData.easy.total}
                </div>
                <div className="stat-item">
                  Medium: {questionsData.medium.created} /{" "}
                  {questionsData.medium.total}
                </div>
                <div className="stat-item">
                  Hard: {questionsData.hard.created} /{" "}
                  {questionsData.hard.total}
                </div>
              </div>
              <div className="chart-container">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="card created-questions-card">
              <h3>Created Questions</h3>
              <div className="filter-controls">
                <div className="filter">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value=".NET">.NET</option>
                  </select>
                  <select
                    value={selectedLevel}
                    onChange={(e) =>
                      setSelectedLevel(
                        e.target.value as "easy" | "medium" | "hard" | "None"
                      )
                    }
                  >
                    <option value="None">None</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <ul className="questions-list">
                {filteredQuestions.map((question) => (
                  <li key={question.id}>
                    {question.title} ({question.language}) - {question.level}
                  </li>
                ))}
              </ul>
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
        </main>
      </div>
    </div>
  );
}
