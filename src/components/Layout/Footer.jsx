import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkedAlt,
  FaPhone,
  FaShoppingCart,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#1f1f39] py-6 md:py-12">
      <div className="xl:container mx-auto px-2 xl:px-4">
        <div className="flex flex-col md:flex-row gap-8 text-white justify-between items-start">
          <div className="mb-4 md:mb-0 w-full md:w-1/4">
            <Link href={"/"} className="flex items-center  space-x-3 pb-4">
              <FaShoppingCart className="text-[#f76411] text-3xl" />
              <div className="font-bold">
                <span className="text-3xl text-[#f23e14]">S</span>
                <span className="text-2xl  text-orange-600">hop</span>
                <span className="text-3xl text-white">K</span>
                <span className="text-2xl text-white">ing</span>
              </div>
            </Link>
            <p className="mb-2 mt-3 md:mt-8 text-white">Subscribe to our newsletter</p>
            <div className="flex items-center mt-5 mb-4 rounded-full p-1 bg-white md:w-full w-[300px]">
              <input
                className="p-2 rounded-l-full text-black focus:outline-none"
                type="email"
                placeholder="Your Email Address..."
                name="newsLetter"
                id=""
              />
              <button className="bg-[#ff4500] text-white p-2 rounded-r-full">
                Subseibe
              </button>
            </div>
            <div className="flex space-x-4 mt-5 md:mt-10">
              <Link href={"#"}>
                <FaFacebook
                  size={10}
                  className="p-2 w-10 h-10 bg-white rounded-full  text-black"
                />
              </Link>
              <Link href={"#"}>
                <FaTwitter
                  size={10}
                  className="p-2 w-10 h-10 bg-white rounded-full  text-black"
                />
              </Link>
              <Link href={"#"}>
                <FaInstagram
                  size={10}
                  className="p-2 w-10 h-10 bg-white rounded-full  text-black"
                />
              </Link>
              <Link href={"#"}>
                <FaYoutube
                  size={10}
                  className="p-2 w-10 h-10 bg-white rounded-full  text-black"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full ms-0 md:ms-5">
            <div className="mb-8 md:mb-0  w-full md:w-1/3">
              <h3 className="font-bold mb-4 text-2xl">Support</h3>
              <ul>
                <li className="mb-2">
                  <Link href={"/faq"}>FAQ</Link>
                </li>
                <li className="mb-2">
                  <Link href={"/return-exchange"}>Return & Exchange</Link>
                </li>
                <li className="mb-2">
                  <Link href={"/shipping"}>Shipping</Link>
                </li>
                <li className="mb-1">
                  <Link href={"/size-charts"}>Size Charts</Link>
                </li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0 w-full md:w-1/3 ">
              <h3 className="font-bold mb-4 text-2xl">Legal</h3>
              <ul>
                <li className="mb-2">
                  <Link href={"/cookies-policy"}>Cookies Policy</Link>
                </li>
                <li className="mb-2">
                  <Link href={"/terms-conditions"}>Terms & Conditions</Link>
                </li>
                <li className="mb-2">
                  <Link href={"/privacy-policy"}>Privacy Policy</Link>
                </li>
                <li className="mb-2">
                  <Link href={"/about-us"}>About Us</Link>
                </li>
                <li className="mb-2">
                  <Link href={"/contact-us"}>Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0 w-full md:w-1/3 ">
              <h3 className="font-bold mb-4 text-2xl">Contact</h3>
              <p className="mb-2 flex items-center gap-3">
                <FaMapMarkedAlt /> House: 123, Street:56, City: 789
              </p>
              <p className="mb-2 flex items-center gap-3">
                <FaEnvelope /> info@sk.com
              </p>
              <p className="mb-2 flex items-center gap-3">
                <FaPhone /> +20 123 456 789
              </p>
              <div className="flex space-x-3 mt-4">
                <img
                  src="/play-store.png"
                  alt="play store"
                  className="h-[40px] w-[130px]"
                />
                <img
                  src="/app-store.png"
                  alt="app store"
                  className="h-[40px] w-[130px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
