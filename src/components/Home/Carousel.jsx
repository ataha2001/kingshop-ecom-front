"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    // cssEase: "linear"
  };
  const slides = [
    { image: "/slider1.png", alt: "slider 1" },
    { image: "/slider2.png", alt: "slider 2" },
    { image: "/slider3.png", alt: "slider 3" },
  ];
  return (
    <div className="xl:container banner mx-auto overflow-hidden px-2 xl:px-4 my-4">
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index} className="h-[300px] lg:h-[400px]">
            <img
              src={item?.image}
              alt={item?.alt}
              className="w-full h-full rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
