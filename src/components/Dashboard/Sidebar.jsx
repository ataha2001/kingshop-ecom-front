"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { TbCreditCardRefund, TbLogout, TbShoppingCartOff } from "react-icons/tb";
import { TfiShoppingCart } from "react-icons/tfi";
import { RiProductHuntLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { SiBrandfolder } from "react-icons/si";

import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Sidebar = ({ openSidebar }) => {
  
  // const [activeLink, setActiveLink] = useState("/dashboard");
  const pathname = usePathname()
  const sideBarSections = [
    {
      title: "Producrs & Stocks",
      items: [
        {
          icon: <MdOutlineCategory size={20}/>,
          label: "Categories",
          link: "/dashboard/categories",
        },
        {
        icon: <SiBrandfolder size={18}/>,
        label: "Brands",
        link: "/dashboard/brands",
      },
    
        {
          icon: <RiProductHuntLine size={20} />,
          label: "Products",
          link: "/dashboard/products",
        },
       
      ],
    },
    {
      title: "Orders",
      items: [
        {
          icon: <TfiShoppingCart size={20}/>,
          label: "View Orders",
          link: "/dashboard/orders",
        },
        {
          icon: <TbShoppingCartOff size={20} />,
          label: "Return Orders",
          link: "/dashboard/return",
        },
        {
          icon: <TbCreditCardRefund size={20} />,
          label: "Return & Refunds",
          link: "/dashboard/return-refund",
        },
       
      ],
    },{
      title:"Settings",
      items: [
        {
          icon: <TbLogout size={20}/>,
          label: "Logout",
          link: "/dashboard/orders",
        },
      ]
    }
  ];
  // console.log('activeLink',activeLink);
  const handleLogout = ()=>{
    Cookies.remove('token')
    window.location.assign('/')
  }
  return (
    <div className="h-full w-64 bg-white shaddow-md ">
      <div className="p-4 scroll h-[90vh] overflow-x-hidden overflow-y-scroll">
        <Link
          href={"/dashboard"}
          onClick={() => setActiveLink('Dashboard')}
          className={`${
            pathname === "/dashboard"
              ? "bg-[#f34d13] text-white font-semibold"
              : ""
          } flex items-center space-x-2 p-2 rounded-md`}
        >
          <IoHomeOutline />
          <span className={`S{!openSidebar  && 'hidden} md:online`}>
            Dashboard
          </span>
        </Link>
        {sideBarSections?.map((item, index) => (
          <div key={index} className="mt-4">
            <h2 className="text-xs text-gray-500 font-semibold ">
              {item.title}
            </h2>
            <div className="mt-2">
              {item.items.map((item, index) => {
                if(item?.label ==="Logout"){
                  return <Link
                  href="#"
                  key={index}
                  onClick={handleLogout}
                  // onClick={() => setActiveLink(item?.link)}
                  className={`${
                    item?.link === pathname
                      ? "bg-[#f34d13] text-white font-semibold"
                      : ""
                  } flex items-center space-x-2 p-2 rounded-md`}
                >
                  {item.icon}
                  <span className="md:inline">{item.label}</span>
                </Link>
                }else {
                return <Link
                  href={item.link}
                  key={index}
                  // onClick={() => setActiveLink(item?.link)}
                  className={`${
                    item?.link === pathname
                      ? "bg-[#f34d13] text-white font-semibold"
                      : ""
                  } flex items-center space-x-2 p-2 rounded-md`}
                >
                  {item.icon}
                  <span className="md:inline">{item.label}</span>
                </Link>
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
