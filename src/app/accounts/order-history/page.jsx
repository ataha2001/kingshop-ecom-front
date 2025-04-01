"use client";
import AccountSideBar from "@/components/AccountSideBar";
import { axiosInstance } from "@/libs/axiosInstance";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaEllipsisH } from "react-icons/fa";

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

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    axiosInstance.get("/orders").then((data) => {
      if (data?.data?.status) {
        setOrders(data?.data?.data);
      }
    });
  };
  useEffect(() => {
    fetchOrders();
  }, []);
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
      <h1 className="text-2xl font-bold text-orange-500 mb-6">Order History</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-4">Order ID</th>
              <th className="pb-4">Products</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Payment Type</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
  {orders?.length > 0 ? (
    orders?.map((order) => (
      <tr key={order.id} className="border-b">
        <td className="py-4">{order?.orderId}</td>
        <td className="py-4">{order?.items?.length} Product</td>
        <td>
          <span
            className={`py-2 px-4 text-center font-semibold rounded-lg 
              ${order?.orderStatus === "pending" ? "bg-yellow-100 text-yellow-600" : ""}
              ${order?.orderStatus === "on the way" ? "bg-blue-100 text-blue-600" : ""}
              ${order?.orderStatus === "Delivered" ? "bg-green-100 text-green-600" : ""}
              ${order?.orderStatus === "Cancelled" ? "bg-red-100 text-red-600" : ""}
            `}
          >
            {order?.orderStatus}
          </span>
        </td>
        <td className="py-4">
          <span
            className={`py-2 px-4 text-center font-semibold rounded-lg 
              ${order?.paymentType === "Paid" ? "bg-yellow-100 text-yellow-600" : ""}
              ${order?.paymentType === "Card" ? "bg-blue-100 text-blue-600" : ""}
              ${order?.paymentType === "Unpaid" ? "bg-green-100 text-green-600" : ""}
            `}
          >
            {order?.paymentType}
          </span>
        </td>
        <td className="py-4">$ {order?.total}</td>
        <td className="py-4">
          <ActionDropdown cancelOrder={cancelOrder} order={order} />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center py-4">
        No orders found.
      </td>
    </tr>
  )}
</tbody>
{/* Footer row for displaying count */}
<tfoot>
  <tr>
    <td colSpan="6" className="text-start py-4 text-gray-500">
      Showing {orders.length > 0 ? `1 to ${orders.length} of ${orders.length} results` : "0 to 0 of 0 results"}
    </td>
  </tr>
</tfoot>
        </table>
      </div>
    </main>
  );
};

export default OrderHistory;
