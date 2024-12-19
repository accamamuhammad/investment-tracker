import { React, useState, useEffect } from "react";
import Navigation from "./Navigation";
import DisplayBox from "./DisplayBox";
import InvestmentBox from "./InvestmentBox";
import { app, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, getDatabase } from "firebase/database";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, ArcElement, plugins } from "chart.js";

ChartJs.register(Tooltip, ArcElement);

const Home = () => {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [userLogInStatus, setUserLogInStatus] = useState(false);
  const [investmentLabels, setInvestmentLabels] = useState([
    "Dogs",
    "Rocky Rabbit",
    "MemeFi",
    "WatCoin",
  ]);
  const [investmentAmounts, setInvestmentAmounts] = useState([120, 60, 75, 90]);
  let lossSum = 0;
  let returnSum = 0;
  let investmentSum = 0;
  let allLosses = [];
  let allInvestment = [];
  let allReturnOnInvestment = [];
  const options = {
    responsive: true,
    plugins: {},
  };

  //* Pie Chart Data
  const pieChartData = {
    labels: investmentLabels,
    datasets: [
      {
        label: "Investments",
        data: investmentAmounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  //* Categorize PieChart data
  useEffect(() => {
    // data.map((item, index) => {
    //   console.log(item);
    // });
  }, []);

  //* Check if user is logged in
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

  //* fetch data
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

  //* format data e.g 5000 = 5,000
  const formatNumber = (input) => {
    const formatter = new Intl.NumberFormat("en-US");
    return formatter.format(input);
  };

  //* calculate Loss
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
      lossSum += allLosses[index];
      setTotalLosses(lossSum);
    }
  };

  //* Total Profit
  const calculateTotalProfit = () => {
    for (let index = 0; index < data.length; index++) {
      const element = Number(data[index].returnOnInvestment);
      allReturnOnInvestment.push(element);
      returnSum += allReturnOnInvestment[index];
      setTotalProfit(formatNumber(returnSum));
    }
  };

  //* Total investment
  const calculateTotalInvested = () => {
    for (let index = 0; index < data.length; index++) {
      const element = Number(data[index].amountInvested);
      allInvestment.push(element);
      investmentSum += allInvestment[index];
      setTotalInvestment(formatNumber(investmentSum));
    }
  };

  //* run once to avoid over rendering
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
          {/* Pie Chart */}
          <Pie options={options} data={pieChartData} />
        </div>
        <div className="w-full flex flex-row gap-5 items-center justify-between">
          <DisplayBox icon="📉" title="Loss" total={totalLosses} />
          <DisplayBox icon="💰" title="Invested" total={totalInvestment} />
        </div>
        <div className="w-full space-y-1">
          <p className="font-semibold opacity-45">Investments</p>
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
            <p
              className={`${data.length === 0 ? "flex" : "hidden"} ${" opacity-80 font-medium w-full text-[15px] mt-5 flex items-center justify-center"}`}
            >
              click on "🚀" to add new investment
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
