import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Settings = () => {
  const SignOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen px-5 flex items-center justify-center flex-col gap-5">
      <h1 className="font-bold text-2xl">Settings</h1>
      <button
        onClick={SignOutUser}
        className="w-full h-10 opacity-95 hover:opacity-85 text-sm font-medium mt-1 text-white rounded-lg bg-[rgba(26,27,28)]"
      >
        <Link to="/">Log Out</Link>
      </button>
    </div>
  );
};

export default Settings;
