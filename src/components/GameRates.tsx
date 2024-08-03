import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaLock, FaEye, FaEyeSlash, FaEdit, FaRupeeSign, FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { NavBar2 } from "./NavBar2";
import { MyDatePicker } from "./MyDatePicker";
import { toast } from "react-toastify";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NavBar2Props {
  isGameRates?: boolean;
}

const DoublePanna: React.FC<NavBar2Props> = ({ isGameRates }) => {
  const [gameRatesState, setGameRatesState] = useState<any>();
  const [loading, setLoading] = useState(true)


  const token = localStorage.getItem("token") || '';


  useEffect(() => {
    gameRates()
  }, [])

  const gameRates = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://smapidev.co.in/api/Api/game_rate_list",
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
          setGameRatesState(result?.data)
        }

        setLoading(false)
      }).catch((error: any) => {
        setLoading(false)

        toast.error(error)
      })

    } catch (error) {
      alert("ERROR IN GAME LIST" + error)
      toast.error("Something went wrong on server")

    }
  }

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const response = await fetch("your-api-url", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Password changed successfully");
      } else {
        console.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleGameButtonClick = (label: string, value: number) => {
    // Handle game button click
    console.log(`${label} - ${value} button clicked`);
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <NavBar2 isGameRates={true} />
      <div className="container mx-auto gamerates">
        {
          loading ? (
            <>
              <FaSpinner />
            </>
          )
            : (
              <>
                {
                  gameRatesState?.length > 0 ? (
                    <>{
                      gameRatesState.map((data: any) => (
                        <>  <div>
                          <div
                            onClick={() => handleGameButtonClick("Jodi Digit", 1000)}
                            className="flex justify-around items-center w-full bg-blue-800 text-white p-3 mb-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                          >
                            <span>{data?.name?.split('_').map((word:any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                            <span>{data.cost_amount}-{data.earning_amount}</span>
                          </div>
                        </div></>
                      ))
                    }
                    </>

                  ) : null
                }

              </>
            )

        }

      </div>
    </div>
  );
};

export default DoublePanna;
