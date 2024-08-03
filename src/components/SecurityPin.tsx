import React, { useEffect, useState } from 'react';
import logo from "../images/logo512.png";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

const SecurityPin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [pin, setPin] = useState(['', '', '', '']);
  const token = localStorage.getItem("token") || '';

  const handleInput = (index: number, value: string) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

  useEffect(() => {
    if (pin.every(val => val !== '')) {
      callApi(pin);
    }
  }, [pin]);

  const callApi = async (myPin: any) => {
    const formData = new URLSearchParams();
    formData.append("pin", myPin.join(""));
    try {
      const response = await fetch("https://smapidev.co.in/api/Api/login_pin", {
        method: "POST",
        headers: {
          'token': token,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3'
        },
        body: formData,
      });
      response.json().then((data: any) => {
        if (data?.code === "101") {
          toast.success(data.message, { position: 'top-right' });
          localStorage.setItem("token",data?.data?.token)
          dispatch({ type: 'LOGIN_SUCCESS', payload: { token: data?.data?.token } });
          navigate("/")
        }
        else {
          toast.error(data.message, { position: 'top-right' });
        }
      }).catch((error: any) => {
        toast.error('An error occurred!', { position: 'top-right' });
      })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex custom-blue-1 flex-col items-center justify-center mx-auto h-screen'>
      <ToastContainer />
      <img src={logo} alt="Logo" className="mx-auto" />
      <h1 className='text-white mt-8'>Please Enter Your Security Pin</h1>
      <div className="grid grid-cols-4 gap-4 mt-6 w-1/3">
        {pin.map((value, index) => (
          <input
            key={index}
            type="checkbox"
            checked={value !== ''}
            onChange={() => handleInput(index, value === '' ? '1' : '')}
            className="bg-white text-center text-black text-lg font-bold rounded-md h-6 w-6"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 w-1/2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="bg-white text-blue-800 font-bold rounded-full h-12 w-12"
            onClick={() => handleInput(pin.findIndex(val => val === ''), num.toString())}
          >
            {num}
          </button>
        ))}
        <button
          className="bg-white text-blue-800 font-bold rounded-full h-12 w-12"
          onClick={() => setPin(['', '', '', ''])}
        >
          CLR
        </button>
        <button
          className="bg-white text-blue-800 font-bold rounded-full h-12 w-12"
          onClick={() => setPin(['', '', '', ''])}
        >
          0
        </button>
        <button
          className="bg-white text-blue-800 font-bold rounded-full h-12 w-12"
          onClick={() => {
            const newPin = [...pin];
            const emptyIndex = newPin.findIndex(val => val === '');

            if (emptyIndex !== -1) {
              newPin[emptyIndex - 1] = '';
              setPin(newPin);
            }
          }}
        >
          DEL
        </button>
      </div>
    </div>
  );
}

export default SecurityPin;
