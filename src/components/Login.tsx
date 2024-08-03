import React from "react";
import { useForm } from "react-hook-form";
import logo from "../images/logo512.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

interface FormData {
  mobile: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, //this is imported from react hook form
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new URLSearchParams();
      formData.append("mobile", data.mobile);
      formData.append("password", data.password);

      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: "ci_session=d2a8bfc834befa449f25ec1a4d1e4de08c515354",
          },
          body: formData,
        }
      );
      response
        .json()
        .then((data: any) => {
          localStorage.setItem("token", data?.data?.token);
          if (data?.data?.token) {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                token: data?.data?.token,
              },
            });
            toast.success("login successfully");
            localStorage.setItem("mobile", formData.get("mobile") || "");
            localStorage.setItem("password", formData.get("password") || "");

            // Log mobile and password to the console
            console.log("Mobile:", formData.get("mobile"));
            console.log("Password:", formData.get("password"));
            setTimeout(() => {
              navigate("/security_pin");
            }, 1000);
          } else toast.error(data?.message);
        })
        .catch((error: any) => {
          // alert(error);
          toast.error("An error occured");
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const goToSignUpPage = () => {
    navigate("/signup");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // set value is imported from react hook form and then that value is changed
    setValue("mobile", value); //the value
  };

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s/g, ""); // set value is imported from react hook form and then that value is changed
    // setValue("mobile", value); //the value
  };

  return (
    <div className="container mx-auto p-2 max-w-md shadow-md login-primary text-white">
      <ToastContainer />
      <img src={logo} alt="Logo" className="flex mx-auto" />
      <h2 className="text-2xl font-bold mb-2 mt-4">Welcome Back!</h2>
      <form className="text-left" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter Number"
            {...register("mobile", {
              required: true,
              minLength: 10,
              maxLength: 10,
              pattern: /^[0-9]*$/,
            })}
            maxLength={10}
            className="w-full px-4 py-2 border rounded-5 focus:outline-none 
            focus:border-blue-500 text-black"
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
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            minLength={4}
            maxLength={16}
            placeholder="Enter Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border rounded-5 focus:outline-none focus:border-blue-500 text-black"
            onChange={handleChange1}
          />
          <button
            className="hideshow absolute top-9 right-2 text-black"
            type="button"
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEye className="mr-2" /> : <FaEyeSlash />}
          </button>
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>
        <Link
          to="/forgotpassword"
          className="mt-4 mb-2 text-white-700 flex justify-end text-sm"
        >
          Forgot Password.
        </Link>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-300 text-black py-2 mb-2 rounded-5 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Login
        </button>

        <a
          href="#"
          className="mt-1 mb-2 text-white-700 flex justify-center text-sm"
        >
          Don't have an account?
        </a>

        <button
          type="button"
          className="w-full bg-yellow-500 text-black mt-2 py-2 rounded-5 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={goToSignUpPage}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
