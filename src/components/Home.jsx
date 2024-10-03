import { React, useState, useEffect } from "react";
import Navigation from "./Navigation";
import Piechart from "./Piechart";
import DisplayBox from "./DisplayBox";
import IncrementBox from "./IncrementBox";
// import app from "../config/firebase";
// import { ref, get, getDatabase } from "firebase/database";

const Home = () => {
  const [data, setData] = useState([
    {
      title: "Cats",
      emoji: "🐈‍⬛",
      category: "Airdrop",
      profitPercent: 233,
      amountInvested: 20000,
      returnOnInvestment: 60000,
    },

    {
      title: "Rocky Rabbit",
      emoji: "🐰",
      category: "Airdrop",
      profitPercent: -50,
      amountInvested: 5000,
      returnOnInvestment: -2500,
    },
    {
      title: "Dogs",
      emoji: "🐕",
      category: "Airdrop",
      profitPercent: 0,
      amountInvested: 0,
      returnOnInvestment: 75000,
    },
  ]);

  // const fetchData = async () => {
  //   const db = getDatabase(app);
  //   const investmentRef = ref(db, "Data/investments");
  //   const snapshot = await get(investmentRef);
  //   if (snapshot.exists()) {
  //     setData(Object.values(snapshot.val()));
  //   } else {
  //     console.log("no data");
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <main className="w-screen h-screen bg-newBlue flex items-center justify-center">
      <div className="w-full sm:w-[385px] h-screen overflow-auto p-7 bg-white rounded-lg gap-5 flex flex-col items-center justify-between">
        <Navigation />
        <div className="text-center space-y-1 mb-2">
          <p className="font-regular opacity-45 text-xs">Total Earnings</p>
          <h1 className="font-bold text-3xl">
            N <span>250,000</span>
          </h1>
        </div>
        <div>
          <Piechart />
        </div>
        <div className="w-full flex flex-row gap-5 items-center justify-between">
          <DisplayBox icon="💵" title="Capital" total="200,000" />
          <DisplayBox icon="💰" title="Earnings" total="50,000" />
        </div>
        <div className="w-full space-y-1">
          <p className="font-semibold text-[15px] opacity-45">Investments</p>
          <div className="space-y-3">
            {data.map((items, index) => {
              return (
                <IncrementBox
                  key={index}
                  icon={items.emoji}
                  title={items.title}
                  category={items.category}
                  investment={items.amountInvested}
                  profit={items.profitPercent}
                />
              );
            })}
          </div>
        </div>
        {/* <h1 className="text-red-500 bg-red-500">Data is displayed here</h1>
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
      </button> */}
      </div>
    </main>
  );
};

export default Home;
