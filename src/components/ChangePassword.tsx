import React, { useState } from "react";
import { FaArrowLeft, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { NavBar2 } from "./NavBar2";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CHANGE_PASSWORD_URL =
  "https://development.smapidev.co.in/api/Api/forgot_password_verify";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NavBar2Props {
  isChangePassword?: boolean;
}

const ChangePassword: React.FC<NavBar2Props> = ({ isChangePassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<ChangePasswordFormData>();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const storedPassword = localStorage.getItem("password");
  const mobile = localStorage.getItem("mobile");
  const token = localStorage.getItem("token") || "";

  const navigate = useNavigate();

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (data.currentPassword !== storedPassword) {
      setError("currentPassword", {
        type: "manual",
        message: "Current password is incorrect",
      });
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("mobile", mobile || "");
      formData.append("password", data.newPassword);

      const response = await fetch(CHANGE_PASSWORD_URL, {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/x-www-form-urlencoded",
        },

        body: formData,
      });

      response
        .json()
        .then((data: any) => {
          if (data?.code == "100") {
            toast.success("Password changed successfully");
            console.log("data",data.message)
            localStorage.removeItem("password")
            localStorage.setItem("password", formData.get("password") || "");
            navigate("/");
          }
        })
        .catch((error: any) => {
          console.log({ error });
          toast.error("something went wrong");
        });

      // if (response.ok) {
      //   console.log("Password changed successfully");
      //   localStorage.setItem("password", data.newPassword);
      //   navigate("/login");
      // } else {
      //   console.error("Failed to change password");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTogglePasswordVisibility = (field: string) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s/g, "");
    if (e.target.id === "confirmPassword") {
      if (e.target.value === watch("newPassword")) {
        clearErrors("confirmPassword");
      }
    }
  };

  return (
    <div>
      <NavBar2 isChangePassword={true} />
      <div className="container mx-auto p-4 max-w-md rounded-5 shadow-md login-primary text-white">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 relative">
            <label
              htmlFor="currentPassword"
              className="block text-left text-sm font-medium mb-1"
            >
              Current Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                {...register("currentPassword", {
                  required: "Current Password is required",
                })}
                className="form-control"
                onChange={handleChange}
              />
              <button
                className="show-hide absolute top-3 right-2 text-black"
                type="button"
                onClick={() => handleTogglePasswordVisibility("current")}
                style={{ zIndex: 99 }}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <span className="text-sm text-red-500">
                {errors.currentPassword.message}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="newPassword"
              className="block text-left text-sm font-medium mb-1"
            >
              New Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                {...register("newPassword", {
                  required: "New Password is required",
                })}
                className="form-control"
                onChange={handleChange}
              />
              <button
                className="show-hide absolute top-3 right-2 text-black"
                type="button"
                onClick={() => handleTogglePasswordVisibility("new")}
                style={{ zIndex: 99 }}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-left text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                className="form-control"
                onChange={handleChange}
              />
              <button
                className="show-hide absolute top-3 right-2 text-black"
                type="button"
                onClick={() => handleTogglePasswordVisibility("confirm")}
                style={{ zIndex: 99 }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-800 text-white py-2 rounded-5 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Submit Request
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ChangePassword;
