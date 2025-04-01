'use client'
import Carousel from "@/components/Home/Carousel";
import CategoryCarousel from "@/components/Home/CategoryCarousel";
import PopularBrands from "@/components/Home/PopularBrands";
import PromotionCards from "@/components/Home/PromotionCards";
import ProductCart from "@/components/ProductCard";
import { axiosInstance } from "@/libs/axiosInstance";
import { useEffect, useState } from "react";
import { FaHeadset, FaHeart, FaLock, FaShippingFast } from "react-icons/fa";
import { showToast } from "@/components/CustomToast";

export default function Home() {
  const products = [
    
    {
      title: "Classics French Men's Hoodie",
      image: "/1-cover.png",
      // image: "/1-cover.png",
      price: "$50",
      oreginalPrice: "$70",
    },
    {
      title: "Black Jacket",
      image: "/2-cover.png",
      price: "$130",
      oreginalPrice: "$150",
    },
    {
      title: "Classic Gabardine Pant",
      image: "/3-cover.png",
      price: "$25",
      oreginalPrice: "$50",
    },
    {
      title: "Classic Gabardine",
      image: "/4-cover.png",
      price: "$25",
      oreginalPrice: "$50",
    },
    {
      title: "Classic Sportswear",
      image: "/5-cover.png",
      price: "$70",
      oreginalPrice: "$80",
    },
    {
      title: "Sportswear Ready",
      image: "/6-cover.png",
      price: "$80",
      oreginalPrice: "$90",
    },
    {
      title: "GT Cut 2",
      image: "/7-cover.png",
      price: "$80",
      oreginalPrice: "$100",
    },
    {
      title: "Leadcat Slide",
      image: "/8-cover.png",
      price: "$64",
      oreginalPrice: "$80",
    },
  ];
  const [flashSaleProducts, setFlashSaleProducts] = useState([])
  const [latestProducts, setLatestProducts] = useState([])
  const [heartColor, setHeartColor] = useState(false)
  const fetchFlashSaleProducts = async()=>{
    axiosInstance.get('/products/flash-sales').then((data)=>{
      if(data?.data?.status){
        setFlashSaleProducts(data?.data?.data)
      }
    })
    axiosInstance.get('/products').then((data)=>{
      if(data?.data?.status){
        setLatestProducts(data?.data?.data)
      }
    })
  }
  useEffect(() => {
    fetchFlashSaleProducts()
  }, [])
  // console.log('flashSaleProducts',flashSaleProducts);
  const addToWishlist = async(id)=>{
    axiosInstance.post("/wishList", { product: id }).then((data) => {
         console.log('status',data?.data?.status);
         
          if (data?.data?.status) {
            showToast("success", "Product Added to WishList....");
            setHeartColor(true)
          } else {
            showToast("error", "Somthing went wronge!!.. check your wishlist maybe product is thier..");
          }
        });
  }
  const services = [
    {
      icon: <FaHeadset size={30} className="text-center text-[#f23e14]" />,
      title: "Professional Service",
      description: "Efficient customer support from passianate team",
    },
    {
      icon: <FaLock size={30} className="text-center text-[#f23e14]" />,
      title: "Secure Payment",
      description: "Different secure payment methods",
    },
    {
      icon: <FaShippingFast size={30} className="text-center text-[#f23e14]" />,
      title: "Fast Delivery",
      description: "Fast and convenient door to door delivery",
    },
    {
      icon: <FaHeart size={30} className="text-center text-[#f23e14]" />,
      title: "Quality & Savings",
      description: "Comprehensive quality contol and affordable prices",
    },
  ];
  return (
    <div className="mb-8">
      <Carousel />
      <CategoryCarousel />
      <PromotionCards />
      <div className="xl:container px-2 xl:px-4 mt-10 mx-auto">
        <h2 className="text-4xl font-bold mb-4 ">Latest Products</h2>
        <ProductCart isWishListed={false} wishlistClick={addToWishlist} data={latestProducts} />
      </div>
      <div className="xl:container px-2 xl:px-4 mt-10 mx-auto">
        <h2 className="text-4xl font-bold mb-4 ">Flash Sales</h2>
        <ProductCart isWishListed={heartColor} wishlistClick={addToWishlist} data={flashSaleProducts} />
      </div>
      <PopularBrands />
      <div className="xl:container px-2 xl:px-4 mt-10">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center p-8">
          {services?.map((item, index) => (
            <div key={index} className="text-center w-full sm:w-1/2 md:w-1/4">
              <div className="flex items-center justify-center mb-3">
                {item?.icon}
              </div>
              <h3 className="font-bold text-lg">{item?.title}</h3>
              <p className="text-sm">{item?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
