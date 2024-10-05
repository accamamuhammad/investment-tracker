import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const SignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setUserLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setUserLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-screen h-screen py-2 px-5 bg-newBlue flex items-center justify-center">
      <div className="w-96 py-3 flex flex-col gap-4 items-center">
        <h1 className="text-6xl mb-6">👨🏽‍💻</h1>
        {/* Username */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="username" className="font-medium text-[14px]">
            Email
          </label>
          <div className="flex flex-row bg-white items-center justify-start pl-2 rounded-xl">
            <div className="w-9 h-8 text-[15px] bg-newBlue rounded-md flex items-center justify-center">
              ✉️
            </div>
            <input
              type="email"
              id="username"
              placeholder="Enter an email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        {/* Password */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="password" className="font-medium text-[14px]">
            Password
          </label>
          <div className="flex flex-row bg-white items-center justify-start pl-2 rounded-xl">
            <div className="w-9 h-8 text-[15px] bg-newBlue rounded-md flex items-center justify-center">
              🔐
            </div>
            <input
              type="password"
              id="password"
              placeholder="Enter a password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 items-center">
          <button
            onClick={SignIn}
            className="w-full h-10 opacity-95 hover:opacity-85 text-sm font-medium mt-6 text-white rounded-lg bg-[rgba(26,27,28)]"
          >
            Sign Up
          </button>
          <button
            onClick={SignInWithGoogle}
            className="w-full h-10 opacity-95 hover:opacity-85 text-sm font-medium text-white rounded-lg bg-[rgba(26,27,28)]"
          >
            Sign In with Google
          </button>
          <p className="text-right font-medium text-xs opacity-65 mt-1 cursor-pointer">
            Already have an account?{" "}
            <span className="hover:text-blue-900 text-blue-500 hover:opacity-80">
              <Link to="/LogIn">Log in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;