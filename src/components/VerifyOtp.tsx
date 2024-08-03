import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaKey, FaLock, FaMobileAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import logo from "../images/logo512.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const VerifyOtp = () => {
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  // const [otp, setOtp] = React.useState('');
  const [showOtp, setShowOtp] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate()

  const { mobile }: any = location.state;

  const handleVerifyOtp = async (data: any) => {
    try {
      const formData = new URLSearchParams();
      formData.append("mobile", mobile);
      formData.append("otp", data.otp);


      const response = await fetch("https://smapidev.co.in/api/Api/verify_otp", {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3'
        },
      });
      response.json().then((data: any) => {
        if(data.code==="100"){
          navigate("/login" )

        }
        else{
          toast.error(data?.message)

        }
      }).catch((error: any) => {
        toast.error(error)
      })
    } catch (error) {
      toast.error("Error during Otp send:")

    }
  };

  const handleResendOtp = async () => {
    try {
      const mobileNum = mobile;
      const formData = new URLSearchParams();
      formData.append("mobile", mobileNum);

      const response = await fetch("https://smapidev.co.in/api/Api/resend_otp", {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3'
        },
      });
      response.json().then((data: any) => {
        toast.success(data?.message)
      }).catch((error: any) => {
        toast.error(error)
      })
    } catch (error) {
      console.error("Error during otp send:", error);
      toast.error("Error during Otp send:")

    }
  };

  const handleToggleOtpVisibility = (typeOfInput: string) => {
    if (typeOfInput === "otp")
      setShowOtp(!showOtp);
    else
      setShowPassword(!showPassword)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s/g, '');
  };


  return (
    <div className="container mx-auto p-4 max-w-md rounded-5 shadow-md login-primary text-white">
      <ToastContainer />
      <img src={logo} alt="Logo" className="flex mx-auto mb-4" />

      {/* Mobile number input */}
      <div className="mb-4 relative">
        <label htmlFor="mobile" className="block text-left text-sm font-medium mb-1">
          <FaMobileAlt className="absolute top-9 left-3 text-black" />
          Mobile Number
        </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          defaultValue={mobile}
          disabled
          className="w-full bg-white pl-30 px-4 py-2 border rounded-5 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>

      {/* OTP input */}
      <div className="mb-4 relative">
        <label htmlFor="otp" className="text-left block text-sm font-medium mb-1">
          <FaKey className="absolute top-9 left-3 text-black" />
          OTP
        </label>
        <input
          type={showOtp ? 'text' : 'password'}
          id="otp"
          required
          {...register("otp", { required: true })}
          className="w-full px-4 py-2 pl-30 border rounded-5 focus:outline-none focus:border-blue-500 text-black"
          onChange={handleChange}
        />
        <button className="hideshow absolute top-9 right-2 text-black" type="button" onClick={() => handleToggleOtpVisibility("otp")}>
          {showOtp ? <FaEyeSlash /> : <FaEye />}
        </button>
        {errors.otp && <span className="text-red-500">OTP is required</span>}
      </div>
      <div className="mb-4 relative">
        <label htmlFor="otp" className="text-left block text-sm font-medium mb-1">
          <FaLock className="absolute top-9 left-3 text-black" />
          Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          required
          {...register("password" , {required:true})}
          className="w-full px-4 py-2 pl-30 border rounded-5 focus:outline-none focus:border-blue-500 text-black"
          onChange={handleChange}
        />
        <button className="hideshow absolute top-9 right-2 text-black" type="button" onClick={() => handleToggleOtpVisibility("password")}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        {errors.password && <span className="text-red-500">Password is required</span>}

      </div>

      <button
        type="button"
        onClick={handleResendOtp}
        className="text-white text-right mt-2 text-sm underline"
      >
        Resend OTP
      </button>

      {/* Verify OTP button */}
      <button
        type="button"
        onClick={handleSubmit(handleVerifyOtp)}
        className="w-full mt-4 bg-blue-300 text-black py-2 mb-2 rounded-5 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyOtp;
