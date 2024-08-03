// Carousel.tsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../images/banner1.jpg";


const Carousel: React.FC = () => {
  const token = localStorage.getItem("item") || '';
  const [images, setImages] = useState<any>()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };



  useEffect(() => {
    fetchAppDetails()
  }, [])

  const fetchAppDetails = async () => {
    try {

      const response = await fetch("https://smapidev.co.in/api/Api/app_details",
        {
          method: "POST",
          headers: {
            token
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Cookie': 'ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3'
          },
        });

      response.json().then((result: any) => {

        if (result.code == 100) {  // change == to === 
          const myArray = []
          myArray.push(result?.data?.banner_image?.banner_img_1);
          myArray.push(result?.data?.banner_image?.banner_img_2);
          myArray.push(result?.data?.banner_image?.banner_img_3);

          // Update the state with the new array
          setImages([...myArray]);
          // setImages(result?.data?.banner_image)
        }

      }).catch((error: any) => {
        alert(error)
      })

    } catch (error) {
      // alert("ERROR IN GAME LIST" + error)
    }
  }


  return (
    <div className="parent-slider max-w-screen-lg mx-auto">
      <Slider {...settings}>

        <div>
          <img
            className="w-full"
            src={images?.length > 0 ? images[0] : null}
            alt="Slide 1"
          />
        </div>
        <div>
          <img
            className="w-full"
            src={images?.length > 0 ? images[1] : null}
            alt="Slide 1"
          />
        </div>
        <div>
          <img
            className="w-full"
            src={images?.length > 0 ? images[0] : null}  //image index is chnaged 
            alt="Slide 1"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
