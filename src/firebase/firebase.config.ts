
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmm5qBrTHwsMNZbtQNtqNwF8mkr8JwoUM",
  authDomain: "learning-app-8ea80.firebaseapp.com",
  projectId: "learning-app-8ea80",
  storageBucket: "learning-app-8ea80.firebasestorage.app",
  messagingSenderId: "561632208199",
  appId: "1:561632208199:web:f67937cee3772ca8b45862",
  measurementId: "G-H41BCD196B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firestore = getFirestore(app);
export { firestore };
export const googleProvider = new GoogleAuthProvider();
export default app;