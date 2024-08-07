import React, { useState } from "react";
import {
  FaWallet,
  FaMoneyBill,
  FaExchangeAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token") || "";

const TRANSACTION_URL =
  "https://development.smapidev.co.in/api/Api/wallet_statement";

const Transfer = () => {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate =useNavigate()

  const transferVerifyDetails = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("user_number", mobile);
      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/transfer_verify",
        {
          method: "POST",
          headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.code === "100") {
        toast.success("Verification successful!");
        setName(data?.data?.name);
        setIsVerified(true);
      } else {
        toast.error("Verification failed!");
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred during verification.");
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("user_number", mobile);
      formData.append("points", points);
      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/transfer_points",
        {
          method: "POST",
          headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success(data.message);
      setTimeout(() => {
        navigate("/")
      }, 2000);

    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <NavBar2 isTransfer={true} />
      <div className="container mx-auto bg-white rounded-lg shadow-md p-6 mb-6 max-w-md">
        <div className="flex flex-col mb-4">
          <label
            htmlFor="mobile"
            className="text-lg font-medium text-gray-700 text-left"
          >
            Mobile
          </label>
          <input
            id="mobile"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {name && (
          <div className="mb-4">
            <p className="text-xl font-semibold text-green-600 flex items-center">
              <FaCheck className="mr-2" />
              {name}
            </p>
          </div>
        )}

        {isVerified && (
          <div className="flex flex-col mb-4">
            <label
              htmlFor="points"
              className="text-lg font-medium text-gray-700 text-left"
            >
              Points
            </label>
            <input
              id="points"
              type="text"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
            className={`py-2 px-4 rounded-lg shadow-lg text-white ${
              isVerified
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-500 hover:bg-green-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={
              isVerified ? handleSubmit : () => transferVerifyDetails(mobile)
            }
          >
            {isVerified ? "Submit" : "Verify"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Transfer;
