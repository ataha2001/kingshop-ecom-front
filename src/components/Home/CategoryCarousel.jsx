"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { axiosInstance } from "@/libs/axiosInstance";

const CategoryCarousel = () => {
  const [categories, setCategories] = useState([])
    const fetchCateories =async()=>{
      axiosInstance.get('/category').then((data)=>{
        if(data?.data?.status){
          setCategories(data?.data?.data)
        }
      })
    }
    useEffect(() => {
      fetchCateories()
    }, [])
    
    const sliderRef = useRef() 
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  // console.log('category',categories);
  
  // const categories = [
  //   { name: "Men", image: "/men-thumb.png" },
  //   { name: "Hoodies", image: "/hoodies-thumb.png" },
  //   { name: "Clothing", image: "/clothing-thumb.png" },
  //   { name: "Shorts", image: "/shorts-thumb.png" },
  //   { name: "Jackets & vests", image: "/jackets-thumb.png" },
  //   { name: "pants & Tights", image: "/pants-thumb.png" },
  //   { name: "Top & TShirts", image: "/tops-thumb.png" },
  //   { name: "Basket Ball", image: "/basket-thumb.png" },
  // ];
  return (
    <div className="xl:container category-carousel mx-auto overflow-hidden px-2 xl:px-4 mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-md lg:text-4xl font-bold">Browse By Categories</h3>
        <div className="flex items-center gap-3">
      
          <button onClick={()=> sliderRef.current.slickPrev()} className="bg-gray-200 w-8 lg:w-10 h-8 lg:h-10 rounded-full px-1 lg:px-2 py-1">
            <MdKeyboardArrowLeft className="text-[#f74611]" size={25} />
          </button>
          <button onClick={()=> sliderRef.current.slickNext()} className="bg-gray-200 w-8 lg:w-10 h-8 lg:h-10 rounded-full px-1 lg:px-2 py-1">
            <MdKeyboardArrowRight className="text-[#f74611]" size={25} />
          </button>
        </div>
      </div>
      <div className="mt-5">
      <Slider ref={sliderRef} {...settings}>
        {categories?.map((item, index) => (
          <div key={index} className="flex justify-center gap-3 pe-3 rounded-t-md">
            <img
              src={item?.image?.url}
              alt={item?.category}
              className="w-full h-full rounded-tr-md rounded-tl-md"
            />
            <h5 className="text-center font-semibold mt-3">{item?.subcategory}</h5>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default CategoryCarousel;
