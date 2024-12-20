import React, { useState, useEffect } from "react";

const InvestmentsBox = (props) => {
  const [profitState, setProfitState] = useState();
  const [formattedNumber, setFormattedNumber] = useState();
  const [colorCode, setColorCode] = useState({
    Web3: "#63EDFC",
    Commodity: "#FFE459",
    Education: "#BF47E7",
    Selfcare: "#E991F0",
  });
  const [tempColor, setTempColor] = useState("");

  useEffect(() => {
    const temp = props.category;
    setTempColor(colorCode[temp]);
  }, []);

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
    <div className="w-full h-[60px] cursor-pointer px-2 mt-3 gap-3 bg-secBg rounded-lg flex flex-row items-center justify-between">
      <div className="flex flex-row space-x-3">
        <div className="w-11 h-11 text-2xl bg-mainBg rounded-md flex items-center justify-center">
          {props.icon}
        </div>
        <div className="text-left space-y-1 flex flex-col items-start justify-center">
          <p className="text-sm font-medium">{props.title}</p>
          <div className="font-regular text-[0.65rem] flex flex-row items-center justify-center gap-1">
            <div
              className="w-2 h-2 mb-[1px] rounded-full"
              style={{ backgroundColor: tempColor }}
            ></div>
            <p className="opacity-45"> {props.category}</p>
          </div>
        </div>
      </div>
      <div className="space-y-1 text-right">
        <p className="text-sm opacity-70 font-medium">
          N<span>{formattedNumber}</span>
        </p>
        <p
          className={`${"font-regular opacity-65 text-xs"} ${profitState === "+" ? " text-green-600" : " text-red-500"}`}
        >
          <span>{profitState}</span>
          <span>{props.profit}</span>%
        </p>
      </div>
    </div>
  );
};

export default InvestmentsBox;
