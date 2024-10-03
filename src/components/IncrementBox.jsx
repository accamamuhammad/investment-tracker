import React from "react";

const InvestmentsBox = (props) => {
  return (
    <div className="w-full h-[60px] px-2 mt-3 gap-3 bg-newBlue rounded-lg flex flex-row items-center justify-between">
      <div className="flex flex-row space-x-3">
        <div className="w-11 h-11 text-2xl bg-white rounded-md flex items-center justify-center">
          {props.icon}
        </div>
        <div className="text-left">
          <p className="text-[14px] font-medium">{props.title}</p>
          <p className="font-regular opacity-45 text-xs">{props.category}</p>
        </div>
      </div>
      <div className="space-y-[1.5px] text-right">
        <p className="text-[13px] font-medium">{props.investment}</p>
        <p className="font-regular opacity-65 text-xs text-green-500">
          +<span>{props.profit}</span>%
        </p>
      </div>
    </div>
  );
};

export default InvestmentsBox;
