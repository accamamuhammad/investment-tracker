import { React, useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
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
    <main className="h-fit bg-secBg flex items-center justify-center overflow-x-hidden">
      <div className="w-full sm:w-[385px] min-h-screen h-fit overflow-auto p-5 gap-9 bg-mainBg flex flex-col items-center justify-start">
        <Navigation />
        {/* Main Header */}
        <div className="text-center space-y-6">
          {/* Pie Chart */}
          {/* <Pie options={options} data={pieChartData} /> */}
          <p className="text-sm">
            Last update: <span className="opacity-55">Friday, 12:45</span>
          </p>
          <div className="w-[310px] h-[310px] border-yellow-300 border rounded-full gap-1.5 flex items-center justify-center flex-col">
            <p className="font-medium opacity-65 text-2xl">Total Earnings</p>
            <h1 className="font-bold text-3xl">
              N <span>{totalProfit}</span>
            </h1>
          </div>
        </div>
        {/* <div className="w-full flex flex-row gap-5 items-center justify-between">
          <DisplayBox icon="📉" title="Loss" total={totalLosses} />
          <DisplayBox icon="💰" title="Invested" total={totalInvestment} />
        </div> */}
        {/* Assets Allocation */}
        <div className="w-full flex flex-row items-center justify-between px-3">
          <div className="flex flex-col gap-2.5 items-center justify-center">
            <div className="w-4 h-4 bg-[#63EDFC] rounded-full" />
            <p className="text-sm opacity-65 font-medium leading-5">Web3</p>
            <span className="font-medium opacity-70 text-[12px] leading-[2.5px]">
              35%
            </span>
          </div>
          <div className="flex flex-col gap-2.5 items-center justify-center">
            <div className="w-4 h-4 bg-[#FFE459] rounded-full" />
            <p className="text-sm opacity-65 font-medium leading-5">
              Education
            </p>
            <span className="font-medium opacity-70 text-[12px] leading-[2.5px]">
              35%
            </span>
          </div>
          <div className="flex flex-col gap-2.5 items-center justify-center">
            <div className="w-4 h-4 bg-[#BF47E7] rounded-full" />
            <p className="text-sm opacity-65 font-medium leading-5">Web3</p>
            <span className="font-medium opacity-70 text-[12px] leading-[2.5px]">
              35%
            </span>
          </div>
          <div className="flex flex-col gap-2.5 items-center justify-center">
            <div className="w-4 h-4 bg-[#E991F0] rounded-full" />
            <p className="text-sm opacity-65 font-medium leading-5">Web3</p>
            <span className="font-medium opacity-70 text-[12px] leading-[2.5px]">
              35%
            </span>
          </div>
        </div>
        {/* All Assets Header */}
        <div className="w-full space-y-3">
          <div className="w-full h-[1px] bg-white opacity-45 mb-4"></div>
          <div className="w-full flex items-end justify-between">
            <p className="font-semibold opacity-55">Assets</p>
            <Link
              to={"/addinvestment"}
              className="text-sm font-semibold opacity-55 cursor-pointer hover:opacity-75"
            >
              Add new {">"}
            </Link>
          </div>
          {/* All Assets */}
          <div className="space-y-4 pt-0.5">
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
              className={`${data.length === 0 ? "flex" : "hidden"} ${" opacity-70 font-medium w-full text-[15px] mt-5 flex items-center justify-center"}`}
            >
              No Investments 😔
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
