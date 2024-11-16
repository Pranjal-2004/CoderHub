import { FC } from "react";
import Heading from "../Heading/Heading";
import "./Login.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Login: FC = () => {
  return (
    <div>
      <Heading />
      <div className="loginhome">
        <div className="leftbox">
          <h2>Login as a Content Creator</h2>
          <p>
            Login to contribute questions and testcases in the world of coding
          </p>
          <button onClick={()=>{window.location.href = '/login/cc'}}>Login</button>
          <p>Don't have an account <Link to="/register/cc">Send Request</Link></p>
        </div>
        <div className="rightbox">
          <h2>Login as a Student</h2>
          <p>
            Dive into world of coding and improve your coding skills by
            practicing intersting questions
          </p>
          <button onClick={()=>{window.location.href = '/login/user'}}>Login</button>
          <p>Don't have an account <Link to="/register/user">Register Here</Link></p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
