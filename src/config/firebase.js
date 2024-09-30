// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export default app;
