import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import userCircle from "../images/user-circle 1.png";
import { NavBar2 } from "./NavBar2";
import { ToastContainer, toast } from "react-toastify";

interface ProfileFormData {
  username: string;
  email: string;
  mobile: string;
}

interface NavBar2Props {
  isEditProfile?: boolean;
}

export const EditProfile: React.FC<NavBar2Props> = ({ isEditProfile }) => {
  const [userData, setUserData] = useState<ProfileFormData | null>(null);
  const token = localStorage.getItem("token") || "";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>();
  const [profileImage, setProfileImage] = useState(userCircle);

  const fetchFormDetails = async () => {
    try {
      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/get_user_details",
        {
          headers: {
            token,
          },
        }
      );
      if (!response.ok) throw new Error("Network response is not okay");
      const data = await response.json();
      setUserData(data.data);
      console.log(data.data); // the data is fetched is displayed

      // Set form values
      Object.keys(data.data).forEach((key) => {
        setValue(key as keyof ProfileFormData, data.data[key]);
      });
    } catch (error) {
      console.error("There is a problem in your fetch operation", error);
    }
  };

  useEffect(() => {
    fetchFormDetails();
  }, []);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.username);
      formData.append("email", data.email);
      // Note: We're not appending the mobile number

      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/update_profile",
        {
          method: "POST",
          headers: {
            token,
          },
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Profile updated successfully");
        // Fetch updated data after successful update
        await fetchFormDetails();
        toast.success("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar2 isEditProfile={true} />
      <div className="d-flex justify-content-center mt-6 position-relative">
        <img
          src={profileImage}
          alt="Profile Image"
          className="w-24 h-24 rounded-circle mb-4"
        />
        <label htmlFor="edit-profile" className="edit-profile-icon">
          <FaEdit />
          <input
            type="file"
            id="edit-profile"
            className="d-none"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-100 text-left container"
      >
        <div className="mb-3">
          <label
            htmlFor="username"
            className="form-label text-custom font-bold"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            defaultValue={userData.username}
            {...register("username", { required: "Username is required" })}
            className={`form-control ${errors.username && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-custom font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            defaultValue={userData.email}
            className={`form-control ${errors.email && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label text-custom font-bold">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid mobile number",
              },
            })}
            readOnly
            defaultValue={userData.mobile}
            placeholder="Mobile"
            className={`form-control ${errors.mobile && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors.mobile?.message}</div>
          <ToastContainer />
        </div>
        {/* Add other form fields here */}

        <button
          type="submit"
          className="btn btn-primary custom-color w-100 mx-auto text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
