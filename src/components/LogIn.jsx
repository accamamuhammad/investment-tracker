import React, { useState } from "react";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log("User logged in successfully");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("No user found with this email. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="w-screen h-screen py-2 px-5 bg-newBlue flex items-center justify-center">
      <div className="w-96 py-3 flex flex-col gap-6 items-center">
        <h1 className="text-6xl mb-6">👨🏽‍💻</h1>
        <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
          {/* Email */}
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-[14px]">
              Email
            </label>
            <div className="flex flex-row bg-white items-center justify-start pl-2 rounded-xl">
              <div className="w-9 h-8 text-[16px] bg-newBlue rounded-md flex items-center justify-center">
                👑
              </div>
              <input
                type="email"
                id="email"
                placeholder="Enter an email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                required
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
                required
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 items-center">
            <button
              type="submit"
              className="w-full h-10 opacity-95 hover:opacity-85 text-sm font-medium mt-6 text-white rounded-lg bg-[rgba(26,27,28)]"
            >
              Log In
            </button>
            <p className="text-right font-medium text-xs opacity-45 mt-1 cursor-pointer">
              Don’t have an account?{" "}
              <Link
                to="/SignUp"
                className="hover:text-blue-600 hover:opacity-80"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
