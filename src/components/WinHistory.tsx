import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const WinHistory: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem("token") || "";
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleSubmit = async () => {
    // Handle form submission with fromDate and toDate
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    try {
      const formData = new URLSearchParams();
      formData.append("from_date", fromDate);
      formData.append("to_date", toDate);

      let apiUrl = "https://development.smapidev.co.in/api/Api/win_history";
      if (location?.state?.starLine) {
        apiUrl = "https://development.smapidev.co.in/api/Api/starline_win_history";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "ci_session=d2a8bfc834befa449f25ec1a4d1e4de08c515354",
        },
        body: formData,
      });
      response
        .json()
        .then((data: any) => {
          if (data?.code === "100") {
          } else {
            toast.error(data?.message);
          }
        })
        .catch((error: any) => {
          // alert(error);
          toast.error("An error occured");
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <NavBar2 isWinHistory={true} />
      <div className="container mx-auto p-2 rounded-lg text-white mt-4">
        <ToastContainer />
        <div className="login-primary px-4 py-4 rounded-4">
          <div className="flex justify-between items-center space-x-4">
            <h1 className="text-white">From Date</h1>
            <h1 className="text-white">To Date</h1>
          </div>

          <div className="flex justify-between">
            <input
              type="date"
              value={fromDate}
              onChange={handleFromDateChange}
              className="rounded-lg px-3 py-2 mt-2 mb-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2"
            />

            <input
              type="date"
              value={toDate}
              onChange={handleToDateChange}
              className="rounded-lg px-3 py-2 mt-2 mb-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-4"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="rounded mt-3 bg-blue-300 px-5 py-2 text-black"
          >
            SUBMIT REQUEST
          </button>
        </div>
      </div>
    </>
  );
};

export default WinHistory;
