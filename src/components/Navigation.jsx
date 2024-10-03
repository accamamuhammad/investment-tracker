import React from "react";
import GearIcon from "../assets/gear-solid.svg";

const Navigation = () => {
  return (
    <nav className="w-full flex flex-row items-center justify-between">
      <h1 className="font-medium text-xl cursor-pointer">Home</h1>
      <img src={GearIcon} alt="settings" className="w-4 cursor-pointer" />
    </nav>
  );
};

export default Navigation;
