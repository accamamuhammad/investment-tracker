import { React, useState, useEffect } from "react";
import app from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, push } from "firebase/database";

const AddInvestment = () => {
  const navigate = useNavigate();
  const [newInvestmentName, setNewInvestmentName] = useState("");
  const [newInvestmentEmoji, setNewInvestmentEmoji] = useState("");
  const [newInvestmentAmount, setNewInvestmentAmount] = useState(0);
  const [newInvestmentCategory, setNewInvestmentCategory] = useState("");
  const [newInvestmentReturn, setNewInvestmentReturn] = useState(0);
  const [newInvestmentDescription, setNewInvestmentDescription] = useState("");
  const [percentageReturn, setPercentageReturn] = useState(0);
  const [newInvestmentNameState, setNewInvestmentNameState] = useState(true);
  const [newInvestmentAmountState, setNewInvestmentAmountState] =
    useState(true);
  const [newInvestmentCategoryState, setNewInvestmentCategoryState] =
    useState(true);
  const [newInvestmentReturnState, setNewInvestmentReturnState] =
    useState(true);
  const [newInvestmentDescriptionState, setNewInvestmentDescriptionState] =
    useState(true);

  const categoryContainerStyling = "w-full flex gap-3 flex-row flex-wrap";
  const categoryContainerStylingError =
    "w-full flex gap-3 flex-row flex-wrap border border-red-600";

  const categoryStyling =
    "px-3.5 py-2.5 rounded-full cursor-pointer bg-white hover:bg-blue-100 hover:opacity-75 flex items-center justify-center text-[13px]";

  const categoryStylingActive =
    "px-3.5 py-2.5 rounded-full cursor-pointer bg-blue-100 hover:bg-blue-100 hover:opacity-75 flex items-center justify-center text-[13px]";

  const inputContinerStyling =
    "flex flex-row bg-white items-center justify-start pl-2 rounded-xl";

  const inputContinerStylingError =
    "flex border-red-600 border flex-row bg-white items-center justify-start pl-2 rounded-xl";

  const textAreaStlying =
    "w-full h-28 resize-none p-2.5 text-[12px] rounded-lg";

  const textAreaStlyingError =
    "w-full h-28 resize-none p-2.5 text-[12px] rounded-lg border border-red-600";

  const categorySelect = (category) => {
    setNewInvestmentCategory(category);
  };

  const saveData = async () => {
    const db = getDatabase(app);
    const investmentRef = push(ref(db, "Data/investments"));
    set(investmentRef, {
      title: newInvestmentName,
      emoji: newInvestmentEmoji,
      category: newInvestmentCategory,
      amountInvested: newInvestmentAmount,
      returnOnInvestment: newInvestmentReturn,
      profitPercent: percentageReturn,
      description: newInvestmentDescription,
    })
      .then(() => {
        alert("New Investment");
        setNewInvestmentName("");
        setNewInvestmentEmoji("");
        setNewInvestmentAmount("");
        setNewInvestmentCategory("");
        setNewInvestmentReturn("");
        setNewInvestmentDescription("");
        setPercentageReturn(0);
        navigate("/");
      })
      .catch((err) => {
        alert("error: ", err.message);
      });
  };

  const verificationProcess = () => {
    if (newInvestmentName === "") {
      alert("Add a Title");
      setNewInvestmentNameState(false);
    } else if (newInvestmentEmoji === "") {
      alert("Dont forget to change the icon emoji");
    } else if ((newInvestmentAmount === 0) | (newInvestmentAmount === "")) {
      alert("Add an investment amount");
      setNewInvestmentAmountState(false);
    } else if ((newInvestmentReturn === 0) | (newInvestmentReturn === "")) {
      alert("Select a return");
      setNewInvestmentReturnState(false);
    } else if (newInvestmentCategory === "") {
      alert("Select a category");
      setNewInvestmentCategoryState(false);
    } else if (newInvestmentDescription === "") {
      alert("Dont forget to add the description");
      setNewInvestmentDescriptionState(false);
    } else {
      saveData();
    }
  };

  useEffect(() => {
    if (newInvestmentName !== "") {
      setNewInvestmentNameState(true);
    }
    if (newInvestmentAmount !== "") {
      setNewInvestmentAmountState(true);
    }
    if (newInvestmentReturn !== "") {
      setNewInvestmentReturnState(true);
    }
    if (newInvestmentCategory === "") {
      setNewInvestmentCategoryState(true);
    }
    if (newInvestmentDescription === "") {
      setNewInvestmentDescriptionState(true);
    }
  }, [
    newInvestmentName,
    newInvestmentAmount,
    newInvestmentReturn,
    newInvestmentCategory,
    newInvestmentDescription,
  ]);

  useEffect(() => {
    if (newInvestmentAmount < 1) {
      setPercentageReturn(0);
    } else {
      setPercentageReturn(
        Math.floor((newInvestmentReturn / newInvestmentAmount) * 100)
      );
      console.log(
        Math.floor((newInvestmentReturn / newInvestmentAmount) * 100)
      );
    }
  }, [newInvestmentAmount, newInvestmentReturn]);

  return (
    <div className="w-screen h-fit py-2 px-5 bg-newBlue flex items-center justify-center">
      <div className="w-96 py-3 flex flex-col gap-5">
        <h1 className="text-black py-3 text-center font-semibold text-xl">
          Add Investment
        </h1>
        {/* Title and icon */}
        <div className="w-full flex flex-col gap-1">
          <p className="font-medium text-[14px]">Title & Icon</p>
          <div
            className={`${newInvestmentNameState ? inputContinerStyling : inputContinerStylingError}`}
          >
            <input
              type="text"
              id="title"
              placeholder="📌"
              className="w-8 h-8 pl-2 bg-newBlue rounded-md flex items-center justify-center"
              onChange={(e) => setNewInvestmentEmoji(e.target.value)}
            ></input>
            <input
              type="text"
              id="icon"
              placeholder="Enter Title & Icon"
              className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl"
              onChange={(e) => setNewInvestmentName(e.target.value)}
            />
          </div>
        </div>
        {/* investment amount */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="Amount" className="font-medium text-[14px]">
            Investment Amount
          </label>
          <div
            className={`${newInvestmentAmountState ? inputContinerStyling : inputContinerStylingError}`}
          >
            <div className="w-9 h-8 text-[15px] bg-newBlue rounded-md flex items-center justify-center">
              ₦
            </div>
            <input
              type="number"
              id="Amount"
              placeholder="N200,000"
              className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setNewInvestmentAmount(e.target.value)}
            />
          </div>
        </div>
        {/* estimated return */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="return" className="font-medium text-[14px]">
            Total Return{" "}
            <span className="opacity-45 font-regular text-[11px]">
              (including profit)
            </span>
          </label>
          <div
            className={`${newInvestmentReturnState ? inputContinerStyling : inputContinerStylingError}`}
          >
            <div className="w-9 h-8 text-[15px] bg-newBlue rounded-md flex items-center justify-center">
              💸
            </div>
            <input
              type="number"
              id="return"
              placeholder="N20,000"
              className="w-full h-12 pl-2.5 text-[12px] rounded-r-xl  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setNewInvestmentReturn(e.target.value)}
            />
          </div>
        </div>
        {/* Category */}
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium text-[14px]">Select Category</p>
          <div
            className={`${newInvestmentCategoryState ? categoryContainerStyling : categoryContainerStylingError}`}
          >
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
          <label htmlFor="description" className="font-medium text-[14px]">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="Short Description of investment"
            className={`${newInvestmentDescriptionState ? textAreaStlying : textAreaStlyingError}`}
            onChange={(e) => setNewInvestmentDescription(e.target.value)}
          />
        </div>
        {/* <button>
          <a href={"/"}>cancel</a>
        </button> */}
        <button
          onClick={verificationProcess}
          className="w-full h-9 text-sm text-white rounded-lg bg-[rgba(26,27,28)]"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default AddInvestment;
