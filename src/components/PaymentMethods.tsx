import { useEffect, useState } from "react";
import { FaCoins, FaMobileAlt, FaGoogle, FaPaypal } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { useNavigate } from "react-router-dom";

const PaymentMethods = () => {
  const token = localStorage.getItem("token") || "";

  const navigate = useNavigate();

  return (
    <div className="px-15">
      <NavBar2 isWithdraw={true} />

      <div className="custom-color text-white  shadow-md p-2 mb-3 w-100">
        <div className="flex items-center justify-around mb-2">
          <p className="text-lg font-semibold">Select Payment Methods</p>
        </div>
      </div>
      <div className="container flex justify-evenly">
        <button
          className="flex flex-col items-center space-y-1 border border-blue-900 text-blue-500 px-4 py-2 rounded-md pl-4 w-1/2 mr-10"
          onClick={() => navigate("/bank-details")}
        >
          <FaCoins className="text-3xl" /> <span>Bank</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 border border-green-500 text-green-500 px-4 py-2 rounded-md pl-4 w-1/2"
          onClick={() => navigate("/phonepe")}
        >
          <FaMobileAlt className="text-3xl" /> <span>Phone Pay</span>
        </button>
      </div>
      <div className="container flex justify-evenly mt-10">
        <button
          className="flex flex-col items-center space-y-1 border border-yellow-500 text-yellow-500 px-4 py-2 rounded-md pl-4 w-1/2 mr-10"
          onClick={() => navigate("/gpay")}
        >
          <FaGoogle className="text-3xl" /> <span>Google Pay</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 border border-indigo-500 text-indigo-500 px-4 py-2 rounded-md pl-4 w-1/2"
          onClick={() => navigate("/paytm")}
        >
          <FaPaypal className="text-3xl" /> <span>Paytm</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
