import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0yF58eL-DY6AV5jhpAHc9VWxiC5dTq-0",
  authDomain: "investment-tracker-ca5cf.firebaseapp.com",
  databaseURL: "https://investment-tracker-ca5cf-default-rtdb.firebaseio.com",
  projectId: "investment-tracker-ca5cf",
  storageBucket: "investment-tracker-ca5cf.appspot.com",
  messagingSenderId: "515339461599",
  appId: "1:515339461599:web:2cdb5ad58705608d919a6a",
  measurementId: "G-NB053BRGMY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { app };
