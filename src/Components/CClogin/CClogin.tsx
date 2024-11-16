import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CClogin.css";
import { loginWithEmailAndPassword, loginWithGoogle } from "../../firebase/authService";
import { getUserApprovalStatusAndRole } from "../../firebase/firebase.firestore";

const CClogin: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await loginWithEmailAndPassword(email, password);
      const userId = userCredential.uid;
      const { isApproved, role } = await getUserApprovalStatusAndRole(userId);
      
      if (role !== "creator") {
        setError("You are not authorized as a content creator.");
        return;
      }
      if (!isApproved) {
        setError("Admin approval is still pending.");
        return;
      }

      const token = await userCredential.getIdToken();
      localStorage.setItem("authToken", token);
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;

      navigate("/cc/home");
    } catch (error) {
      setError("Failed to log in. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await loginWithGoogle();
      const userId = userCredential.uid;
      const { isApproved, role } = await getUserApprovalStatusAndRole(userId);

      if (role !== "creator") {
        setError("You are not authorized as a content creator.");
        return;
      }
      if (!isApproved) {
        setError("Admin approval is still pending.");
        return;
      }

      const token = await userCredential.getIdToken();
      localStorage.setItem("authToken", token);
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;

      navigate("/cc/home");
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="cc-login-container">
      <div className="form-section">
        <h2>Welcome Back, Content Creator!</h2>
        <p>Login to your account</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
        <p>Don't have an account? <a href="/register/cc">Send Request</a></p>
      </div>
      <div className="image-section">
      </div>
    </div>
  );
};

export default CClogin;
