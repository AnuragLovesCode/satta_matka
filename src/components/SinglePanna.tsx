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
  bid_points: string;
  session: string;
}

const SinglePanna: React.FC<any> = () => {
  const SINGLE_PANNA = [120, 123, 124, 125, 126, 127, 128, 129, 130, 134, 135, 136, 137, 138, 139, 140, 145, 146, 147, 148, 149, 150, 156, 157, 158, 159, 160, 167, 168, 169, 170, 178, 179, 180, 189, 190, 230, 234, 235, 236, 237, 238, 239, 240, 245, 246, 247, 248, 249, 250, 256, 257, 258, 259, 260, 267, 268, 269, 270, 278, 279, 280, 289, 290, 340, 345, 346, 347, 348, 349, 350, 356, 357, 358, 359, 360, 367, 368, 369, 370, 378, 379, 380, 389, 390, 450, 456, 457, 458, 459, 460, 467, 468, 469, 470, 478, 479, 480, 489, 490, 560, 567, 568, 569, 570, 578, 579, 580, 589, 590, 670, 678, 679, 680, 689, 690, 780, 789, 790, 890];

  const location = useLocation();
  const token = localStorage.getItem("token") || "";

  const [bids, setBids] = useState<Bid[]>([]);
  const [suggestedPannas, setSuggestedPannas] = useState<number[]>([]);
  const { register, handleSubmit, formState: { errors }, reset, getValues , setValue } = useForm<Bid>();

  const onSubmit = (data: Bid) => {
    const defaultValues: Partial<Bid> = {
      game_id: location?.state?.id,
      game_type: "single_panna"
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
    const isValid = SINGLE_PANNA.includes(parseInt(value));
    return isValid || "Enter valid panna.";
  };

  // Function to suggest pannas based on user input
  const suggestPannas = (inputValue: string) => {
    const filteredPannas = SINGLE_PANNA.filter(panna => panna.toString().startsWith(inputValue));
    setSuggestedPannas(filteredPannas);
  };

  // Function to set the open panna value when a suggestion is selected
  const setOpenPanna = (panna: number, currentSession: string) => {
    setValue("open_panna" , panna.toString())
    // reset({ ...getValues(), session: currentSession, open_panna: panna.toString() });
    // reset({ open_panna: panna.toString() });
    setSuggestedPannas([]);
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <ToastContainer />
      <NavBar2 isSinglePanna={location?.state?.isSinglePanna} />
      <div className="container shadow-md w-100 bg-white p-3 rounded-md text-left">
        <div className="flex">
          <MyDatePicker />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container text-left">
            <h2 className="choose_session font-bold mb-4">Choose Session</h2>
            <div className="open flex justify-between">
              <label>
                <input type="radio" defaultChecked={true} {...register("session", { required: true })} value="open" /> Open
              </label>
              <label>
                <input type="radio" {...register("session", { required: true })} value="close" /> Close
              </label>
            </div>
            {errors.session && <span className="text-red-500">Please select a session</span>}
          </div>
          <div className="panna-new text-left mt-4">
            <label htmlFor="digit">Panna</label>
            <div className="input-group">
              <span className="input-group-text"><FaEdit /></span>
              <input
                type="text"
                className="form-control"
                {...register("open_panna", { required: true, validate: validateOpenPanna })}
                maxLength={3}
                placeholder="Enter Digit"
                onChange={(e) => suggestPannas(e.target.value)} // Call suggestPannas on input change
              />
            </div>
            {errors.open_panna && <span className="text-red-500">{errors.open_panna.message}</span>}
            {suggestedPannas.length > 0 && (
              <ul>
                {suggestedPannas.map((panna, index) => (
                  <li className="cursor-pointer" key={index} onClick={() => setOpenPanna(panna, getValues().session)}>{panna}</li>
                ))}
              </ul>
            )}
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
                <th>Digit</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={index}>
                  <td>{bid.session}</td>
                  <td>{bid.open_panna}</td>
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

export default SinglePanna;
