import React, { useEffect, useState } from "react";
import { FaCoins, FaMobileAlt, FaGoogle, FaPaypal } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Define the type for a payment method
interface PaymentMethod {
  label: string;
  key: string;
  value: string;
}

const Withdraw: React.FC = () => {
  const token = localStorage.getItem("token") || "";
  const [openTime, setOpenTime] = useState<string>("");
  const [closeTime, setCloseTime] = useState<string>("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [points, setPoints] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const navigate = useNavigate();

  const fetchBankDetails = async () => {
    try {
      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/get_user_details",
        {
          headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: "ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3",
          },
        }
      );

      const data = await response.json();
      const {
        phonepe_mobile_no,
        gpay_mobile_no,
        bank_account_no,
        paytm_mobile_no,
      } = data.data;

      console.log(data.data);

      // Updated to include the key in the PaymentMethod object
      const availableMethods: PaymentMethod[] = [
        { label: "PhonePe No", key: "phonepe_mobile_no", value: phonepe_mobile_no },
        { label: "GPay No", key: "gpay_mobile_no", value: gpay_mobile_no },
        { label: "Account No", key: "bank_account_no", value: bank_account_no },
        { label: "Paytm No", key: "paytm_mobile_no", value: paytm_mobile_no },
      ].filter((method) => method.value);

      setPaymentMethods(availableMethods);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          "https://development.smapidev.co.in/api/Api/app_details"
        );
        if (!response.ok) throw new Error("contact details is not fetched");
        const data = await response.json();
        setOpenTime(data.data.withdraw_open_time);
        setCloseTime(data.data.withdraw_close_time);
        console.log(data);
      } catch (error) {
        console.error("there is a problem in fetching data", error);
      }
    };
    fetchContactDetails();
  }, []);

  const createPayment = async () => {
    const formData = new URLSearchParams();
    formData.append("points", points);
    formData.append("method", selectedPaymentMethod); // This now sends the key (e.g., "phonepe_mobile_no")

    try {
      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/withdraw",
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
      toast.success(data.message)
    } catch (error) {
      console.error("Failed to create payment:", error);
    }
  };

  return (
    <div className="px-15">
      <NavBar2 isWithdraw={true} />
      <div className="container py-1">
        <h2 className="Withdraw Open text-left mb-2 text-custom">
          Withdraw Open Time : {openTime}
        </h2>
        <h2 className="Withdraw Open text-left mb-2 text-custom">
          Withdraw Close Time : {closeTime}
        </h2>
        <h2 className=" text-left text-xl mb-2 text-custom font-bold">
          Payment Method
        </h2>
      </div>
      <div className="container flex overflow-x-auto space-x-4">
        <button
          className="flex flex-col items-center space-y-1 border border-blue-900 text-blue-500 px-4 py-2 rounded-md pl-4"
          onClick={() => navigate("/bank-details")}
        >
          <FaCoins className="text-3xl" /> <span>Bank</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 border border-green-500 text-green-500 px-4 py-2 rounded-md pl-4"
          onClick={() => navigate("/phonepe")}
        >
          <FaMobileAlt className="text-3xl" /> <span>PhonePe</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 border border-yellow-500 text-yellow-500 px-4 py-2 rounded-md pl-4"
          onClick={() => navigate("/gpay")}
        >
          <FaGoogle className="text-3xl" /> <span>Google Pay</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 border border-indigo-500 text-indigo-500 px-4 py-2 rounded-md pl-4"
          onClick={() => navigate("/paytm")}
        >
          <FaPaypal className="text-3xl" /> <span>Paytm</span>
        </button>
      </div>

      <div className="container mt-4 text-left">
        <label
          htmlFor="amount"
          className="block text-xl font-medium text-custom"
        >
          Withdraw Funds
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Enter Amount"
          className="mt-1 p-2 block w-full border border-black-800 rounded-md text-custom"
        />

        <h2 className="mt-2 text-xl text-custom">
          Minimum Withdraw Amount: 1000
        </h2>
        <h2 className="font-bold text-custom mt-4 text-xl">
          Select Payment Method
        </h2>
        <select
          className="mt-1 p-2 block w-full border border-black-800 rounded-md text-custom"
          value={selectedPaymentMethod}
          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
        >
          <option value="">Select a payment method</option>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method.key}>
              {method.label}
            </option>
          ))}
        </select>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start w-full">
          <button
            className="custom-color hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md  sm:w-auto w-full"
            onClick={createPayment}
          >
            SUBMIT REQUEST
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Withdraw;