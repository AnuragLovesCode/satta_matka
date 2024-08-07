import React, { useEffect, useState } from "react";
import { FaCoins, FaMobileAlt, FaGoogle, FaPaypal, FaPhone } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";

const PayTmDetails = () => {
  const token = localStorage.getItem("token") || "";

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar2 isWithdraw={true} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-950">PayTM Details</h2>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Phone Number
            </label>
            <div className="flex">
              <div className="flex-grow">
                <input
                  id="phone_number"
                  placeholder="Enter phone number"
                  type="text"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                />
              </div>
              <button className="ml-2 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50 transition duration-200 ease-in-out">
                Verify
              </button>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50 transition duration-200 ease-in-out flex items-center justify-center">
              <FaPaypal className="mr-2" />
              Verify with PayTm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayTmDetails;