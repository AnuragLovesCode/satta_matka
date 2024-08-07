import React, { useState } from "react";
import logo from "../images/logo512.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

interface FormData {
  mobile: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const mobileNum = data.mobile;
      const formData = new URLSearchParams();
      formData.append("mobile", data.mobile);

      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/forgot_password",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: "ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3",
          },
        }
      );
      response
        .json()
        .then((data: any) => {
          toast.success(data?.message);
          navigate("/VerifyOtp", { state: { mobile: mobileNum } });
        })
        .catch((error: any) => {
          console.log({ error });
          toast.error(error);
        });
    } catch (error) {
      console.error("Error during otp send:", error);
      toast.error("Error during Otp send:");
    }
  };

  const gotoLoginPage = () => {
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s/g, "");
  };

  return (
    <div className="container mx-auto mt-8 p-4 max-w-md rounded shadow-md text-left login-primary">
      <ToastContainer />

      <img src={logo} alt="Logo" className="flex mx-auto" />
      <h2 className="text-2xl font-bold mt-4 mb-4 text-white">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-white text-sm font-medium mb-1"
          >
            Mobile No
          </label>
          <input
            type="number"
            id="mobile"
            {...register("mobile", {
              required: true,
              pattern: /^[0-9]*$/,
              minLength: 10,
              maxLength: 10,
            })}
            className="w-full px-4 py-2 border rounded-5 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
          {errors.mobile && errors.mobile.type === "required" && (
            <span className="text-red-500">Mobile number is required</span>
          )}
          {errors.mobile && errors.mobile.type === "minLength" && (
            <span className="text-red-500">
              Mobile number must be exactly 10 digits
            </span>
          )}
          {errors.mobile && errors.mobile.type === "maxLength" && (
            <span className="text-red-500">
              Mobile number must be exactly 10 digits
            </span>
          )}
          {errors.mobile && errors.mobile.type === "pattern" && (
            <span className="text-red-500">Mobile number must be valid</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-300 mb-5 text-black py-2 rounded-5 hover:bg-blue-400 focus:outline-none focus:shadow-outline-blue"
        >
          Submit Request
        </button>

        <a href="#" className="mt-8 mb-2 text-white">
          Already have an Account?
        </a>

        <button
          type="button"
          onClick={gotoLoginPage}
          className="w-full bg-yellow-500 text-black mt-3 py-2 rounded-5 hover:bg-blue-300 focus:outline-none focus:shadow-outline-blue"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
