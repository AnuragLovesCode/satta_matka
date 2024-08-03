import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";

interface NavBar2Props {
  isFund?: boolean;
  isBidHistory?: boolean;
  isWinHistory?: boolean;
}

const ADD_FUND_URL = "https://development.smapidev.co.in/api/Api/add_fund";
const token = localStorage.getItem("token") || "";

export const Funds: React.FC<NavBar2Props> = ({
  isFund,
  isBidHistory,
  isWinHistory,
}) => {
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({ text: "", type: "" });

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handlePointSelection = (points: number) => {
    setSelectedPoints(points);
    const inputElement = document.getElementById(
      "pointsInput"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = points.toString();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoints) {
      setMessage({ text: "Please select a point amount.", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    const randomId = generateRandomId();

    // Create FormData object
    const formData = new FormData();
    formData.append("points", selectedPoints.toString());
    formData.append("trans_status", "successful");
    formData.append("trans_id", randomId);

    try {
      const response = await fetch(ADD_FUND_URL, {
        method: "POST",
        headers: {
          token,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Fund addition successful:", data);
      console.log(data?.code);
      setMessage({ text: "Funds added successfully!", type: "success" });
    } catch (error) {
      console.error("Error adding funds:", error);
      setMessage({
        text: "Error adding funds. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar2 isFund={true} />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            id="pointsInput"
            className="form-control p-4"
            placeholder="Add Points"
            name="myInput"
            readOnly
            value={selectedPoints || ""}
          />
          <h2 className="text-custom text-left mt-4">Select Point Amount</h2>
          <ul className="flex ml-3 pb-3">
            {[500, 1000, 2000].map((point) => (
              <li key={point}>
                <button
                  type="button"
                  onClick={() => handlePointSelection(point)}
                  className={`btn-funds rounded-full py-2 px-4 text-white text-left flex justify-left mt-4 ${
                    point !== 500 ? "ml-3" : ""
                  } ${
                    selectedPoints === point ? "bg-yellow-500" : "bg-blue-900"
                  }`}
                >
                  {point}
                </button>
              </li>
            ))}
          </ul>
          <ul className="flex ml-3 pb-3">
            {[5000, 10000].map((point) => (
              <li key={point}>
                <button
                  type="button"
                  onClick={() => handlePointSelection(point)}
                  className={`btn-funds rounded-full py-2 px-4 text-white text-left flex justify-left mt-2 ${
                    point !== 5000 ? "ml-3" : ""
                  } ${
                    selectedPoints === point ? "bg-yellow-500" : "bg-blue-900"
                  }`}
                >
                  {point}
                </button>
              </li>
            ))}
          </ul>
          <ul className="ml-3 pb-3 text-left">
            <li className="mt-2 text-custom">
              <input type="radio" name="paymentMethod" value="googlePay" />{" "}
              Google Pay
            </li>
            <li className="mt-2 text-custom">
              <input type="radio" name="paymentMethod" value="phonePe" /> Phone
              Pe
            </li>
            <li className="mt-2 text-custom">
              <input type="radio" name="paymentMethod" value="paytm" /> Paytm
            </li>
            <li>
              <button
                type="submit"
                className="btn-funds rounded-lg custom-color py-2 px-4 text-white  flex justify-center mt-4 ml-3 mx-auto w-100 text-center"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Submit Request"}
              </button>
            </li>
          </ul>
        </form>
        {message.text && (
          <div
            className={`mt-4 p-2 ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};
