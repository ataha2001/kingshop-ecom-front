'use client'
import OrderDetails from "@/components/Dashboard/Components/Orders/OrderDetails";
import { axiosInstance } from "@/libs/axiosInstance";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const OrderView = () => {
  const [orderData, setOrderData] = useState("")
  const params = useParams()
  // console.log('params.slug[1]',params.slug[1]);
  
  const orderData1 = {
    id: "D1502588",
    status: "Delivered",
    date: "12/12/2022 10:34 AM",
    paymentType: "Cash on Delivery",
    product: {
      name: "Classic Black Sneakers",
      sku: "12345",
      quantity: 1,
      image: "https://placehold.co/100x100",
    },
    summary: {
      subtotal: 500.0,
      tax: 25.0,
      discount: 0.0,
      shippingCharges: 50.0,
      total: 575.0,
    },
    shippingAddress: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "House 123, Street 45, Block 6, Greenwood 12345, City, Country",
    },
    billingAddress: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "House 123, Street 45, Block 6, Greenwood 12345, City, Country",
    },
  };

  const fetchOrderData = async()=>{
    axiosInstance.get(`/orders/${params.slug[1]}`).then((data)=>{
      if(data?.data?.status){
        setOrderData(data?.data?.data)
        // console.log('data in fetch', orderData);
        
      }
    })
  }
  useEffect(() => {
    fetchOrderData()
  }, [])
  
  // console.log(data,'data');
  
  const AddressCard = ({ title, address }) => (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="text-sm text-gray-500">
        <p className="flex items-center">
          <FaUser className="mr-2" /> {address.name}
        </p>
        <p className="flex items-center">
          <FaEnvelope className="mr-2" /> {address.email}
        </p>
        <p className="flex items-center">
          <FaPhone className="mr-2" /> {address.phone}
        </p>
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-2" /> {address.address}
        </p>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="flex mb-4 items-center gap-2 ml-2">
        <Link href={"/dashboard"}>Dashboard</Link>
        <MdOutlineKeyboardArrowRight />
        <Link href={"/dashboard/orders"}>Orders</Link>
        <MdOutlineKeyboardArrowRight />
        <span className="text-blue-500">View</span>
      </div>
      <OrderDetails fetchOrder={fetchOrderData} {...orderData} order={orderData}/>
    </div>
  );
};

export default OrderView;
