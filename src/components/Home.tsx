// Carousel.tsx
import React, { useEffect, useState } from "react";
import Carousel from "./carousel";
import {
  FaGamepad,
  FaGlobe,
  FaMoneyBillWave,
  FaPhone,
  FaPlay,
  FaPlayCircle,
  FaSpinner,
  FaStreetView,
  FaWhatsapp,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || '';

  const [mainGameList, setMainGameList] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    gameList()
  }, [])


  const gameList = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://development.smapidev.co.in/api/Api/main_game_list",
        {
          method: "POST",
          headers: {
            token
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Cookie': 'ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3'
          },
        });

      response.json().then((result: any) => {
        if (result.code == 100) {
          setMainGameList(result?.data)
        }
        setLoading(false)
      }).catch((error: any) => {
        alert(error)
        setLoading(false)

      })

    } catch (error) {
      toast.error("Internal server error ")
      // alert("ERROR IN GAME LIST" + error)
    }
  }



  return (
    // <>
    <div>
      <Carousel />

      <div className="container primary-text">
        <div className="flex flex-row gap-3">
          {/* WhatsApp Button */}
          <button className="custom-green text-white font-medium py-2 px-2 rounded"
            onClick={() => {
              window.location.href = `https://wa.me/+919833190547`;

            }}
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp
          </button>

          {/* Add Money Button */}
          <button className="custom-blue text-white font-medium py-2 px-2 rounded" onClick={() => { navigate("/funds") }}>
            <FaMoneyBillWave className="mr-2" />
            Add Money
          </button>

          {/* How to Play Button */}
          <button className="custom-purple text-white font-medium py-2 px-2 rounded" onClick={() => { navigate("/help") }}>
            <FaPlay className="mr-2" />
            How to Play
          </button>

          {/* Phone Button */}
          <button
            onClick={() => {
              window.open(`tel:${919833190547}`, '_blank');

            }}
            className="bg-white hover:bg-black-600 text-black font-medium py-2 px-2 rounded"
          >
            <FaPhone className="mr-2" />
            +91 9833190547
          </button>
        </div>

        {/* Secondary Buttons */}
        <div className="flex flex-row md:flex-row gap-3 md:space-x-4 mt-4">
          {/* Play Star Line Button */}
          <button className="bg-white hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded" onClick={() => { navigate("/starline", { state: { startLine: true } }) }}>
            <FaPlayCircle className="mr-2" />
            Play Star Line
          </button>

          {/* Website Button */}
          <Link to="https://kalyanapp.co.in/" className="bg-white hover:bg-indigo-600 text-black font-medium py-2 px-4 rounded">
            <FaGlobe className="mr-2" />
            Website
          </Link>

          {/* Gali Desawar Button */}
          <button className="bg-white hover:bg-red-600 text-black font-medium py-2 px-4 rounded" onClick={() => { navigate("/starline", { state: { galiDesawar: true } }) }}>
            <FaStreetView className="mr-2" />
            Gali Desawar
          </button>
        </div>
      </div>


      <div className="mx-auto rounded-xl overflow-hidden satta-matka-home">
        {
          loading ? (
            <FaSpinner />
          ) : (
            <div className="satta-matka">
              <div className="md:flex-shrink-0"></div>
              <div className="card-bg">
                {
                  mainGameList.length > 0 ? (
                    <>
                      {
                        mainGameList.map((game: any) => (
                          <div className="card-new p-2">
                            <div className="uppercase heading-block tracking-wide text-xl font-bold">
                              {game.name}
                            </div>
                            <div className="flex align-items-center justify-around">
                              <a
                                href="#"
                                className="block mt-1 text-lg leading-tight font-medium text-gray-500 hover:underline"
                              >
                                <FaMoneyBillWave className="mr-2" />
                              </a>
                              <div className="flex">
                                <a
                                  href="#"
                                  className="block mt-1 text-lg leading-tight font-medium text-gray-500 hover:underline"
                                >
                                  {/* 569-900-668 */}
                                  {
                                    game.result
                                  }
                                </a>
                              </div>
                              {
                                game.play ? (
                                  <div className="flex btn-card ">
                                    {/* <Link className="rounded-5" to="/madhurnight" > Play Now
                                  </Link> */}
                                    <button onClick={() => {
                                      navigate('/madhurnight', {
                                        state: {
                                          open: game.open,
                                          id: game.id
                                        }
                                      });
                                    }}>Play Now</button>
                                  </div>
                                ) : (
                                  <div className="flex">
                                    <a className="btn-card-closed rounded-5" href="#">
                                      Closed
                                    </a>
                                  </div>
                                )
                              }
                            </div>
                            <p className="mt-2 text-black">
                              Open : {game.open_time}
                              {
                                game.open_time === Date.now() ? (
                                  <b className="text-green-600"></b>
                                ) : null
                              }

                              <span>Closes: {game.close_time}</span>
                            </p>
                          </div>
                        ))
                      }
                    </>
                  ) : (
                    <p>No data found</p>
                  )
                }



              </div>
            </div>
          )
        }

      </div>
    </div>
    // </>
  );
};

export default Home;
