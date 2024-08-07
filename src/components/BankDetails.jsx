import React from "react";
import { FaCoins } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

const BankDetails = () => {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  // Use react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const verfifyBankDetails = async (data) => {
    const formData = new URLSearchParams();
    formData.append("account_holder_name", data.holderName);
    formData.append("account_no", data.accountNumber);
    formData.append("ifsc_code", data.ifscCode);
    formData.append("bank_name", data.bankName);
    formData.append("branch_address", data.branchAddress);

    try {
      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/update_bank_details",
        {
          method: "POST",
          headers: {
            token,
          },
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log(responseData);

      toast.success(responseData.message);
      setTimeout(() => {
        navigate("/wallet");
      }, 2000);
    } catch (error) {
      console.error("ERROR", error);
      toast.error("An Error occurs during verification");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar2 isWithdraw={true} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-950">
            Bank Details
          </h2>
          <form onSubmit={handleSubmit(verfifyBankDetails)}>
            <div className="mb-4">
              <label
                htmlFor="holderName"
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
              >
                Account Holder Name
              </label>
              <div className="flex">
                <div className="flex-grow">
                  <input
                    id="holderName"
                    placeholder="Enter Account Holder Name"
                    type="text"
                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    {...register("holderName")}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="accountNumber"
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
              >
                Account Number
              </label>
              <div className="flex">
                <div className="flex-grow">
                  <input
                    id="accountNumber"
                    placeholder="Enter Account Number"
                    type="number"
                    className={`w-full px-3 py-2 placeholder-gray-400 border ${
                      errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent`}
                    {...register("accountNumber", {
                      required: "Account Number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a valid account number",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                  />
                </div>
              </div>
              {errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountNumber.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="ifscCode"
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
              >
                IFSC CODE
              </label>
              <div className="flex">
                <div className="flex-grow">
                  <input
                    id="ifscCode"
                    placeholder="Enter IFSC Code"
                    type="text"
                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    {...register("ifscCode")}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="bankName"
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
              >
                Bank Name
              </label>
              <div className="flex">
                <div className="flex-grow">
                  <input
                    id="bankName"
                    placeholder="Enter Bank Name"
                    type="text"
                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    {...register("bankName")}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="branchAddress"
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
              >
                Branch Address
              </label>
              <div className="flex">
                <div className="flex-grow">
                  <input
                    id="branchAddress"
                    placeholder="Enter Branch Address"
                    type="text"
                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    {...register("branchAddress")}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50 transition duration-200 ease-in-out flex items-center justify-center"
              >
                <FaCoins className="mr-2" />
                Verify with Bank
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
