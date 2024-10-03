import React from "react";

const DisplayBox = (props) => {
  return (
    <div className="w-full h-[55px] px-2 mt-3 gap-3 bg-newBlue rounded-lg flex flex-row items-center justify-start">
      <div className="w-10 h-10 text-xl bg-white rounded-md flex items-center justify-center">
        {props.icon}
      </div>
      <div className="space-y-[1px]">
        <p className="font-regular opacity-45 text-xs">{props.title}</p>
        <p className="text-[12px] font-medium">
          + <span>N</span>
          <span>{props.total}</span>
        </p>
      </div>
    </div>
  );
};

export default DisplayBox;
