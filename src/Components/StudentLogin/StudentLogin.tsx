import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";
import { loginWithEmailAndPassword, loginWithGoogle } from "../../firebase/authService";

const StudentLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await loginWithEmailAndPassword(email, password);

      const token = await userCredential.getIdToken();
      localStorage.setItem("authToken", token);
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;

      console.log("User logged in:", userCredential);
      navigate("/u/home"); 
    } catch (error) {
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await loginWithGoogle();

      const token = await userCredential.getIdToken();
      localStorage.setItem("authToken", token);
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;

      console.log("User logged in with Google:", userCredential);
      navigate("/u/home"); 
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
      </div>
      <div className="form-section">
        <h2>Welcome Back!</h2>
        <p>Login to your account</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
          {error && <p className="error-message">{error}</p>}
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </form>
        <div className="social-login">
          <button onClick={handleGoogleLogin}>Continue with Google</button>
        </div>
        <p>Don't have an account? <a href="/register/user">Sign up</a></p>
      </div>
    </div>
  );
};

export default StudentLogin;
