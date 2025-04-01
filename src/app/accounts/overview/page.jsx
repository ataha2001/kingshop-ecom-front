"use client";
import AccountSideBar from "@/components/AccountSideBar";
import { axiosInstance } from "@/libs/axiosInstance";
import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaEllipsisH,
  FaShoppingBag,
  FaUndoAlt,
} from "react-icons/fa";

// const orders1 = [
//   {
//     id: 1,
//     products: "Product A, Product B",
//     status: "Shipped",
//     payment: "Paid",
//     amount: "$120",
//   },
//   {
//     id: 2,
//     products: "Product C",
//     status: "Processing",
//     payment: "Pending",
//     amount: "$80",
//   },
// ];

const ActionDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        //   className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        className="rounded-full p-2 bg-red-500 text-white"
        onClick={() => setOpen(!open)}
      >
        <FaEllipsisH className="" />
      </button>
      {open && (
        <div className="  z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              View Details
            </button>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Track Order
            </button>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Cancel Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Overview = () => {
  const [orders, setOrders] = useState([])
  const fetchOrders = async ()=>{
    axiosInstance.get('/orders').then((data)=>{
      if(data?.data?.status){
        setOrders(data?.data?.data)
      }
    })
  }
  useEffect(() => {
    fetchOrders()
  }, [])
  // console.log(orders);
  
  return (
    <main className="w-full px-4">
      <h1 className="text-2xl font-bold text-orange-500">Overview</h1>
      <p className="text-lg mt-2">Welcome Back, Ashraf Taha!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-6">
        {/* Total Orders */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <div className="bg-pink-500 text-white rounded-full p-3 mb-2">
            <FaShoppingBag size={24} />
          </div>
          <p className="text-2xl font-bold text-pink-500">{orders?.length}</p>
          <p className="text-gray-600">Total Orders</p>
        </div>
        {/* Total Completed */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <div className="bg-orange-500 text-white rounded-full p-3 mb-2">
            <FaShoppingBag size={24} />
          </div>
          <p className="text-2xl font-bold text-orange-500">{orders?.filter((item)=> item?.orderStatus ==="Delivered").length}</p>
          <p className="text-gray-600">Total Completed</p>
        </div>
        {/* Total Returned */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <div className="bg-purple-500 text-white rounded-full p-3 mb-2">
            <FaUndoAlt size={24} />
          </div>
          <p className="text-2xl font-bold text-purple-500">{orders?.filter((item)=> item?.orderStatus ==="Returned").length}</p>
          <p className="text-gray-600">Total Returned</p>
        </div>

      </div>

      {/*<h1 className="text-2xl font-bold text-orange-500 mb-6">Order History</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-4">Order ID</th>
              <th className="pb-4">Products</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Payment</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-4">{order._id}</td>
                  <td className="py-4">{order.products}</td>
                  <td className="py-4">{order.status}</td>
                  <td className="py-4">{order.payment}</td>
                  <td className="py-4">{order.amount}</td>
                  <td className="py-4">
                    <ActionDropdown />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Showing 0 to 0 of 0 results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>*/}
    </main>
  );
};

export default Overview;
