import { React, useState, useEffect } from "react";
import app from "../config/firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const AddInvestment = () => {
  const [newInvestmentName, setNewInvestmentName] = useState("");
  const [newInvestmentEmoji, setNewInvestmentEmoji] = useState("");
  const [newInvestmentCategory, setNewInvestmentCategory] = useState("");
  const [newInvestmentAmount, setNewInvestmentAmount] = useState("");
  const [newInvestmentDueDate, setNewInvestmentDueDate] = useState("");

  const saveData = async () => {
    const db = getDatabase(app);
    const investmentRef = push(ref(db, "Data/investments"));
    set(investmentRef, {
      name: newInvestmentName,
      emoji: newInvestmentEmoji,
      category: newInvestmentCategory,
      amount: newInvestmentAmount,
      due_date: newInvestmentDueDate,
    })
      .then(() => {
        alert("Data Saved");
      })
      .catch((err) => {
        alert("error: ", err.message);
      });
  };

  return (
    <div>
      <h1>New Investment</h1>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setNewInvestmentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Emoji"
        onChange={(e) => setNewInvestmentEmoji(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Category"
        onChange={(e) => setNewInvestmentCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Amount"
        onChange={(e) => setNewInvestmentAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Due date"
        onChange={(e) => setNewInvestmentDueDate(e.target.value)}
      />
      <button>
        <a href={"/"}>cancel</a>
      </button>
      <button onClick={saveData}>Save Data</button>
    </div>
  );
};

export default AddInvestment;
