import { React, useState, useEffect } from "react";
import app from "../config/firebase";
import { ref, get, getDatabase } from "firebase/database";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const investmentRef = ref(db, "Data/investments");
    const snapshot = await get(investmentRef);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));
    } else {
      console.log("no data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <h1 className="text-red-500 bg-red-500">Data is displayed here</h1>
      <ul>
        {data.map((investment, index) => {
          return (
            <li key={index}>
              <p className="text-3xl font-bold underline">{investment.name}</p>
              <p>{investment.category}</p>
              <p>{investment.emoji}</p>
              <p>{investment.amount}</p>
              <p>{investment.due_date}</p>
            </li>
          );
        })}
      </ul>
      <button>
        <a href={"/addinvestment"}>New Investment</a>
      </button>
    </div>
  );
};

export default Home;
