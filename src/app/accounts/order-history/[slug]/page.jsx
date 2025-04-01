"use client";
import AccountSideBar from "@/components/AccountSideBar";
import OrderDetails from "@/components/Dashboard/Components/Orders/OrderDetails";
import { axiosInstance } from "@/libs/axiosInstance";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaEllipsisH } from "react-icons/fa";

const ActionDropdown = ({cancelOrder, order}) => {
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
        <div className="  z-10 origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Link href={`/accounts/order-history/${order?._id}`} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              View Details
            </Link>
            <button className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Track Order
            </button>
            <button onClick={(e)=>{ e.preventDefault(); cancelOrder(order?._id);}} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Cancel Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Orders = () => {
    const [data, setData] = useState("")
    const params = useParams()
    // console.log('params.slug[1]',params.slug[1]);
  
    const fetchOrderData = async()=>{
      axiosInstance.get(`/orders/${params.slug}`).then((data)=>{
        if(data?.data?.status){
          setData(data?.data?.data)
          // console.log('data in fetch', orderData);
          
        }
      })
    }
    useEffect(() => {
      fetchOrderData()
    }, [])
     const cancelOrder = async (id) => {
        axiosInstance
          .put(`/orders/${id}`, { orderStatus: "Cancelled" })
          .then((data) => {
            if (data?.data?.status) {
              alert("Order Cancelled");
              fetchOrders();
            }
          });
      };
  
  return (
    <main className="w-full px-4 pb-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">Order Details</h1>
      <div className="bg-white rounded-lg shadow-md">
       <OrderDetails from="user" fetchOrder={fetchOrderData} {...data} order={data}/>
      </div>
    </main>
  );
};

export default Orders;
