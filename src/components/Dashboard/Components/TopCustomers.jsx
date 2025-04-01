'use client'
import React from 'react'

const TopCustomers = ({topCustomersData}) => {
   console.log(topCustomersData);
   
  return (
    <>
   {
    topCustomersData?.map((item)=>(
        <div key={item?._id} className="w-full md:w-1/5 rounded-lg shadow text-center bg-gray-50">
        <div className="p-3">
          <img
            src={item?.image || "https://placehold.co/100x100"}
            alt="profile img"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <p className="text-sm">{item?.fullName}</p>
        </div>
        <p className="text-white px-4 py-1 rounded-b-xl bg-blue-500">{item?.totalOrders} Orders</p>
      </div>
   
    ))
   }
   </>
    
  )
}

export default TopCustomers