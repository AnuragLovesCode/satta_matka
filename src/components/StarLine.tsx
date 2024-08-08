import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavBar2 } from "./NavBar2";
import { Button } from "@mui/material";

const StarLine: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log({l:location?.state});
  

  const [mainGameList, setMainGameList] = useState([]);
  const [startLineRates, setStarLineRates] = useState([]);

  const token = localStorage.getItem("token") || '';

  useEffect(() => {
    gameList()
  }, [])


  const gameList = async () => {
    try {

      let url = "https://development.smapidev.co.in/api/Api/gali_disawar_game"
      if (location?.state?.startLine) {
        url = "https://development.smapidev.co.in/api/Api/starline_game"
      }

      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            token

          },
        });

      response.json().then((result: any) => {
        if (result.code == 100) {
          setMainGameList(location?.state?.startLine ? result?.data?.starline_game : result?.data?.gali_disawar_game);
          setStarLineRates(location?.state?.startLine ? result?.data?.starline_rates : result?.data?.gali_disawar_rates);
        }

      }).catch((error: any) => {
        alert(error)
      })

    } catch (error) {
      alert("ERROR IN GAME LIST" + error)
    }
  }


  console.log({mainGameList });
  


  return (
    <>
      <NavBar2 isStarLine={location?.state?.startLine ? true : false} isGaliDeswar={!location?.state?.startLine ? true : false} />
      <div className="container mx-auto p-4 max-w-md rounded-sm shadow-md login-primary text-white mt-4 rounded">

        <h1 className="text-lg font-bold">Star Line Games</h1>
        {
          startLineRates.length > 0 ? (
            <>
              {
                startLineRates.map((rate: any) => (
                  <div className="flex justify-content-between mb-3">
                    <p>{rate.name.split('_').map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                    <p>{rate.cost_amount} - {rate.earning_amount}</p>
                  </div>
                ))
              }
            </>
          ) : (
            <>No data</>
          )
        }


      </div>
      <div className="mt-6">
        <button
          className="mr-2 px-4 py-2 login-primary text-white rounded"
          onClick={() => {
            navigate("/bidhistory", { state: { starLine: true } })
          }}
        >
          BID HISTORY
        </button>
        <button
          className="mr-2 px-4 py-2 login-primary text-white rounded"
          onClick={() => {
            navigate("/winhistory", { state: { starLine: true } })
          }}        >
          WIN HISTORY
        </button>
      </div>
      <div className="max-w-md mx-auto rounded-xl overflow-hidden satta-matka-home mt-4">
        <div className="satta-matka">
          <div className="md:flex-shrink-0"></div>
          <div className="card-bg">
            <div className="card-new p-2">
              <div className="uppercase heading-block text-custom tracking-wide text-xl font-bold">
                DESAWAR
              </div>
              <div className="align-items-center justify-around">
                <a
                  href="#"
                  className="block mt-1 text-lg leading-tight font-medium text-custom hover:underline"
                >
                  * *
                </a>
                <p className="mt-1 text-custom border-top-0 flex justify-end !important items-center">
                05:30 PM

                <div className="flex">
                  {" "}
                  <a className="btn-card-closed rounded-5" href="#">
                    Closed
                  </a>
                  <span className="text-red-500 flex items-center ml-3">
                    Closed
                  </span>
                </div>
              </p>
              
              </div>
             
            </div>

            <div className="card-new p-2">
              <div className="uppercase heading-block tracking-wide text-xl font-bold text-custom">
                FARIDABAD
              </div>
              <div className="align-items-center justify-around">
                <a
                  href="#"
                  className="block mt-1 text-custom leading-tight font-medium text-gray-500 hover:underline"
                >
                  * *
                </a>

                <p className="mt-1 text-custom flex border-top-0 justify-end !important items-center">
                06:30 PM
                <div className="flex">
                  {" "}
                  <a className="btn-card rounded-5" href="#">
                    Play Now
                  </a>

                  <span className="text-green-500 flex items-center ml-3">
                    Running
                  </span>
                </div>
              </p>
             
              </div>

            </div>

            <div className="card-new p-2">
              <div className="uppercase text-custom heading-block tracking-wide text-xl font-bold">
                GAZIABAD
              </div>
              <div className="align-items-center justify-around">
                <a
                  href="#"
                  className="block mt-1 text-lg leading-tight font-medium text-custom hover:underline"
                >
                  * *
                </a>
                <p className="mt-1 text-custom flex border-top-0 justify-end !important items-center">
                06:30 PM

                <div className="flex">
                  {" "}
                  <a className="btn-card rounded-5" href="#">
                    Play Now
                  </a>

                  <span className="text-green-500 flex items-center ml-3">
                    Running
                  </span>
                </div>
              </p>
             
              </div>

            
            </div>
            <div className="card-new p-2">
              <div className="uppercase text-custom heading-block tracking-wide text-xl font-bold">
                GALI
              </div>
              <div className="align-items-center justify-around">
                <a
                  href="#"
                  className="block mt-1 text-lg leading-tight font-medium text-custom hover:underline"
                >
                  * *
                </a>

                <p className="mt-1 flex text-black border-top-0 justify-end !important items-center">
                11:30 PM
                <div className="flex">
                  {" "}
                  <a className="btn-card rounded-5" href="#">
                    Play Now
                  </a>

                  <span className="text-green-500 flex items-center ml-3">
                    Running
                  </span>
                </div>
              </p>
              
              </div>

            </div>




          </div>
        </div>

      </div>
      <a className="mr-2 px-4 py-2 mt-3 flex justify-center login-primary text-white rounded w-100" href="#">
        Chart
      </a>
    </>
  );
};

export default StarLine;
