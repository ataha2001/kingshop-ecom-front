"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaHeart,
  FaLock,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import MenuTabs from "./MenuTabs";
import Profile from "./Profile";
import CartSidebar from "../CartSidebar";
import Cookies from 'js-cookie'
import HomeSidebar from "./HomeSidebar";
import { FaHome, FaTag, FaQuestionCircle, FaExchangeAlt, FaShippingFast, FaRuler, FaCookieBite, FaFileContract, FaUserShield, FaInfoCircle, FaPhone } from "react-icons/fa";


const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('token') || null);
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsLoggedIn(Cookies.get('token') || null )
  }, [Cookies.get('token')])
  const [isOpenSidebar, setIsOpenSideba] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => setIsOpenSideba(!isOpenSidebar);

  // Dynamic Menu Items
  const menuItems = [
    { name: "Home", link: "/", icon: <FaHome /> },
    { name: "Offers", link: "/offers", icon: <FaTag /> },
    { name: "FAQ", link: "/faq", icon: <FaQuestionCircle /> },
    { name: "Return & Exchange", link: "/return-exchange", icon: <FaExchangeAlt /> },
    { name: "Shipping", link: "/shipping", icon: <FaShippingFast /> },
    { name: "Size Charts", link: "/size-charts", icon: <FaRuler /> },
    { name: "Cookies Policy", link: "/cookies-policy", icon: <FaCookieBite /> },
    { name: "Terms & Conditions", link: "/terms-conditions", icon: <FaFileContract /> },
    { name: "Privacy Policy", link: "/privacy-policy", icon: <FaUserShield /> },
    { name: "About Us", link: "/about-us", icon: <FaInfoCircle /> },
    { name: "Contact Us", link: "/contact-us", icon: <FaPhone /> },
  ];
  

  // Dynamic Contact Information
  const contactInfo = [
    { icon: <MdLocationOn className="text-orange-500" />, text: "House: 25, Road No: 2, Block A, Mirpur-1, Dhaka 1216" },
    { icon: <MdOutlineEmail className="text-orange-500" />, text: "info@inlabs.net" },
    { icon: <MdPhone className="text-orange-500" />, text: "1333846282" },
  ];

  // Dynamic Social Media Links
  const socialLinks = [
    { icon: <FaFacebook size={20} className="hover:text-blue-600" />, link: "https://facebook.com" },
    { icon: <FaTwitter size={20} className="hover:text-blue-400" />, link: "https://twitter.com" },
    { icon: <FaInstagram size={20} className="hover:text-pink-500" />, link: "https://instagram.com" },
    { icon: <FaYoutube size={20} className="hover:text-red-500" />, link: "https://youtube.com" },
  ];

  return (
    <>
    <div className="block lg:hidden ">
    {/* SidebarDrawer with dynamic props */}
    <HomeSidebar menuItems={menuItems} 
      contactInfo={contactInfo} socialLinks={socialLinks} 
      isOpenSidebar={isOpenSidebar} setIsOpenSideba = {setIsOpenSideba}
      toggleSidebar={toggleSidebar}
      />
      </div>
    <div className="bg-white sticky shadow-md top-0 z-50">
      <div className="xl:container flex px-2 xl:px-4 items-center justify-between mx-auto">
      <div className="block lg:hidden ">
            
             <button
                    className="fixed top-4 left-4 z-50 text-gray-700 p-2 rounded-md bg-white shadow-lg"
                    onClick={toggleSidebar}
                  >
                    {/*<FiMenu size={24} />*/}
                    <FaBars className="block lg:hidden text-2xl font-normal" />
                  </button>
          </div>
        <div className="flex items-center space-x-4 xl:space-x-8">
          
          <Link href={"/"} className="flex space-x-3 py-4">
            <FaShoppingCart className="text-[#f76411] text-3xl" />
            <div className="font-bold">
              <span className="text-3xl text-[#f23e14]">S</span>
              <span className="text-2xl  text-orange-600">hop</span>
              <span className="text-3xl text-gray-800">K</span>
              <span className="text-2xl text-gray-800">ing</span>
            </div>
          </Link>
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 py-4">
            <Link
              href={"/"}
              className={`font-bold text-xl ${
                pathname === "/" ? "text-[#f76411]" : "text-black"
              }`}
            >
              Home
            </Link>
            <div className="relative group py-4 ">
              <button className="text-black font-bold text-xl flex items-center gap-2">
                Categories
                <MdOutlineKeyboardArrowDown className="text-2xl" />
              </button>
              <div className="absolute top-14 left-[-100px] w-[800px] bg-white shadow-md rounded hidden group-hover:block">
                <MenuTabs />
              </div>
            </div>
            <Link
              href={"/offers"}
              className={`font-bold text-xl  ${
                pathname === "/offers" ? "text-[#f76411]" : "text-black"
              } `}
            >
              Offers
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" />
          </div>
          <div className="relative group me-4 py-4 ">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="/english.png" alt="flag" className="h-5" />
              <span className="font-semibold">English</span>
              <MdOutlineKeyboardArrowDown className="text-xl ms-3" />
            </div>
           { /*<div className="absolute top-14 lef-[1px] w-48 bg-white border rounded shadow-lg hidden group-hover:block ">
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
            </div>*/}
          </div>
          <Link href={"/wishlist"}>
            <FaHeart className="text-black cursor-pointer" />
          </Link>
          <div className="relative group me-4 py-4">
            <div className="flex items-center space-x-2 ">
              <FaUser className="text-black cursor-pointer" />
            </div>
            <div className="absolute top-12 right-[-10px] w-52 p-3 bg-white rounded-md shadow-md hidden group-hover:block">
              {!isLoggedIn ? (
                <div className="flex flex-col py-3 items-center justify-center">
                  <Link
                    href={"/register"}
                    className="py-2 px-3 block bg-[#ff4f0080] rounded-full text-white"
                  >
                    Register your Account
                  </Link>
                  <p className="py-1 text-center">Or</p>
                  <Link
                    href={"/login"}
                    className="py-2 px-3 block bg-[#ff4500] rounded-full text-white"
                  >
                    Login to your Account
                  </Link>
                </div>
              ) : (
                <Profile
                  user={{
                    name: "Ashraf Taha",
                    phone: "01032633371",
                    avatarUrl: "/avatar.png",
                  }}
                />
              )}
            </div>
          </div>
          <div className="bg-black p-3 rounded-full cursor-pointer">
            <FaLock onClick={()=> setIsOpen(!isOpen)} className="text-white text-xl" />
          </div>
        </div>
        <div className="lg:hidden ">
          <FaSearch className="p-1 text-2xl" />
        </div>
      </div>
    </div>
    <CartSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
