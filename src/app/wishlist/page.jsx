"use client";
import ProductCart from "@/components/ProductCard";
import { axiosInstance } from "@/libs/axiosInstance";
import React, { useEffect, useState } from "react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { showToast } from "@/components/CustomToast";
import { useRouter } from "next/navigation";


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const fetchWishlist = async () => {
    axiosInstance.get("/wishList").then((data) => {
      if (data?.data?.status) {
        setWishlist(data?.data?.data);
      }
    });
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFormWishlist = async (id) => {
    axiosInstance.delete(`/wishList/${id}`).then((data) => {
      if (data?.data?.status) {
        fetchWishlist();
      }
    });
  };
  const route = useRouter()
  const clearWishlist = async () => {
    axiosInstance.delete('/wishList').then((data)=>{
        if(data?.data?.status){
            fetchWishlist()
            showToast("success", "WishList Cleared....");
            setWishlist([])
            setTimeout(() => {
                route.push('/')
            }, 1000);

        }
    })
  };
  return (
    <div className="xl:container px-2 xl-px-4 py-12 mx-auto">
      <div className="flex items-center w-full">
        <div className="flex items-center w-[50%]">
          <h1 className="text-xl md:text-4xl font-bold mb-0">Wishlist</h1>
          <span className="text-md md:text-xl ms-2 relative top-[1px]">
            ({wishlist?.products?.length} products Found)
          </span>
        </div>
        <div className="w-full flex justify-end">
        {
            wishlist?.products?.length > 0 ? <button
            onClick={clearWishlist}
            disabled={wishlist?.products?.length <= 0}
            className={`border rounded-md text-white px-3 py-2 font-semibold ${
                wishlist?.products?.length <= 0 ? "bg-gray-200" : "bg-orange-500"
              }`}
          >
            Clear
          </button> : ""
        }
          
        </div>
      </div>
      <div className="mt-5">
      {
        wishlist?.products?.length ? <ProductCart
          isWishListed={true}
          wishlistClick={removeFormWishlist}
          data={wishlist?.products}
        /> :
        <div className="">
        <img className="block mx-auto" src="/emptywishlist.jpg" alt="emptywishlist" />
        </div>
      }
        
      </div>
    </div>
  );
};

export default Wishlist;
