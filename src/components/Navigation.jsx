import { useState, React, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const [userLogInStatus, setUserLogInStatus] = useState(false);

  let baseStyling =
    "w-9 h-9 shadow-sm text-white cursor-pointer rounded-full flex items-center justify-center font-bold text-xl";

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
      <div className={baseStyling}>
        <h1 className="pl-8 opacity-70">Investo</h1>
      </div>
      <div
        className={`${baseStyling} ${userLogInStatus ? "" : "w-[26px] h-[26px]"}`}
      >
        <Link to={userLogInStatus ? "/Settings" : "/SignUp"}>
          {userLogInStatus ? (
            <FontAwesomeIcon icon={faGear} />
          ) : (
            <FontAwesomeIcon icon={faUser} color="white" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
