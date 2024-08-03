import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface NavBar2Props {
  isFund?: boolean;
  isStarLine?: boolean;
  isGaliDeswar?: boolean;
  isBidHistory?: boolean;
  isWinHistory?: boolean;
  isHelp?: boolean;
  isMadhurNight?: boolean;
  isGameTime?: boolean;
  isEditProfile?: boolean;
  isWithdraw?: boolean;
  isChangePassword?: boolean;
  isDoublePanna?: boolean;
  isGameRates?: boolean;
  isContactUs?: boolean;
  isWallet?: boolean;
  isJodiPanna?: boolean;
  isFullPanna?: boolean;
  isSinglePanna?: boolean;
  isHalfPanna?: boolean;
  isTrippePanna?: boolean;
  isSingleDigit?: boolean;
  isHalfSangam?: boolean;
  isFullSangam?: boolean;
  isTripplePanna?: boolean;
}
// Define the type for each transaction in the statement
type DataType = {
  created_at: string;
  points: string;
  trans_det: string;
  trans_msg: string;
  trans_status: string;
  trans_type: string;
};

// Define the type for the main response
type ResponseType = {
  available_points: string;
  statement: DataType[]; // Defines the structure of each transaction array
  withdraw_open_time: string;
  withdraw_close_time: string;
};

export const NavBar2: React.FC<NavBar2Props> = ({
  isFund,
  isGaliDeswar,
  isStarLine,
  isBidHistory,
  isWinHistory,
  isHelp,
  isMadhurNight,
  isGameTime,
  isEditProfile,
  isWithdraw,
  isChangePassword,
  isDoublePanna,
  isGameRates,
  isContactUs,
  isWallet,
  isJodiPanna,
  isSinglePanna,
  isSingleDigit,
  isHalfPanna,
  isFullPanna,
  isTripplePanna,
  isHalfSangam,
  isFullSangam,
}) => {
  const navigate = useNavigate();

  // console.log({isDoublePanna});
  const [transcationData, setTransactionsData] = useState<ResponseType | null>(
    null
  );
  const token = localStorage.getItem("token") || "";

  const fetchTranscationData = async () => {
    const response = await fetch(
      "https://development.smapidev.co.in/api/Api/wallet_statement",
      {
        headers: {
          token,
        },
      }
    );

    const data = await response.json();
    console.log(data.data);
    setTransactionsData(data.data);
  };

  useEffect(() => {
    fetchTranscationData();
  }, []);

  return (
    <>
      {isBidHistory ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            {" "}
            Bid History
          </button>
        </div>
      ) : null}

      {isWinHistory ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            {" "}
            Win History
          </button>
        </div>
      ) : null}

      {isFund ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            {" "}
            Add Points
          </button>
        </div>
      ) : null}

      {isStarLine || isGaliDeswar ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            {" "}
            {isGaliDeswar ? "Gali Desawar" : "Star Line"}
          </button>
        </div>
      ) : null}

      {isHelp ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            {" "}
            How to Play
          </button>
        </div>
      ) : null}

      {isMadhurNight ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            {" "}
            Madhur Night
          </button>
        </div>
      ) : null}

      {isGameTime ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">03:00 PM</button>
        </div>
      ) : null}

      {isEditProfile ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            Edit Profile
          </button>
        </div>
      ) : null}

      {isWithdraw ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">Withdraw</button>
          <button className="text-right w-100 flex justify-end align-center items-center ml-2">
            {" "}
            <span className="mr-2">
              <FaWallet size={30} />{" "}
            </span>{" "}
            {transcationData?.available_points}
          </button>
        </div>
      ) : null}

      {isChangePassword ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            Change Password
          </button>
        </div>
      ) : null}

      {isDoublePanna ||
      isSinglePanna ||
      isHalfPanna ||
      isFullPanna ||
      isJodiPanna ||
      isTripplePanna ||
      isSingleDigit ||
      isFullSangam ||
      isHalfSangam ? (
        <div className="navbar-main p-3 mb-2 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            {isSinglePanna ? "Single Panna" : null}
            {isSingleDigit ? "Single Digit" : null}
            {isHalfPanna ? "Half Sangam" : null}
            {isDoublePanna ? "Double Panna" : null}
            {isFullSangam ? "Full Sangam" : null}
            {isJodiPanna ? "Jodi Panna" : null}
            {isTripplePanna ? "Tripple Panna" : null}
            {isHalfSangam ? "Half Sangam" : null}
          </button>
        </div>
      ) : null}

      {isGameRates ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            Game Rates
          </button>
        </div>
      ) : null}

      {isContactUs ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">
            ContactUs
          </button>
        </div>
      ) : null}

      {isWallet ? (
        <div className="navbar-main p-3 mb-6 text-left flex items-center text-white">
          <FaArrowLeft onClick={() => navigate(-1)} cursor="pointer" />
          <button className="ml-3 flex items-center font-bold">Wallet</button>
        </div>
      ) : null}
    </>
  );
};
