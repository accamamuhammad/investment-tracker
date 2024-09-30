import { React, useState, useEffect } from "react";
import app from "../config/firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const AddInvestment = () => {
  const [newInvestmentName, setNewInvestmentName] = useState("");
  const [newInvestmentEmoji, setNewInvestmentEmoji] = useState("");
  const [newInvestmentAmount, setNewInvestmentAmount] = useState("");
  const [newInvestmentCategory, setNewInvestmentCategory] = useState("");
  const [newInvestmentDueDate, setNewInvestmentDueDate] = useState("");
  const [newInvestmentDescription, setNewInvestmentDescription] = useState("");
  const [verified, setVerified] = useState(false);

  const categoryStyling =
    "px-3.5 py-2.5 rounded-full cursor-pointer bg-white hover:bg-blue-100 hover:opacity-75 flex items-center justify-center text-[13px]";

  const categoryStylingActive =
    "px-3.5 py-2.5 rounded-full cursor-pointer bg-blue-100 hover:bg-blue-100 hover:opacity-75 flex items-center justify-center text-[13px]";

  const saveData = async () => {
    if (verified) {
      const db = getDatabase(app);
      const investmentRef = push(ref(db, "Data/investments"));
      set(investmentRef, {
        name: newInvestmentName,
        emoji: newInvestmentEmoji,
        amount: newInvestmentAmount,
        category: newInvestmentCategory,
        due_date: newInvestmentDueDate,
        description: newInvestmentDescription,
      })
        .then(() => {
          alert("Data Saved");
          setNewInvestmentName("");
          setNewInvestmentEmoji("");
          setNewInvestmentAmount("");
          setNewInvestmentCategory("");
          setNewInvestmentDueDate("");
          setNewInvestmentDescription("");
        })
        .catch((err) => {
          alert("error: ", err.message);
        });
    } else {
      console.log("verification failed");
    }
  };

  const categorySelect = (category) => {
    setNewInvestmentCategory(category);
  };

  return (
    <div className="w-screen h-screen overflow-auto bg-newBlue flex items-center justify-center">
      <div className="w-96 py-3 flex flex-col gap-5">
        <h1 className="text-black py-3 text-center font-semibold text-xl">
          Add Investment
        </h1>
        {/* Title and icon */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="title-icon" className="font-medium text-[14px]">
            Title & Icon
          </label>
          <div className="flex flex-row bg-white items-center justify-start pl-2 rounded-xl">
            <input
              type="text"
              placeholder="📌"
              className="w-8 h-8 pl-2 bg-newBlue rounded-md flex items-center justify-center"
              onChange={(e) => setNewInvestmentEmoji(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Enter Title & Icon"
              className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl"
              onChange={(e) => setNewInvestmentName(e.target.value)}
            />
          </div>
        </div>
        {/* investment amount */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="title-icon" className="font-medium text-[14px]">
            Investment Amount
          </label>
          <div className="flex flex-row bg-white items-center justify-start pl-2 rounded-xl">
            <div className="w-9 h-8 text-[15px] bg-newBlue rounded-md flex items-center justify-center">
              ₦
            </div>
            <input
              type="number"
              placeholder="N200,000"
              className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setNewInvestmentAmount(e.target.value)}
            />
          </div>
        </div>
        {/* estimated return */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="title-icon" className="font-medium text-[14px]">
            Estimated Return
          </label>
          <div className="flex flex-row bg-white items-center justify-start pl-2 rounded-xl">
            <div className="w-9 h-8 text-[15px] bg-newBlue rounded-md flex items-center justify-center">
              %
            </div>
            <input
              type="number"
              placeholder="N20,000"
              className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setNewInvestmentDueDate(e.target.value)}
            />
          </div>
        </div>
        {/* Category */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="title-icon" className="font-medium text-[14px]">
            Select Category
          </label>
          <div className="w-full flex gap-3 flex-row flex-wrap">
            <div
              onClick={() => categorySelect("Airdrop")}
              className={
                newInvestmentCategory === "Airdrop"
                  ? categoryStylingActive
                  : categoryStyling
              }
            >
              🚀 <span className="pl-1.5 text-black opacity-50">Airdrop</span>
            </div>
            <div
              onClick={() => categorySelect("Education")}
              className={
                newInvestmentCategory === "Education"
                  ? categoryStylingActive
                  : categoryStyling
              }
            >
              📖 <span className="pl-1.5 text-black opacity-50">Education</span>
            </div>
            <div
              onClick={() => categorySelect("Commodity")}
              className={
                newInvestmentCategory === "Commodity"
                  ? categoryStylingActive
                  : categoryStyling
              }
            >
              🏆 <span className="pl-1.5 text-black opacity-50">Commodity</span>
            </div>
            <div
              onClick={() => categorySelect("Forex")}
              className={
                newInvestmentCategory === "Forex"
                  ? categoryStylingActive
                  : categoryStyling
              }
            >
              💶 <span className="pl-1.5 text-black opacity-50">Forex</span>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="title-icon" className="font-medium text-[14px]">
            Description
          </label>
          <textarea
            type="text"
            placeholder="Short Description of investment"
            className="w-full h-28 resize-none p-2.5 text-[12px] rounded-lg"
            onChange={(e) => setNewInvestmentDescription(e.target.value)}
          />
        </div>
        {/* <button>
          <a href={"/"}>cancel</a>
        </button> */}
        <button
          onClick={saveData}
          className="w-full h-9 text-sm text-white rounded-lg bg-[rgba(26,27,28)]"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default AddInvestment;
