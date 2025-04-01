'use client'
import AddressFormCheckout from "@/components/AddressFormCheckout";
import { useState } from "react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState([
    {
      fullname: "Will Smith",
      email: "customer@example.com",
      phone: "+880 123333444",
      city: "Dhaka",
      state: "Dhaka",
      country: "Bangladesh",
      addressLine1: "House 30, Road 13, Block A, Mirpur 2, 1216",
    },
    {
      fullname: "Will Smith",
      email: "customer@example.com",
      phone: "+880 123333444",
      city: "Dhaka",
      state: "Dhaka",
      country: "Bangladesh",
      addressLine1: "House 30, Road 13, Block A, Dhanmondi 32, 1209",
    },
  ]);

  const [billingAddress, setBillingAddress] = useState([...shippingAddress]);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (values) => {
    console.log("Saved Address:", values);
  };
  const [orderSummary] = useState({
    subtotal: 60.0,
    tax: 12.0,
    shippingCharge: 10.0,
    discount: 0.0,
    total: 82.0,
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-orange-600 flex items-center">
          <FaCheckCircle className="mr-2 text-green-500" /> Provide Your Shipping Information
        </h2>
        <p className="text-gray-600 mb-4">Check Your Information Before You Continue</p>

        {/* Progress Bar */}
        <div className="flex items-center mb-6">
          <div className="flex-1 flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">1</div>
            <div className="flex-1 h-1 bg-green-500"></div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">2</div>
            <div className="flex-1 h-1 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">3</div>
          </div>
          <div className="flex justify-between text-sm mt-2 w-full">
            <span>Cart</span>
            <span>Checkout</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Delivery Option */}
        <div className="flex mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-l-lg flex items-center">
            <MdLocalShipping className="mr-2" /> Delivery
          </button>
          <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-r-lg">Pick Up</button>
        </div>

        {/* Address Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            {shippingAddress.map((address, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                <p>{address.fullname}</p>
                <p>{address.phone}</p>
                <p>{address.email}</p>
                <p>{address.city}, {address.state}</p>
                <p>{address.country}</p>
                <p>{address.addressLine1}</p>
              </div>
            ))}
            <button onClick={() => setShowForm(true)} className="text-red-500 flex items-center">
              <FaPlusCircle className="mr-2" /> Add New
            </button>
          </div>

          {/* Billing Address */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
            {billingAddress.map((address, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                <p>{address.fullname}</p>
                <p>{address.phone}</p>
                <p>{address.email}</p>
                <p>{address.city}, {address.state}</p>
                <p>{address.country}</p>
                <p>{address.addressLine1}</p>
              </div>
            ))}
            <button className="text-red-500 flex items-center">
              <FaPlusCircle className="mr-2" /> Add New
            </button>
          </div>
        </div>

        {/* Save as Billing Checkbox */}
        <div className="flex items-center mt-4">
          <input type="checkbox" id="saveAsBilling" className="mr-2" />
          <label htmlFor="saveAsBilling" className="text-gray-600">Save shipping address as billing address</label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg mb-2 md:mb-0">Back to Cart</button>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg">Save and Pay</button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${orderSummary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>${orderSummary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Charge</span>
          <span>${orderSummary.shippingCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount</span>
          <span>${orderSummary.discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${orderSummary.total.toFixed(2)}</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full">
          Apply Coupon Code
        </button>
      </div>
      {showForm && <AddressFormCheckout onClose={() => setShowForm(false)} onSave={handleSave} />}
    </div>
  );
};

export default Checkout;
