"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGlobe } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";

const HomeSidebar = ({
  menuItems,
  contactInfo,
  socialLinks,
  isOpenSidebar,
  setIsOpenSideba,
  toggleSidebar,
}) => {
    const pathname = usePathname()
  return (
    <div className="bg-orange-200">
  {/* Sidebar Toggle Button */}
  <button
    className="fixed top-4 left-4 z-50 text-gray-700 p-2 rounded-md bg-white shadow-lg"
    onClick={toggleSidebar}
  >
    <IoMdClose size={24} />
  </button>

  {/* Backdrop (Click to Close) */}
  {isOpenSidebar && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={toggleSidebar}
    />
  )}

  {/* Sidebar Drawer */}
  <div
    className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform ${
      isOpenSidebar ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 ease-in-out z-50 
      overflow-y-auto max-h-screen custom-scrollbar`}
  >
    {/* Header with Close Button */}
    <div className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold text-orange-500">ShopKing</h1>
      <button onClick={toggleSidebar} className="text-gray-600">
        <FiX size={24} />
      </button>
    </div>

    {/* Dynamic Menu Items */}
    <nav className="p-4">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className={`block py-2 ${item?.link === pathname ? "text-orange-500" : "text-gray-700" } text-gray-700 hover:text-orange-500 transition duration-200 `}
        >
        <div className="flex gap-3">
        {item.icon}
        {item.name}
        </div>
        </a>
      ))}
    </nav>

    {/* Dynamic Contact Section */}
    <div className="p-4 border-t">
      <h2 className="text-gray-700 font-semibold">Contact</h2>
      <div className="mt-2 text-sm text-gray-600">
        {contactInfo.map((contact, index) => (
          <p key={index} className="flex items-center gap-2">
            {contact.icon}
            {contact.text}
          </p>
        ))}
      </div>
    </div>

    {/* Dynamic Social Media Links */}
    <div className="p-4 border-t">
      <h2 className="text-gray-700 font-semibold">Follow Us</h2>
      <div className="flex space-x-4 mt-2 text-orange-500">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>

    {/* Footer */}
    <div className="p-4 border-t text-center text-gray-500 text-sm">
      © ShopKing by nLabs 2024. All Rights Reserved.
    </div>
  </div>
</div>

  );
};

export default HomeSidebar;
