import { React, useState, useEffect } from "react";
import Navigation from "./Navigation";
import DisplayBox from "./DisplayBox";
import InvestmentBox from "./InvestmentBox";
import app from "../config/firebase";
import { ref, get, getDatabase } from "firebase/database";

const Home = () => {
  const [data, setData] = useState([]);
  const [totalProfit, setTotalProfit] = useState();
  const [totalInvestment, setTotalInvestment] = useState();
  const [totalLosses, setTotalLosses] = useState();
  let lossSum = 0;
  let returnSum = 0;
  let investmentSum = 0;
  let allLosses = [];
  let allInvestment = [];
  let allReturnOnInvestment = [];

  // fetch data
  const fetchData = async () => {
    const db = getDatabase(app);
    const investmentRef = ref(db, "Data/investments");

    try {
      const snapshot = await get(investmentRef);
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      } else {
        console.log("No data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Status = () => {
    console.log("Data fetched");
  };

  // format data e.g 5000 = 5,000
  const formatNumber = (input) => {
    const formatter = new Intl.NumberFormat("en-US");
    return formatter.format(input);
  };

  // calculate Loss
  const calculateLoss = () => {
    for (let index = 0; index < data.length; index++) {
      const element = Number(data[index].returnOnInvestment);
      if (element < 0) {
        allLosses.push(element);
      }
    }
    for (let index = 0; index < allLosses.length; index++) {
      lossSum += allLosses[index];
      setTotalLosses(lossSum);
    }
  };

  // Total Profit
  const calculateTotalProfit = () => {
    for (let index = 0; index < data.length; index++) {
      const element = Number(data[index].returnOnInvestment);
      allReturnOnInvestment.push(element);
      returnSum += allReturnOnInvestment[index];
      setTotalProfit(formatNumber(returnSum));
    }
  };

  // Total investment
  const calculateTotalInvested = () => {
    for (let index = 0; index < data.length; index++) {
      const element = Number(data[index].amountInvested);
      allInvestment.push(element);
      investmentSum += allInvestment[index];
      setTotalInvestment(formatNumber(investmentSum));
    }
  };

  // run once to avoid over rendering
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalProfit();
    calculateTotalInvested();
    calculateLoss();
  }, [data]);

  return (
    <main className="w-screen h-fit bg-newBlue flex items-center justify-center">
      <div className="w-full sm:w-[385px] h-screenHeight overflow-auto p-7 bg-white rounded-lg gap-5 flex flex-col items-center justify-between">
        <Navigation />
        <div className="text-center space-y-1 mb-2">
          <p className="font-regular opacity-45 text-xs">Total Earnings</p>
          <h1 className="font-bold text-3xl">
            N <span>{totalProfit}</span>
          </h1>
        </div>
        <div>
          <div className="w-56 h-56 rounded-full bg-newBlue"></div>
        </div>
        <div className="w-full flex flex-row gap-5 items-center justify-between">
          <DisplayBox icon="📉" title="Loss" total={totalLosses} />
          <DisplayBox icon="💰" title="Invested" total={totalInvestment} />
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
