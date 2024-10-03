import { React, useState, useEffect } from "react";
import Navigation from "./Navigation";
import DisplayBox from "./DisplayBox";
import InvestmentBox from "./InvestmentBox";
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
          <div className="w-56 h-56 rounded-full bg-newBlue"></div>
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
                <InvestmentBox
                  key={index}
                  icon={items.emoji}
                  title={items.title}
                  category={items.category}
                  TotalGain={items.returnOnInvestment}
                  profit={items.profitPercent}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
