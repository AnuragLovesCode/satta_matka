import { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const PayTmDetails = () => {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  
  // Use react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const verfifyPayTMDetails = async (data) => {
    const formData = new URLSearchParams();
    formData.append("paytm", data.phoneNumber);

    try {
      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/update_paytm",
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
        navigate('/wallet')
      }, 2000);
    } catch (error) {
      console.error("ERROR", error);
      toast.error("An Error occurs during verification");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setValue('phoneNumber', value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar2 isPaytm={true} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-950">
            PayTM Details
          </h2>
          <form onSubmit={handleSubmit(verfifyPayTMDetails)}>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
              >
                Phone Number
              </label>
              <div className="flex">
                <div className="flex-grow">
                  <input
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    type="tel"
                    inputMode="numeric"
                    className={`w-full px-3 py-2 placeholder-gray-400 border ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent`}
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number"
                      },
                      onChange: handlePhoneNumberChange
                    })}
                    maxLength={10}
                  />
                </div>
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50 transition duration-200 ease-in-out flex items-center justify-center"
              >
                <FaPaypal className="mr-2" />
                Verify with PayTm
              </button>
            </div>
          </form>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default PayTmDetails;
