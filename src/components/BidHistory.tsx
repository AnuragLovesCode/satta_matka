import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

type DataType = {
  bid_points: string;
  bidded_at: string;
  game_name: string;
  game_type: string;
  close_digit?: string;
  close_panna?: string;
  open_digit?: string;
  open_panna?: string;
  session: string;
};

export const BidHistory: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem("token") || "";
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const [historyDetails, setHistoryDetails] = useState<DataType[]>([]);

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    try {
      const formData = new URLSearchParams();
      formData.append("from_date", fromDate || "");
      formData.append("to_date", toDate || "");

      let apiUrl = "https://development.smapidev.co.in/api/Api/bid_history";

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
            setHistoryDetails(data.data);
            console.log(data.data);
          } else {
            toast.error(data?.message);
          }
        })
        .catch((error: any) => {
          toast.error("An error occurred");
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <NavBar2 isBidHistory={true} />
      <div className="container mx-auto p-2 rounded-lg text-white mt-4">
        <ToastContainer />
        <div className="login-primary px-4 py-4 rounded-4">
          <div className="flex justify-between">
            <h1 className="text-white">From Date</h1>
            <h1 className="text-white">To Date</h1>
          </div>

          <div className="flex justify-around">
            <input
              type="date"
              value={fromDate}
              onChange={handleFromDateChange}
              className="rounded-lg px-3 py-2 mt-2 mb-4 mr-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="date"
              value={toDate}
              onChange={handleToDateChange}
              className="rounded-lg px-3 py-2 mt-2 mb-4 ml-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="rounded mt-3 bg-blue-300 px-5 py-2 text-black"
          >
            SEND REQUEST
          </button>
        </div>

        {/* Displaying the bid history */}
        <div className="mt-4">
          {historyDetails.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md text-black flex justify-evenly"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold capitalize">
                  {item.game_type}
                </h2>
                <p className="text-gray-600">{item.bidded_at}</p>
                <p className="text-red-600">Points: {item.bid_points}</p>
                <p className="text-red-600">Open Digits :{item?.open_digit}</p>
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-green-600">{item.game_name}</p>
                <p className="text-green-600">
                  Close Panna: {item.close_panna}
                </p>
                <p>
                  Session :
                  <span
                    className={`${
                      item.session === "Close"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {" "}
                    {item.session}
                  </span>
                </p>
                <p className="text-red-600">
                  close Digits :{item?.close_digit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BidHistory;
