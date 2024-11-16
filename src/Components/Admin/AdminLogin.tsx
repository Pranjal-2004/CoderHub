import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { loginWithEmailAndPassword } from "../../firebase/authService";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await loginWithEmailAndPassword(email, password);
      const userId = userCredential.uid;

      const userDoc = await getDoc(doc(firestore, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const isAdmin = userData.role === "admin";
        const isApproved = userData.approved === true;

        if (isAdmin && isApproved) {
          navigate("/admin/panel");
        } else {
          setError("You are not authorized to access the admin panel.");
        }
      } else {
        setError("User data not found.");
      }
    } catch (error) {
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
