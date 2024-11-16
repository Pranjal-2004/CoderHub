import { FC, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp: FC = () => {
  const [hovered, setHovered] = useState("");

  return (
    <div className="Signup">
      <div>
        <div className="sec-heading">
          <h2>How do you want to Use this Coding Platform ?</h2>
        </div>
        <div className="container">
          <Link
            to="/register/cc"
            id="creator"
            className="links"
            onMouseEnter={() => setHovered("creator")}
            onMouseLeave={() => setHovered("")}
          >
            <div className="sec-container">
              <h3>As a Content Creator</h3>
              <p>Contribute questions and testcases for this platform</p>
            </div>
          </Link>
          <Link
            to="/register/user"
            id="student"
            className="links"
            onMouseEnter={() => setHovered("student")}
            onMouseLeave={() => setHovered("")}
          >
            <div className="sec-container">
              <h3>For Practicing and preparing</h3>
              <p>Solve Problems and learn new skills</p>
            </div>
          </Link>
        </div>
      </div>
      <div className={`signup-right ${hovered === "creator" ? "creator-hover" : hovered === "student" ? "student-hover" : ""}`}></div>
    </div>
  );
};

export default SignUp;
