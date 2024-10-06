import { React, useState, useEffect } from "react";
import Navigation from "./Navigation";
import DisplayBox from "./DisplayBox";
import InvestmentBox from "./InvestmentBox";
import { app, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, getDatabase } from "firebase/database";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [userLogInStatus, setUserLogInStatus] = useState(false);
  let lossSum = 0;
  let returnSum = 0;
  let investmentSum = 0;
  let allLosses = [];
  let allInvestment = [];
  let allReturnOnInvestment = [];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLogInStatus(true);
      } else {
        setUserLogInStatus(false);
      }
    });
  }, []);

  // fetch data
  const fetchData = async () => {
    const db = getDatabase(app);
    const investmentRef = ref(
      db,
      `AllUserData/${currentUser?.uid}/investments`
    );
    try {
      const snapshot = await get(investmentRef);
      if (snapshot.exists() && userLogInStatus) {
        setData(Object.values(snapshot.val()));
      } else {
        if (snapshot.exists()) {
          console.log("user not logged in");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // format data e.g 5000 = 5,000
  const formatNumber = (input) => {
    const formatter = new Intl.NumberFormat("en-US");
    return formatter.format(input);
  };

  // calculate Loss
  const calculateLoss = () => {
    for (let index = 0; index < data.length; index++) {
      const returnOn = Number(data[index].returnOnInvestment);
      const amountOf = Number(data[index].amountInvested);

      let lossAmount = returnOn - amountOf;
      if (lossAmount < 0) {
        allLosses.push(lossAmount);
      }
    }
    for (let index = 0; index < allLosses.length; index++) {
      console.log("a");
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
  }, [currentUser]);

  useEffect(() => {
    calculateLoss();
    calculateTotalProfit();
    calculateTotalInvested();
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
          <div className="w-56 h-56 rounded-full bg-newBlue flex items-center justify-center">
            {userLogInStatus ? (
              <div>
                <h1 className="font-semibold text-xs opacity-55">Piechart</h1>
              </div>
            ) : (
              <div className="space-y-5">
                <h1 className="px-1 text-center font-semibold text-xs opacity-55">
                  Click the "🚀" To add new investment
                </h1>
                <h1 className="px-1 text-center font-semibold text-xs opacity-55">
                  Click the "⚙️" To access settings
                </h1>
              </div>
            )}
          </div>
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
