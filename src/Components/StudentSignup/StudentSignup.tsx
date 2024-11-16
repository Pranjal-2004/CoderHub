import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentSignup.css";
import { registerWithEmailAndPassword, loginWithGoogle } from "../../firebase/authService";
import { FirebaseError } from "firebase/app";
import { addUserToFirestore } from "../../firebase/firebase.firestore"; 

const StudentSignup: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = await registerWithEmailAndPassword(email, password);
      console.log("User registered:", user);

      await addUserToFirestore(user.uid, {
        name,
        email,
        role: "student",
        approved: true,
      });

      navigate("/login/user"); 
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
        alert("This email is already signed up.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("User logged in with Google:", user);
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="image-section">
        {/* Image section here */}
      </div>
      <div className="form-section">
        <h2>Create Your Account</h2>
        <p>Join us to start your coding journey!</p>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="social-login">
          <button onClick={handleGoogleLogin}>Continue with Google</button>
        </div>
        <p>Already have an account? <a href="/login/user">Log in</a></p>
      </div>
    </div>
  );
};

export default StudentSignup;
