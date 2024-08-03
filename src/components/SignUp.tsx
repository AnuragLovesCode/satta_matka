import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../images/logo512.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormData {
  full_name: string;
  mobile: string;
  pin: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue // set value is imported (from react-hook form is imported from react hook form)
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new URLSearchParams();
      formData.append("full_name", data.full_name);
      formData.append("mobile", data.mobile);
      formData.append("pin", data.pin);
      formData.append("password", data.password);
      const mobileNum = data.mobile;

      const response = await fetch("https://smapidev.co.in/api/Api/signup", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3",
        },
      });
      response
        .json()
        .then((data: any) => {
          // alert(data.message)
          navigate("/VerifyOtp", { state: { mobile: mobileNum } });
        })
        .catch((error: any) => {
          console.log({ error });
          alert(error);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const gotoLoginPage = () => {
    navigate("/login");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePin = () => {
    setShowPin(!showPin);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value= e.target.value.replace(/\D/g, "");
    setValue("mobile", value)
  };
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value= e.target.value.replace(/\D/g, "");
 
  };

  return (
    <div className="container mx-auto mt-8 p-2 max-w-md rounded shadow-md text-left login-primary">
      <img src={logo} alt="Logo" className="flex mx-auto" />
      <h2 className="text-2xl font-bold mt-4 mb-4 text-white text-center">
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="full_name"
            className="block text-white text-sm font-medium mb-1"
          >
            Enter your Name
          </label>
          <input
            type="text"
            id="full_name"
            placeholder="Enter Name"
            {...register("full_name", { required: true })}
            className="w-full px-4 py-2 border rounded-5 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
          {errors.full_name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-white text-sm font-medium mb-1"
          >
            Mobile No
          </label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter Number"
            {...register("mobile", {
              required: true,
              pattern: /^[0-9]*$/,
              minLength: 10,
              maxLength: 10,
            })}
            maxLength={10}
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

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border rounded-5 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            maxLength={16}
          />
          <button
            className="hideshow absolute top-9 right-2 text-black"
            type="button"
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEye className="mr-2" /> : <FaEyeSlash />}
          </button>
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="pin"
            className="block text-white text-sm font-medium mb-1"
          >
            Enter your Pin
          </label>
          <input
            type={showPin ? "text" : "password"}
            id="pin"
            placeholder="Enter Pin"
            maxLength={4}
            {...register("pin", { required: true, pattern: /^[0-9]*$/ })}
            className="w-full px-4 py-2 border rounded-5 focus:outline-none focus:border-blue-500"
            onChange={handleChange1}
          />
          <button
            className="hideshow absolute top-9 right-2 text-black"
            type="button"
            onClick={handleTogglePin}
          >
            {showPin ? <FaEye className="mr-2" /> : <FaEyeSlash />}
          </button>
          {errors.pin && (
            <span className="text-red-500">Please enter a valid PIN</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 mb-5 text-white py-2 rounded-5 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Sign Up
        </button>

        <a href="#" className="mt-8 mb-2 text-white">
          Already have an Account?
        </a>

        <button
          type="button"
          onClick={gotoLoginPage}
          className="w-full bg-yellow-500 text-white mt-3 py-2 rounded-5 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
