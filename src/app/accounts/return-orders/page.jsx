'use client'
import AccountSideBar from '@/components/AccountSideBar';
import React, { useState } from 'react'
import { FaChevronDown, FaEllipsisH } from 'react-icons/fa';

const orders = [
    { id: 1, products: "Product A, Product B", status: "Shipped", payment: "Paid", amount: "$120" },
    { id: 2, products: "Product C", status: "Processing", payment: "Pending", amount: "$80" },
  ];
  

const ActionDropdown = () => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="relative inline-block text-left">
        <button
        //   className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          className="rounded-full p-2 bg-red-500 text-white"
          onClick={() => setOpen(!open)}
        >
        
          <FaEllipsisH className=""/>
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
  

const ReturnOrders = () => {
    return (
       
          
          <main className="w-full px-4 pb-6">
            <h1 className="text-2xl font-bold text-orange-500 mb-6">Return Orders</h1>
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
                      <tr key={order.id} className="border-b">
                        <td className="py-4">{order.id}</td>
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
            </div>
          </main>
       
      );
}

export default ReturnOrders