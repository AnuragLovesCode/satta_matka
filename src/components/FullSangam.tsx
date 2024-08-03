import React, { useState } from "react";
import { FaEdit, FaRupeeSign } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { NavBar2 } from "./NavBar2";
import { MyDatePicker } from "./MyDatePicker";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface Bid {
  game_id?: number;
  game_type?: string;
  open_panna: string;
  close_panna: string;
  bid_points: string;
  session: string;
}

const HafSangam: React.FC<any> = () => {
  const CLOSING_PANNA = [120, 123, 124, /* Add your remaining values here */];

  const location = useLocation();
  const token = localStorage.getItem("token") || "";

  const [bids, setBids] = useState<Bid[]>([]);
  const [suggestedPannas, setSuggestedPannas] = useState<number[]>([]);
  const { register, handleSubmit, formState: { errors }, reset,setValue } = useForm<Bid>();

  const onSubmit = (data: Bid) => {
    const defaultValues: Partial<Bid> = {
      game_id: location?.state?.id,
      game_type: "full_sangam"
    };

    const bidData = { ...defaultValues, ...data };

    setBids([...bids, bidData]);
    reset();
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  const submitBid = async () => {
    const formData = new URLSearchParams();
    formData.append("game_bids", JSON.stringify({ bids }));

    const response = await fetch("https://smapidev.co.in/api/Api/place_bid", {
      method: "POST",
      body: formData,
      headers: {
        token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3'
      },
    });
    response.json().then((data: any) => {
      setBids([]);
      toast.error(data.message)
    }).catch((error: any) => {
      toast.error(error)
    });
  };

  // Custom validation function to check if open panna exists
  const validateOpenPanna = (value: string) => {
    const isValid = CLOSING_PANNA.includes(parseInt(value));
    return isValid || "Enter valid panna.";
  };

  // Function to suggest pannas based on user input
  const suggestPannas = (inputValue: string) => {
    const filteredPannas = CLOSING_PANNA.filter(panna => panna.toString().startsWith(inputValue));
    setSuggestedPannas(filteredPannas);
  };

  // Function to set the open panna value when a suggestion is selected
  const setOpenPanna = (panna: number) => {
    setValue("open_panna" , panna.toString())
    setSuggestedPannas([]);
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <ToastContainer />
      <NavBar2 isFullSangam={location?.state?.isFullSangam} />
      <div className="container shadow-md w-100 bg-white p-3 rounded-md text-left">
        <div className="flex">
          <MyDatePicker />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container text-left">
            <h2 className="choose_session font-bold mb-4">Choose Session</h2>
            <div className="open flex justify-between">
            <label>
                <input  defaultChecked={true} type="radio" {...register("session", { required: true })} value="open" /> Open
              </label>
              <label>
                <input type="radio" {...register("session", { required: true })} value="close" /> Close
              </label>
            </div>
            {errors.session && <span className="text-red-500">Please select a session</span>}
          </div>
          <div className="panna-new text-left mt-4">
            <label htmlFor="digit">Open Digit</label>
            <div className="input-group">
              <span className="input-group-text"><FaEdit /></span>
              <input
                type="text"
                className="form-control"
                {...register("open_panna", { required: true, validate: validateOpenPanna })}
                maxLength={3}
                placeholder="Enter Open Digit"
                onChange={(e) => suggestPannas(e.target.value)} // Call suggestPannas on input change
              />
            </div>
            {errors.open_panna && <span className="text-red-500">{errors.open_panna.message}</span>}
            {suggestedPannas.length > 0 && (
              <ul>
                {suggestedPannas.map((panna, index) => (
                  <li className="cursor-pointer" key={index} onClick={() => setOpenPanna(panna)}>{panna}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="panna-new text-left mt-4">
            <label htmlFor="digit">Close Panna</label>
            <div className="input-group">
              <span className="input-group-text"><FaEdit /></span>
              <input
                type="text"
                className="form-control"
                {...register("close_panna", { required: true, validate: validateOpenPanna })}
                maxLength={3}
                placeholder="Enter Close Panna"
              // onChange={(e) => suggestPannas(e.target.value)} // Call suggestPannas on input change
              />
            </div>
            {errors.close_panna && <span className="text-red-500">{errors.close_panna.message}</span>}
          </div>
          <div className="panna-new text-left mt-4">
            <label htmlFor="points">Points</label>
            <div className="input-group">
              <span className="input-group-text"><FaRupeeSign /></span>
              <input type="text" className="form-control" {...register("bid_points", { required: true, pattern: /^[0-9]+$/ })} placeholder="Enter Points" />
            </div>
            {errors.bid_points && <span className="text-red-500">Please enter valid points</span>}
          </div>
          <div className="Proceed mt-6">
            <button type="submit" className="btn-proceed bg-blue-800 w-100 text-white py-2 px-4 rounded-lg">Add Bid</button>
          </div>
        </form>

        {/* Display bids in a table */}
        <div className="mt-6">
          <h2 className="font-bold mb-4">Bids</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Session</th>
                <th>Open Digit</th>
                <th>Close Digit</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={index}>
                  <td>{bid.session}</td>
                  <td>{bid.open_panna}</td>
                  <td>{bid.close_panna}</td>
                  <td>{bid.bid_points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button className="btn-submit bg-blue-800 text-white py-2 px-4 rounded-lg" onClick={submitBid}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default HafSangam;
