import React from "react";
import singleDigit from "../images/single-digit (1).svg";
import jodiDigit from "../images/jodi-digit.svg";
import singlePanna from "../images/single-panna.svg";
import doublePanna from "../images/double-panna.svg";
import tripplePanna from "../images/tripple-panna.svg";
import halfSangam from "../images/half-sangam.svg";
import fullSangam from "../images/full-sangam.svg"; // Import the image
import { FaArrowLeft } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavBar2Props {
  isFund?: boolean;
  isBidHistory?: boolean;
  isWinHistory?: boolean;
  isHelp?: boolean;
  isMadhurNight?: boolean;
}

export const MadhurNight: React.FC<NavBar2Props> = ({
  isFund,
  isBidHistory,
  isWinHistory,
  isHelp,
  isMadhurNight
}) => {
  const location = useLocation();
  const navigate = useNavigate()


  return (
    <div className="px-15 bg-white">
      <NavBar2 isMadhurNight={true} />
     <div className=" flex flex-row px-15 justify-center">
        <div className="w-1/2 pr-2">
          <button onClick={() => { navigate("/Singledigit", { state: { isSingleDigit: true, id: location?.state?.id } }) }}>
            <img src={singleDigit} alt="Left Image" className="w-full" />
          </button>
        </div>
        {
          location?.state?.open ? (
            <div className="w-1/2 pl-2">
              <button onClick={() => {
                navigate("/JodiDigit", { state: { isJodiPanna: true, id: location?.state?.id } })
              }}>
                <img src={jodiDigit} alt="Right Image" className="w-full" />
              </button>
            </div>
          ) : null
        }

      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <button onClick={() => { navigate("/Singlepanna", { state: { isSinglePanna: true, id: location?.state?.id } }) }}>
            <img src={singlePanna} alt="Left Image" className="w-full" />
          </button>
        </div>
        <div className="w-1/2">
          <button onClick={() => { navigate("/Doublepanna", { state: { isDoubleDigit: true, id: location?.state?.id } }) }} >
            <img src={doublePanna} alt="Right Image" className="w-full" />
          </button>
        </div>

      </div>
      <div className="flex flex-row justify-center">
        <div className="w-1/2">
          <button onClick={() => { navigate("/TripplePanna", { state: { isTripplePanna: true, id: location?.state?.id } }) }} >
            <img src={tripplePanna} alt="Left Image" className="w-full" />
          </button>
        </div>
        {
          location?.state?.open ? (
            <div className="w-1/2">
              <button onClick={() => { navigate("/halfSangam", { state: { isHalfSangam: true, id: location?.state?.id } }) }} >
                <img src={halfSangam} alt="Right Image" className="w-full" />
              </button>
            </div>
          ) : null}

      </div>
      {
        location?.state?.open ? (
          <div className="flex flex-row">
            <div className="w-1/2 mx-auto">
              <button onClick={() => { navigate("/FullSangam", { state: { isFullSangam: true, id: location?.state?.id } }) }} >
                <img src={fullSangam} alt="Left Image" className="w-full" />
              </button>
            </div>

          </div>
        ) : null}

    </div>
  );
};

export default MadhurNight;
