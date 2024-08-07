import React, { useEffect, useState } from "react";
import {  FaPaypal,FaCoins } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";

const BankDetails = () => {
  const token = localStorage.getItem("token") || "";

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar2 isWithdraw={true} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-950">Bank Details</h2>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2 text-left">
        Account Holder Name
            </label>
            <div className="flex">
              <div className="flex-grow">
                <input
                  id="phone_number"
                  placeholder="Enter Account Holder number"
                  type="text"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Account Number
            </label>
            <div className="flex">
              <div className="flex-grow">
                <input
                  id="phone_number"
                  placeholder="Enter Account number"
                  type="text"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2 text-left">
          IFSC CODE
            </label>
            <div className="flex">
              <div className="flex-grow">
                <input
                  id="phone_number"
                  placeholder="Enter IFSC Code"
                  type="text"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2 text-left">
         Bank Name
            </label>
            <div className="flex">
              <div className="flex-grow">
                <input
                  id="phone_number"
                  placeholder="Enter Bank Name"
                  type="text"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2 text-left">
             Branch Address
            </label>
            <div className="flex">
              <div className="flex-grow">
                <input
                  id="phone_number"
                  placeholder="Enter Branch Address"
                  type="text"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50 transition duration-200 ease-in-out flex items-center justify-center">
              <FaCoins className="mr-2" />
              Verify with Bank
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;