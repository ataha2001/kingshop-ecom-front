"use client";
import CustomerStats from "@/components/Dashboard/Components/CustomerStats";
import OrderChart from "@/components/Dashboard/Components/OrderChart";
import OverviewCard from "@/components/Dashboard/Components/OrderStateCard";
import SalesChart from "@/components/Dashboard/Components/SalesChart";
import Spinner from "@/components/Dashboard/Components/Spinner";
import StatisticCard from "@/components/Dashboard/Components/StateCard";
import TopCustomers from "@/components/Dashboard/Components/TopCustomers";
import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/libs/axiosInstance";
// import { products } from "@/libs/productData";
import React, { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaBox,
  FaUsers,
  FaBoxes,
  FaClock,
  FaCheck,
  FaTruck,
  FaShippingFast,
  FaTimes,
  FaUndo,
  FaBan,
} from "react-icons/fa";


// import OverviewCard from "./OverviewCard";
// import StatisticCard from "./StatisticCard";

const Dashboard = () => {
  const [dbMetrics, setDbMetrics] = useState(null)
  const [orderState, setOrderState] = useState(null)
  const [products, setProducts] = useState([])
  const [resetData, setResetData] = useState(null)
  const fetchDbMetrics =  async ()=>{
    await axiosInstance.get('/dashboard/metrics').then((data)=>{
      if(data?.data?.status){
        setDbMetrics(data?.data?.data)
        
      }
    })
    axiosInstance.get('/dashboard/order-stats').then((data)=>{
      if(data?.data?.status){
        setOrderState(data?.data?.data)
      }
    })
    axiosInstance.get('/dashboard/summary').then((data)=>{
      if(data?.data?.status){
        setResetData(data?.data?.data)
      }
    })
    axiosInstance.get('products').then((data)=>{
      if(data?.data?.status){
        setProducts(data?.data?.data)
      }
    })
  }
  useEffect(() => {
    fetchDbMetrics()
  }, [])
  
  const overviewData = [
    {
      icon: <FaDollarSign />,
      color: "pink",
      title: "Total Earnings",
      value: dbMetrics?.totalEarning?.[0]?.totalEarning || <Spinner size={12} color="fill-blue-500" />,
      value: dbMetrics
      ? dbMetrics?.totalEarning?.[0]?.totalEarning ?? 0
      : <Spinner size={12} color="fill-blue-500" />
    },
    { icon: <FaBox />, color: "red", title: "Total Orders",
      //  value: dbMetrics?.totalOrders || <Spinner size={12} color="fill-blue-500" />,
       value: dbMetrics
      ? dbMetrics.totalOrders ?? 0
      : <Spinner size={12} color="fill-red-500" />
      },
    {
      icon: <FaUsers />,
      color: "purple",
      title: "Total Customers",
      // value: dbMetrics?.totalCustomer || <Spinner size={12} color="fill-red-500" />,
      value: dbMetrics
      ? dbMetrics.totalCustomer ?? 0
      : <Spinner size={12} color="fill-red-500" />
      
    },
    { icon: <FaBoxes />, color: "blue", title: "Total Products", 
      // value: dbMetrics?.totalProducts || <Spinner size={12} color="fill-red-500" />,
      value: dbMetrics
      ? dbMetrics.totalProducts ?? 0
      : <Spinner size={12} color="fill-red-500" />
    }
  ];

  const statisticsData = [
    { icon: <FaBox />, color: "orange", title: "Total Orders", 
        value: dbMetrics
              ? dbMetrics.totalOrders ?? 0
              : <Spinner size={12} color="fill-red-500" />
      },
    { icon: <FaClock />, color: "yellow", title: "Pending", 
        value: orderState
              ? orderState.find(item => item?._id === "Pending")?.count ?? 0
              : <Spinner size={12} color="fill-red-500" />,   
    },    
    { icon: <FaCheck />, color: "green", title: "Confirmed", 
        value: orderState
              ? orderState.find(item => item?._id === "Confirmed")?.count ?? 0
              : <Spinner size={12} color="fill-red-500" />,  
    },    
    { icon: <FaTruck />, color: "blue", title: "Ongoing", 
        value: orderState
              ? orderState.find(item => item?._id === "Ongoing")?.count ?? 0
              : <Spinner size={12} color="fill-red-500" />, 
    },    
    {
      icon: <FaShippingFast />,
      color: "indigo",
      title: "Delivered",
      value: orderState
              ? orderState.find(item => item?._id === "Deliverd")?.count ?? 0
              : <Spinner size={12} color="fill-red-500" />,
    },
    { icon: <FaTimes />, color: "red", title: "Canceled", 
      value: orderState
              ? orderState.find(item => item?._id === "Canceled")?.count ?? 0
              : <Spinner size={12} color="fill-red-500" />,
    },
    { icon: <FaUndo />, color: "purple", title: "Returned", 
      value: orderState
              ? orderState.find(item => item?._id === "Returned")?.count ?? 0
              : <Spinner size={12} color="fill-red-500" />,
    },
    { icon: <FaBan />, color: "pink", title: "Rejected", 
      value: orderState
              ? orderState.find(item => item?._id === "Rejected")?.count ?? 0
              : <Spinner size={12} color="fill-red-500" />, 
    },
  ];

  const topCustomersData = [
    {
      name: "Ashraf Taha",
      image: "https://placehold.co/100x100",
      orders: 3,
    },
    {
      name: "Rehab Ashraf",
      image: "/topCustomer-thumb1.jpg",
      orders: 50,
    },
    {
      name: "Ayaa Ashraf",
      image: "https://placehold.co/100x100",
      orders: 7,
    },
    {
      name: "Amal Ashraf",
      image: "/topCustomer-thumb1.jpg",
      orders: 3,
    },
    {
      name: "Zain Ashraf",
      image: "https://placehold.co/100x100",
      orders: 0,
    },
  ];


  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-500 ">Good Morning!</h1>
      <p className="text-md text-black ">Admin</p>

      <div className="mt-4">
        {/* Overview Section */}
        <div className="mb-6 ">
          <h2 className="text-md font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewData.map((item, index) => (
              <OverviewCard
                key={index}
                icon={item.icon}
                color={item.color}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>
        </div>

        {/* Order Statistics Section */}
        <div>
          <h2 className="text-md font-bold mb-4">Order Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statisticsData.map((item, index) => (
              <StatisticCard
                key={index}
                icon={item.icon}
                color={item.color}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-between gap-4 ">
        <div className="w-full md:w-[50%] rounded-md shadow bg-white">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold ">Sales Summary</h3>
          </div>
          <div className="w-full mt-3 flex items-center justify-center p-4">
            <SalesChart data={resetData?.salesSummary}/>
          </div>
        </div>
        <div className="w-full md:w-[50%] rounded-md shadow bg-white">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold ">Order Summary</h3>
          </div>
          <div className="mt-3 flex items-center justify-center p-4 w-full h-[80%]">
            <OrderChart OrderData={resetData?.orderSummary}/>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-[50%] rounded-md shadow bg-white">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold ">Customer Stats</h3>
          </div>
          <div className="mt-3 flex items-center justify-center p-4">
            <CustomerStats data={resetData?.customerActivity} />
          </div>
        </div>
        <div className="w-full md:w-[50%] rounded-md shadow bg-white">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold ">Top Customers</h3>
          </div>
          <div className="mt-3 w-full h-[80%]">
            <div className="flex flex-wrap gap-4 p-4 justify-center">
              <TopCustomers topCustomersData={resetData?.topCustomers} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <div className="w-full rounded-md shadow bg-white">
          <div className="shadow-md p-4 flex justify-between items-center">
            <h3 className="font-bold ">Top Products</h3>
          </div>
          <div className="mt-3 flex items-center justify-center p-4">
            <div className="mt-5 pb-4">
              <ProductCard isWishListed={false} data={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
