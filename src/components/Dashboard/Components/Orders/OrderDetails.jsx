import { axiosInstance } from "@/libs/axiosInstance";
import Link from "next/link";
import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const OrderDetails = ({
  from,
  _id,
  orderId,
  orderTime,
  paymentType,
  orderType,
  orderStatus,
  orderItems,
  shippingAddress,
  billingAddress,
  subtotal,
  tax,
  discount,
  shippingCharge,
  total,
  order,
  fetchOrder,
}) => {
  const acceptOrder = async () => {
    axiosInstance
      .put(`/orders/${_id}`, { orderStatus: "Accepted" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Order Accepted");
          fetchOrder();
        }
      });
  };
  const cancelOrder = async () => {
    axiosInstance
      .put(`/orders/${_id}`, { orderStatus: "Cancelled" })
      .then((data) => {
        if (data?.data?.status) {
          alert("Order Accepted");
          fetchOrder();
        }
      });
  };
  
  
  const changeOrderStatus = async (e) => {
    axiosInstance
      .put(`/orders/${_id}`, { orderStatus: e.target.value })
      .then((data) => {
        if (data?.data?.status) {
          alert("Order status Updated");
          fetchOrder();
        }
      });
  };
  const AddressCard = ({ title, address }) => (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="text-sm text-gray-500">
        <p className="flex items-center">
          <FaUser className="mr-2" /> {address?.fullname}
        </p>
        <p className="flex items-center">
          <FaEnvelope className="mr-2" /> {address?.email}
        </p>
        <p className="flex items-center">
          <FaPhone className="mr-2" /> {address?.phone}
        </p>
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-2" />
          {address?.city}, {address?.state}, {address?.zipcode},
          {address?.country}
        </p>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="p-4 rounded shadow-md bg-white">
        <div className="rounded-sm px-4 py-4 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
          {/* Order Details */}
          <div className="w-full md:w-auto ">
            <div className="">
              <h1 className="text-2xl font-semibold mb-3">Order ID: {orderId}</h1>
              <h2>
                <span className="ml-2 px-4 py-2 bg-green-100 text-green-500 rounded-full text-sm">
                  {orderStatus}
                </span>
                <span className="ml-2 px-4 py-2 bg-red-200 text-red-500 rounded-full text-sm">
                  Delivered
                </span>
              </h2>
            </div>

            <p className="text-sm text-gray-500 mt-1 flex items-center">
              <i className="fas fa-calendar-alt mr-2"></i>
              {order?.date}
            </p>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <i className="fas fa-credit-card mr-2"></i>
              Payment Type: {paymentType}
            </p>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <i className="fas fa-truck mr-2"></i>
              Order Type: {orderType}
            </p>
          </div>
          {/* Action Buttons */}
          {
           from !== "user" &&
          
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center w-full md:w-auto space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Print Invoice */}
            {
            orderStatus === "Pending" && <button onClick={cancelOrder} className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center">
              Reject
            </button>
            }
           
            {
            orderStatus === "Pending" && 
            <button
              onClick={acceptOrder}
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              Accept
            </button>
            }
            {
              orderStatus !== "Pending" && <div className="w-full sm:w-auto">
            <select name="orderStatus"
              onChange={changeOrderStatus}
                className="w-full sm:w-auto px-4 py-2  text-green-500 rounded-md border border-green-500 cursor-pointer"
                defaultValue="Delivered"
            >
                <option value="Delivered" className="text-green-500">
                Delivered
                </option>
                <option value="On the Way" className="text-blue-500">
                On the Way
                </option>
                <option value="Shipped" className="text-orange-500">
                Shipped
                </option>
               
            </select>
            </div>
            }

          </div>
          }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-2 ">
          <div className="col-span-2">
            <div className="bg-white p-4 rounded shadow-md mb-4">
              <h2 className="text-lg font-semibold mb-2">Order Details</h2>
              {order?.items?.map((item, index) => (
                <div className="flex items-center mb-2 ">
                  <img
                    src={item?.productImage}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-medium">{item?.productName}</p>
                    <p className="text-sm text-gray-500">SKU: {item?.sku}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item?.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" p-4 bg-white rounded shadow-md mb-4 md:ms-4">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <div className="text-sm text-gray-500">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>$ {subtotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (5%)</span>
                <span>$ {tax}</span>
              </p>
              <p className="flex justify-between">
                <span>Discount</span>
                <span>$ {discount}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Charges</span>
                <span>$ {shippingCharge}</span>
              </p>
              <hr className="my-2" />
              <p className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$ {total}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <AddressCard title="Shipping Address" address={shippingAddress} />
          <AddressCard title="Billing Address" address={billingAddress} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
// <div className="flex flex-col sm:flex-row items-start sm:items-center w-full md:w-auto space-y-2 sm:space-y-0 sm:space-x-4">
//             {/* Paid Dropdown */}
//             <div className="w-full sm:w-auto">
//             <select
//                 className="w-full sm:w-auto px-4 py-2  text-red-500 rounded-md border border-red-500 cursor-pointer"
//                 defaultValue="Paid"
//             >
//                 <option value="Paid" className="text-red-500">
//                 Paid
//                 </option>
//                 <option value="Unpaid" className="text-gray-500">
//                 Unpaid
//                 </option>
//             </select>
//             </div>

//             {/* Delivered Dropdown */}
//             <div className="w-full sm:w-auto">
//             <select
//                 className="w-full sm:w-auto px-4 py-2  text-green-500 rounded-md border border-green-500 cursor-pointer"
//                 defaultValue="Delivered"
//             >
//                 <option value="Delivered" className="text-green-500">
//                 Delivered
//                 </option>
//                 <option value="OnTheWay" className="text-orange-500">
//                 On the Way
//                 </option>
//                 <option value="Confirmed" className="text-blue-500">
//                 Confirmed
//                 </option>
//             </select>
//             </div>

//             {/* Print Invoice */}
//             <button className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-md flex items-center justify-center">
//             <i className="fas fa-print mr-2"></i> Print Invoice
//             </button>
//         </div>
//         </div>
