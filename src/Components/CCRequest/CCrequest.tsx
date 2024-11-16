import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CCrequest.css";
import { registerWithEmailAndPassword } from "../../firebase/authService";
import { addUserToFirestore } from "../../firebase/firebase.firestore";

const CCrequest: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await registerWithEmailAndPassword(email, password);
      const userId = userCredential.uid;

      await addUserToFirestore(userId, {
        name,
        email,
        role: "creator",
        approved: false,
      });

      setMessage("Your request has been sent to the admin for approval.");

      setTimeout(() => {
        navigate("/login/cc");
      }, 3000);

    } catch (error) {
      setMessage("Failed to send request. Please try again.");
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="cc-request-container">
      <div className="form-section">
        <h2>Request Content Creator Access</h2>
        <p>Fill in your details to send a request</p>
        <form onSubmit={handleRequest}>
          <input
            type="text"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Send Request</button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>
      <div className="image-section">
       
      </div>
    </div>
  );
};

export default CCrequest;
