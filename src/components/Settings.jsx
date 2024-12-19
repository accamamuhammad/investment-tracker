import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";

const Settings = () => {
  const SignOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-fit flex items-center justify-center">
      <div className="w-full sm:w-[385px] h-screenHeight py-6 bg-white rounded-lg gap-4 flex flex-col items-center justify-between">
        <div className="w-full flex flex-col justify-between items-center">
          <div className="w-full flex px-6 flex-row justify-between items-center">
            <Link to="/">
              <FontAwesomeIcon
                icon={faCaretLeft}
                size="lg"
                className="cursor-pointer"
              />
            </Link>
            <FontAwesomeIcon
              icon={faCaretLeft}
              size="xl"
              className="opacity-0"
            />
          </div>
          <div className="w-full mx-5 space-y-6 flex flex-col items-center justify-center">
            {/* User icon */}
            <div className="w-44 h-44 shadow bg-newBlue rounded-full flex items-center justify-center"></div>
            {/* User name */}
            <h1 className="font-semibold text-2xl">Ahmad Muhammad</h1>
          </div>
        </div>
        <div className="w-full space-y-2 px-4 overflow-auto">
          {/* Account */}
          <div className="w-full h-14 gap-3 cursor-pointer flex items-center justify-start">
            <div className="w-9 h-9 bg-newBlue rounded-md flex items-center justify-center">
              📂
            </div>
            <h1 className="font-semibold text-sm">Account</h1>
          </div>
          {/* Feedback */}
          <div className="w-full h-14 gap-3 cursor-pointer flex items-center justify-start">
            <div className="w-9 h-9 bg-newBlue rounded-md flex items-center justify-center">
              🎙️
            </div>
            <h1 className="font-semibold text-sm">Feedback</h1>
          </div>
          {/* Privacy policy */}
          <div className="w-full h-14 gap-3 cursor-pointer flex items-center justify-start">
            <div className="w-9 h-9 bg-newBlue rounded-md flex items-center justify-center">
              🔒
            </div>
            <h1 className="font-semibold text-sm">Privacy Policy</h1>
          </div>
          {/* Customer support */}
          <div className="w-full h-14 gap-3 cursor-pointer flex items-center justify-start">
            <div className="w-9 h-9 bg-newBlue rounded-md flex items-center justify-center">
              👨🏽‍💻
            </div>
            <h1 className="font-semibold text-sm">Customer Support</h1>
          </div>
          {/* Reset */}
          <div className="w-full h-14 gap-3 cursor-pointer flex items-center justify-start">
            <div className="w-9 h-9 bg-newBlue rounded-md flex items-center justify-center">
              🗒️
            </div>
            <h1 className="font-semibold text-sm">Reset</h1>
          </div>
          {/* Privacy */}
          <div className="w-full h-14 gap-3 cursor-pointer flex items-center justify-start">
            <div className="w-9 h-9 bg-newBlue rounded-md flex items-center justify-center">
              🔐
            </div>
            <h1 className="font-semibold text-sm">Privacy</h1>
          </div>
          {/* Contact */}
          <div className="w-full h-14 gap-3 cursor-pointer flex items-center justify-start">
            <div className="w-9 h-9 bg-newBlue rounded-md flex items-center justify-center">
              ☎️
            </div>
            <h1 className="font-semibold text-sm">Contact</h1>
          </div>
          {/* Terms and condition */}
          <div className="w-full h-14 gap-3 cursor-pointer flex items-center justify-start">
            <div className="w-9 h-9 bg-newBlue rounded-md flex items-center justify-center">
              📄
            </div>
            <h1 className="font-semibold text-sm">Terms and Condition</h1>
          </div>
        </div>
        <button
          onClick={SignOutUser}
          className="w-[95.5%] sm:w-[385px] h-12 absolute bottom-5 mx-5 shadow text-sm font-medium mt-1 text-white rounded-lg bg-[rgba(26,27,28)] hover:bg-[rgba(2,22,22)]"
        >
          <Link to="/">Log Out</Link>
        </button>
      </div>
    </div>
  );
};

export default Settings;
