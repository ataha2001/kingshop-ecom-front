"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { axiosInstance } from "@/libs/axiosInstance";

const PopularBrands = () => {
  const [brands, setbrands] = useState([])
  const fetchBarnds=async()=>{
    axiosInstance.get('/brand').then((data)=>{
      if(data?.data?.status){
        setbrands(data?.data?.data)
      }
    })
  }
  useEffect(() => {
    fetchBarnds()
  }, [])
  
  const sliderRef = useRef();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="xl:container mx-auto overflow-hidden px-2 xl:px-4 mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-bold ">Popular Brands</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="bg-gray-200 w-8 lg:w-10 h-8 lg:h-10 rounded-full px-1 lg:px-2 py-1"
          >
            <MdKeyboardArrowLeft className="text-[#f74611]" size={25} />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="bg-gray-200 w-8 lg:w-10 h-8 lg:h-10 rounded-full px-1 lg:px-2 py-1"
          >
            <MdKeyboardArrowRight className="text-[#f74611]" size={25} />
          </button>
        </div>
      </div>
      <div className="mt-5 ">
        <Slider ref={sliderRef} {...settings}>
          {brands?.map((item, index) => (
            <div
              key={index}
              className=" p-4 flex flex-col justify-center items-center shadow-md mx-3 bg-white my-1"
            >
              <img
                src={item?.image.url}
                alt={item?.name}
                className="w-full block mx-auto aspect-square h-[80px] p-4 mb-3 "
              />
              <h5 className="text-center font-semibold ">{item?.name}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PopularBrands;
