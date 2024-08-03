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
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token") || "";

const TRANSACTION_URL =
  "https://development.smapidev.co.in/api/Api/wallet_statement";

const transferVerifyDetails = async (mobile) => {
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
    console.log(data)
    if (data.code==="100") {
      toast.success("Verification successful!");
    } else {
      toast.error("Verification failed!");
    }
  } catch (error) {
    console.error("Error", error);
    toast.error("An error occurred during verification.");
  }
};

const Transfer = () => {
  const [mobile, setMobile] = useState("");

  return (
    <div>
      <NavBar2 isTransfer={true} />
      <div className="container mx-auto relative">
        <div className="custom-color text-white rounded-lg shadow-md p-2 mb-3 w-100">
          <div className="flex justify-around mb-2">
            <form>
              <div className="flex flex-col">
                <label htmlFor="mobile">Mobile</label>
                <input
                  id="mobile"
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="text-gray-900"
                />
              </div>
            </form>
          </div>
          <p className="text-2xl font-semibold text-white-800"></p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-2">
          <button
            className="bg-white add-points shadow-lg text-custom py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={() => transferVerifyDetails(mobile)}
          >
            Verify
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Transfer;

// Define the type for each transaction in the statement
// type DataType = {
//   created_at: string;
//   points: string;
//   trans_det: string;
//   trans_msg: string;
//   trans_status: string;
//   trans_type: string;
// };

// Define the type for the main response
// type ResponseType = {
//   available_points: string;
//   statement: DataType[]; // Defines the structure of each transaction array
//   withdraw_open_time: string;
//   withdraw_close_time: string;
// };
