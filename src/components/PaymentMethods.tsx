import { useEffect, useState } from "react";
import { FaCoins, FaMobileAlt, FaGoogle, FaPaypal } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { useNavigate } from "react-router-dom";

// Define a type for the bank details
type BankDetails = {
  phonepe_mobile_no?: string;
  gpay_mobile_no?: string;
  paytm_mobile_no?: string;
  account_holder_name?: string;
  bank_account_no?: string;
  bank_name?: string;
  branch_address?: string;
  ifsc_code?: string;
};

const PaymentMethods: React.FC = () => {
  const token = localStorage.getItem("token") || "";

  // Use the defined type for state
  const [bankDetails, setBankDetails] = useState<BankDetails>({});
  const {
    phonepe_mobile_no,
    gpay_mobile_no,
    bank_account_no,
    paytm_mobile_no,
  } = bankDetails;

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

      console.log(data.data);
      setBankDetails(data.data); // state is set
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  return (
    <div className="px-15">
      <NavBar2 isPyamentMethod={true} />
      <div className="container flex justify-evenly">
        <button
          className="flex flex-col items-center space-y-1 border border-blue-900 text-blue-500 px-4 py-2 rounded-md pl-4 w-1/2 mr-10"
          onClick={() =>
            navigate("/bank-details", {
              state: {
                account_holder_name: bankDetails.account_holder_name,
                bank_account_no: bankDetails.bank_account_no,
                bank_name: bankDetails.bank_name,
                branch_address: bankDetails.branch_address,
                ifsc_code: bankDetails.ifsc_code,
              },
            })
          }
        >
          <FaCoins className="text-3xl" /> <span>Bank</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 border border-green-500 text-green-500 px-4 py-2 rounded-md pl-4 w-1/2"
          onClick={() => navigate("/phonepe", { state: { phonepe_mobile_no } })}
        >
          <FaMobileAlt className="text-3xl" /> <span>Phone Pay</span>
        </button>
      </div>
      <div className="container flex justify-evenly mt-10">
        <button
          className="flex flex-col items-center space-y-1 border border-yellow-500 text-yellow-500 px-4 py-2 rounded-md pl-4 w-1/2 mr-10"
          onClick={() => navigate("/gpay", { state: { gpay_mobile_no } })}
        >
          <FaGoogle className="text-3xl" /> <span>Google Pay</span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 border border-indigo-500 text-indigo-500 px-4 py-2 rounded-md pl-4 w-1/2"
          onClick={() => navigate("/paytm", { state: { paytm_mobile_no } })}
        >
          <FaPaypal className="text-3xl" /> <span>Paytm</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
