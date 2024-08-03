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


export const GameTime = () => {
  return (
    <div className="container px-15">
      <NavBar2 isGameTime={true} />
      <div className="flex flex-row">
        <div className="w-1/2 pr-2 mx-auto">
          <a href="/left-image-url">
            <img src={singleDigit} alt="Left Image" className="w-full" />
          </a>
        </div>
        
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <a href="/left-image-url">
            <img src={singlePanna} alt="Left Image" className="w-full" />
          </a>
        </div>
        <div className="w-1/2">
          <a href="/right-image-url">
            <img src={doublePanna} alt="Right Image" className="w-full" />
          </a>
        </div>
        
      </div>
   
      <div className="flex flex-row">
        <div className="w-1/2 mx-auto">
          <a href="/left-image-url">
            <img src={tripplePanna} alt="Left Image" className="w-full" />
          </a>
        </div>
      
      </div>
      
    </div>
  );
};

export default GameTime;
