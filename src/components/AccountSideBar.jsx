import React, { useState } from "react";
import {
  FaBox,
  FaUndoAlt,
  FaUser,
  FaKey,
  FaMapMarkerAlt,
  FaThLarge,
  FaChevronDown,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const orders = [
  {
    id: 1,
    products: "Product A, Product B",
    status: "Shipped",
    payment: "Paid",
    amount: "$120",
  },
  {
    id: 2,
    products: "Product C",
    status: "Processing",
    payment: "Pending",
    amount: "$80",
  },
];

const AccountSideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-1/4 p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          // src="https://placehold.co/100x100"
          src="/avatar.png"
          alt="User profile"
          className="rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">Ashraf Taha</h2>
      </div>
      <nav className="mt-6">
        <ul>
          <Link
            href={"/accounts/overview"}
            className={`flex items-center mb-4 ${pathname === '/accounts/overview' ? 'text-red-500' : 'text-gray-500'} `}
          >
            <FaThLarge className="mr-2" />
            <span>Overview</span>
          </Link>
          <Link
            href={"/accounts/order-history"}
            className={`flex items-center mb-4 ${pathname === '/accounts/order-history' ? 'text-red-500' : 'text-gray-500'} `}
          >
            <FaBox className="mr-2" />
            <span>Order History</span>
          </Link>
         {/* <Link
            href={"/accounts/return-orders"}
            className={`flex items-center mb-4 ${pathname === '/accounts/return-orders' ? 'text-red-500' : 'text-gray-500'} `}
          >
            <FaUndoAlt className="mr-2" />
            <span>Return Orders</span>
          </Link>*/}
          <Link
            href={"/accounts/account-info"}
            className={`flex items-center mb-4 ${pathname === '/accounts/account-info' ? 'text-red-500' : 'text-gray-500'} `}
          >
            <FaUser className="mr-2" />
            <span>Account Info</span>
          </Link>
          <Link
            href={"/accounts/change-password"}
            className={`flex items-center mb-4 ${pathname === '/accounts/change-password' ? 'text-red-500' : 'text-gray-500'} `}
          >
            <FaKey className="mr-2" />
            <span>Change Password</span>
          </Link>
          <Link
            href={"/accounts/address"}
            className={`flex items-center mb-4 ${pathname === '/accounts/address' ? 'text-red-500' : 'text-gray-500'} `}
          >
            <FaMapMarkerAlt className="mr-2" />
            <span>Address</span>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};
export default AccountSideBar;
