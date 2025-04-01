import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbHttpPost } from "react-icons/tb";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { axiosInstance } from "@/libs/axiosInstance";

const Header = ({ openSidebar, setOpenSidebar }) => {
  const [user, setUser] = useState(null)
  const getUser = async()=>{
    axiosInstance.get('/user').then((data)=>{
      if(data?.data?.status){
        setUser(data?.data?.user)
      }
    })
  }
  useEffect(() => {
    getUser()
  }, [])
  
  return (
    <div className="flex px-4 bg-white shaddow-md sticky top-0 w-full z-50 items-center justify-between">
      <Link href={"/"} className="flex space-x-3 py-4">
        <FaShoppingCart className="text-[#f76411] text-3xl" />
        <div className="font-bold">
          <span className="text-3xl text-[#f23e14]">Z</span>
          <span className="text-2xl  text-orange-600">ain</span>
          <span className="text-3xl text-gray-800">K</span>
          <span className="text-2xl text-gray-800">ing</span>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <div className="relative group me-4 py-4">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src="/english.png" alt="flag" className="h-5" />
            <span className="font-semibold">English</span>
            <MdOutlineKeyboardArrowDown className="text-xl ms-3" />
          </div>
          <div className="absolute z-60 top-14 lef-[1px] right-3 w-48 bg-white border rounded shadow-lg hidden group-hover:block ">
            <button className="flex font-semibold items-center space-x-3 p-2 hover:bg-gray-100 w-full">
              <img src="/english.png" alt="flag" className="h-5" />
              <span className="font-semibold">English</span>
            </button>

            <button className="flex font-semibold items-center space-x-3  p-2 hover:bg-gray-100 w-full">
              <img src="/bangla.png" alt="flag" className="h-5" />
              <span className="font-semibold">Bangla</span>
            </button>

            <button className="flex font-semibold items-center space-x-3  p-2 hover:bg-gray-100 w-full">
              <img src="/arabic.png" alt="flag" className="h-5" />
              <span className="font-semibold">Arabic</span>
            </button>
          </div>
        </div>
        <div className="ng-orange-100 p-2 rounded">
        <TbHttpPost className="text-[#f34d13]" />
        </div> 
        <div title="Show side bar" onClick={()=> setOpenSidebar(!openSidebar)} className="bg-red-100 cursor-pointer rounded p-2">
        <HiBars3BottomLeft className="text-[#f34d13]"/>
      
        </div>
        <div className="flex items-center space-x-2 p-2">
        <img 
        // src="https://placehold.co/40x40" 
        src={"ashraf.jpg" || "https://placehold.co/40x40"} 
        alt="use icon" className="w-8 h-8 rounded-md" />
        <div className="flex flex-col ">
        <span className="text-sm">Hello</span>
        <span className="text-sm font-bold">{user?.name || "User"}</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
