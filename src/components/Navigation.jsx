import { useState, React, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";

const Navigation = () => {
  const [userLogInStatus, setUserLogInStatus] = useState(false);

  let baseStyling =
    "w-9 h-9 shadow-sm text-white bg-neutral-50 hover:bg-neutral-100 cursor-pointer rounded-full flex items-center justify-center font-bold text-xl";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogInStatus(true);
      } else {
        setUserLogInStatus(false);
      }
    });
  }, []);

  return (
    <nav className="w-full flex flex-row items-center justify-between">
      <div
        className={`${baseStyling} ${userLogInStatus ? "" : "w-[26px] h-[26px] border-[1.5px] border-black"}`}
      >
        <Link to={userLogInStatus ? "/Settings" : "/SignUp"}>
          {userLogInStatus ? (
            "⚙️"
          ) : (
            <img src={UserIcon} alt="SigUp" className="h-5" />
          )}
        </Link>
      </div>
      <div className={baseStyling}>
        <Link to={userLogInStatus ? "/addinvestment" : "/SignUp"}>🚀</Link>
      </div>
    </nav>
  );
};

export default Navigation;
