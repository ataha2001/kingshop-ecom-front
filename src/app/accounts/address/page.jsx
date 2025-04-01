'use client'
import React, { useEffect, useState } from "react";
import AddressCard from "../../../components/AddressCard";
import AddressForm from "@/components/AddressForm";
import { axiosInstance } from "@/libs/axiosInstance";
import { FaEdit } from "react-icons/fa";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddAddress = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
  };

  const getAddress = async () => {
    try {
      const response = await axiosInstance.get('/user');
      if (response?.data?.status) {
        const fetchedAddresses = [response?.data?.user?.billingAddress];
        setAddresses( fetchedAddresses);
        
        
        // if (Array.isArray(fetchedAddresses)) {
        //   setAddresses(fetchedAddresses);
        // } else {
        //   setAddresses([]); // Ensure it's always an array
        // }

        console.log('Fetched addresses:', fetchedAddresses);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddresses([]); // Reset in case of an error
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-500 mb-6">Addresses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses?.length > 0 ? (
          addresses?.map((address, index) => (
            <AddressCard key={index} {...address}  />
          ))
        ) : (
          <p className="text-gray-500">No addresses found.</p>
        )}
        <div
          className="bg-green-100 p-4 rounded-lg shadow-md flex justify-center items-center cursor-pointer hover:bg-green-200 transition"
          onClick={() => setIsPopupOpen(true)}
        >
        <FaEdit className="text-green-500 font-semibold mr-2"/>
          <span className="text-green-500 font-semibold">Update Address</span>
        </div>
      </div>
      {isPopupOpen && <AddressForm data={addresses} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default AddressList;
