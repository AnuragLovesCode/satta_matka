import React, { useEffect, useState } from "react";
import {
  FaWallet,
  FaMoneyBill,
  FaExchangeAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { NavBar2 } from "./NavBar2";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Define the type for each transaction in the statement
type DataType = {
  created_at: string;
  points: string;
  trans_det: string;
  trans_msg: string;
  trans_status: string;
  trans_type: string;
};

// Define the type for the main response
type ResponseType = {
  available_points: string;
  statement: DataType[]; // Defines the structure of each transaction array
  withdraw_open_time: string;
  withdraw_close_time: string;
};

const TRANSACTION_URL =
  "https://development.smapidev.co.in/api/Api/wallet_statement";

const Wallet = () => {
  const [transactionsData, setTransactionsData] = useState<ResponseType | null>(
    null
  );
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const transactionDetails = async () => {
    const response = await fetch(TRANSACTION_URL, {
      headers: {
        token,
      },
    });

    const data = await response.json();
    setTransactionsData(data.data);
  };

  useEffect(() => {
    transactionDetails(); // calling the transactionDetails here
  }, []);

  const handleAFund = () => {
    navigate("/funds"); // Navigate to the home page
  };
  const handleWallet = () => {
    navigate("/withdraw"); // Navigate to the home page
  };

  const hendleTransfer = async () => {
    const user_status_API =
      "https://development.smapidev.co.in/api/Api/user_status";

    const response = await fetch(user_status_API, {
      headers: {
        token,
      },
    });

    const data = await response.json();
    const trans = await data.data.transfer;
    if (trans == "1") {
      toast.success("You are Eligible")
    } else {
      toast.error("You are not Eligible")
    }
  };
  return (
    <div>
      <NavBar2 isWallet={true} />
      <div className="container mx-auto relative">
        {/* Total Balance Card */}
        <div className="custom-color text-white rounded-lg shadow-md p-2 mb-3 w-100">
          <div className="flex items-center justify-around mb-2">
            <p className="text-lg font-semibold">Total Balance</p>
          </div>
          <p className="text-2xl font-semibold text-white-800">
            ₹ {transactionsData?.available_points}
          </p>
        </div>

        {/* Withdraw and Bank Method Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          {/* Add Points Button */}
          <button
            className="bg-white add-points shadow-md text-custom py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleAFund}
          >
            Add Points
          </button>
          <button
            className="bg-white shadow-md text-custom py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleWallet}
          >
            <FaMoneyBill className="text-xl mr-2" />
            <span>Withdraw</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button className="bg-white shadow-md text-custom py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
            <FaExchangeAlt className="text-xl mr-2" />
            <span>Bank Method</span>
          </button>
          {/* Transfer Button */}
          <button
            className="bg-white shadow-md flex justify-center py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={hendleTransfer}
          >
            <FaExchangeAlt className="text-xl mr-2" />
            <span>Transfer</span>
          </button>
        </div>
        {/* Welcome Bonus Card */}
        {transactionsData?.statement.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center border-l-4 border-green-500 mt-2"
            >
              <div className="text-left">
                <p className="text font-bold text-custom">
                  {item.trans_msg}
                </p>
                <p
                  className={`text-lg font-semibold ${
                    item.trans_type === "credit"
                      ? "text-green-500"
                      : "text-red-600"
                  }`}
                >
                  {item.trans_type === "credit"
                    ? `+${item.points}`
                    : `-${item.points}`}
                </p>
                <div className="flex items-center text-custom">
                  <MdDateRange className="text-xl mr-1" />
                  <p className="text-sm">{item.created_at}</p>
                </div>
              </div>
              <p className="text-lg text-custom">{item.trans_status}</p>
            </div>
          );
        })}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Wallet;
