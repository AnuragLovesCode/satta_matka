import React, { useEffect } from "react";
import logo from "../images/logo512.png";
import { FaArrowLeft } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { toast, ToastContainer } from "react-toastify";

interface NavBar2Props {
  isFund?: boolean;
  isBidHistory?: boolean;
  isWinHistory?: boolean;
  isHelp?: boolean;
}

export const Help: React.FC<NavBar2Props> = ({
  isFund,
  isBidHistory,
  isWinHistory,
  isHelp,
}) => {
  const token = localStorage.getItem("token") || "";

  const howToPlay = async () => {
    try {
      const response = await fetch(
        "https://smapidev.co.in/api/Api/how_to_play",
        {
          method: "POST",
          headers: {
            token: token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Cookie': 'ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3'
          },
        }
      );
      response
        .json()
        .then((data: any) => {
          // alert(data.message)
          // navigate("/login")
          if (data.data.video_link === "") toast.error("Its Not Available");
        })
        .catch((error: any) => {
          console.log({ error });
          alert(error);
        });
    } catch (error) {
      console.log({ error });
      toast.error("link is not available");
    }
  };

  return (
    <div>
      <NavBar2 isHelp={true} />
      <img src={logo} alt="Logo" className="flex mx-auto" />
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 mt-4">
        <div className="px-4 py-2">
          <a
            href="#"
            className="text-sm leading-normal flex text-custom font-bold"
          >
            1.Download App
          </a>
          <a
            href="#"
            className="text-sm leading-normal flex text-custom font-bold"
          >
            2.Click on the Signin
          </a>
          <a
            href="#"
            className="text-sm leading-normal flex text-custom font-bold"
          >
            3.Enter user id and Password
          </a>
          <a
            href="#"
            className="text-sm leading-normal flex text-custom font-bold"
          >
            4.Select Game and Play the Game
          </a>
        </div>
      </div>
      <div className="px-4 py-2">
        <ToastContainer />
        <button
          className="custom-blue-1 mt-3 w-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
          onClick={howToPlay}
        >
          HOW TO PLAY
        </button>
      </div>
    </div>
  );
};
