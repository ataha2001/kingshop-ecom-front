import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
import {
  FaKey,
  FaLock,
  FaMapMarker,
  FaMapMarkerAlt,
  FaSignInAlt,
  FaUndoAlt,
  FaUser,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const Profile = ({ user }) => {
  const route = useRouter()
  const menuItems = [
    {
      icon: <FaLock className="mr-2 " />,
      label: "Order Hidtory",
      link:"/accounts/order-history",
    },
    {
      icon: <FaUndoAlt className="mr-2 " />,
      label: "Return Orders",
      link:"/accounts/return-orders",
    },
    {
      icon: <FaUser className="mr-2 " />,
      label: "Account Info",
      link:"/accounts/account-info",
    },
    {
      icon: <FaKey className="mr-2 " />,
      label: "Change Password",
      link:"/accounts/change-password",
    },
    {
      icon: <FaMapMarkerAlt className="mr-2 " />,
      label: "Address",
      link:"/accounts/address",
    },
    {
      icon: <FaSignInAlt className="mr-2 " />,
      label: "Logout",
      link:"",
    },
  ];

  const handlelogout = async()=>{
    Cookies.remove('token')
    window.location.assign('/')
  }
  return (
    <div className="w-full">
      <div className="flex space-x-4 items-center border-b pb-3">
        <div className="">
          <img src={user.avatarUrl} alt="profile avatar" className="w-12 h-12 rounded-full" />
        </div>
        <div className="">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>
      </div>
      <div className="mt-4">
        <ul className="space-y-4">
        {
            menuItems?.map((item,index)=>{
              return item?.label === "Logout" ? (
                <li key={index} className="mb-1 block" >
                <a  href="#" onClick={()=>{ handlelogout()}
                } className="flex items-center text-gray-700  hover:bg-gray-100">
                {item.icon}
                <span className="ms-2">{item.label}</span>
                </a>
                </li>
              ) : (
                <li key={index} className="mb-1 block" >
                <Link  href={item?.link} className="flex items-center text-gray-700  hover:bg-gray-100">
                {item.icon}
                <span className="ms-2">{item.label}</span>
                </Link>
                </li>
              )
            })
        }
        </ul>
      </div>
    </div>
  );
};

export default Profile;
