import React from "react";

const Navigation = () => {
  let baseStyling =
    "w-10 h-10 shadow-sm text-white bg-neutral-50 cursor-pointer rounded-full flex items-center justify-center font-bold text-xl";

  return (
    <nav className="w-full flex flex-row items-center justify-between">
      <div className={baseStyling}>
        <a href="/">👨🏽‍💻</a>
      </div>
      <div className={baseStyling}>
        <a href="/addinvestment">🚀</a>
      </div>
    </nav>
  );
};

export default Navigation;
