import React, { useEffect , useState} from "react";
import { FaCoins, FaMobileAlt, FaGoogle, FaPaypal } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const token = localStorage.getItem("token") || "";
  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')
  const navigate=useNavigate()

  const createPayment = async () => {
    try {
      const response = await fetch("https://smapidev.co.in/api/Api/withdraw", {
        method: "POST",
        // body: formData,
        headers: {
          token,
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3",
        },
      });
      response
        .json()
        .then((data: any) => {
          alert(data.message);
          // navigate("/login")
        })
        .catch((error: any) => {
          console.log({ error });
          alert(error);
        });
    } catch (error) {}
  };


  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          "https://development.smapidev.co.in/api/Api/app_details"
        );
        if (!response.ok) throw new Error("contact details is not fetched");
        const data = await response.json();
        // setContactDetails(data.data.contact_details);
        setOpenTime(data.data.withdraw_open_time)
        setCloseTime(data.data.withdraw_close_time)
      } catch (error) {
        console.error("there is a problem in fetching data", error);
      }
    };
    fetchContactDetails(); // fetchContactDetails calling here
  }, []);

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
        <button className="flex flex-col items-center space-y-1 border border-blue-900 text-blue-500 px-4 py-2 rounded-md pl-4">
          <FaCoins className="text-3xl" /> <span>Bank</span>
        </button>
        <button className="flex flex-col items-center space-y-1 border border-green-500 text-green-500 px-4 py-2 rounded-md pl-4">
          <FaMobileAlt className="text-3xl" /> <span>Phone Pay</span>
        </button>
        <button className="flex flex-col items-center space-y-1 border border-yellow-500 text-yellow-500 px-4 py-2 rounded-md pl-4" onClick={()=>navigate("/gpay")}>
          <FaGoogle className="text-3xl" /> <span>Google Pay</span>
        </button>
        <button className="flex flex-col items-center space-y-1 border border-indigo-500 text-indigo-500 px-4 py-2 rounded-md pl-4"> 
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
          placeholder="Enter Amount"
          className="mt-1 p-2 block w-full border border-black-800 rounded-md text-custom"
        />

        <h2 className="mt-2 text-xl text-custom">
          Minimum Withdraw Amount: 1000
        </h2>
        <h2 className="font-bold text-custom mt-4 text-xl">
          Select Payment Method
        </h2>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start">
          <button className="add-payment-method hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md mb-2 sm:mb-0 mr-2 w-full sm:w-auto">
            ADD PAYMENT METHOD
          </button>
          <button className="custom-color hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md w-full sm:w-auto ">
            SUBMIT REQUEST
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
