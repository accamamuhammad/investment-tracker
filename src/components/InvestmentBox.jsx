import React, { useState, useEffect } from "react";

const InvestmentsBox = (props) => {
  const [profitState, setProfitState] = useState();
  const [formattedNumber, setFormattedNumber] = useState();

  const handleProfitState = () => {
    if (props.profit < 0) {
      setProfitState("");
    } else {
      setProfitState("+");
    }
  };

  const formatNumber = (input) => {
    const formatter = new Intl.NumberFormat("en-US");
    return formatter.format(input);
  };

  useEffect(() => {
    handleProfitState();
    setFormattedNumber(formatNumber(props.TotalGain));
  }, []);

  return (
    <div className="w-full h-[60px] cursor-pointer px-2 mt-3 gap-3 bg-newBlue rounded-lg flex flex-row items-center justify-between">
      <div className="flex flex-row space-x-3">
        <div className="w-11 h-11 text-2xl bg-white rounded-md flex items-center justify-center">
          {props.icon}
        </div>
        <div className="text-left flex flex-col items-start justify-center">
          <p className="text-[14px] font-medium">{props.title}</p>
          <p className="font-regular opacity-45 text-xs">{props.category}</p>
        </div>
      </div>
      <div className="space-y-[1.5px] text-right">
        <p className="text-[13px] font-medium">
          N<span>{formattedNumber}</span>
        </p>
        <p
          className={`${"font-regular opacity-65 text-xs"} ${profitState === "+" ? " text-green-500" : " text-red-500"}`}
        >
          <span>{profitState}</span>
          <span>{props.profit}</span>%
        </p>
      </div>
    </div>
  );
};

export default InvestmentsBox;
