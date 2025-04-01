import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const ActionDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left group">
      <button
        //   className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        className="rounded-full p-2 bg-red-500 text-white"
        onClick={() => setOpen(!open)}
      
      >
        <FaEllipsisH className="" />
      </button>
      
        <div className="group-hover:block  hidden z-10 origin-top-right absolute right-4 mt-0 w-35 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button className="block px-4 py-2 text-sm text-gray-700 border-b hover:bg-gray-100 hover:w-full hover:text-start">
              View 
            </button>
            <p className="divide-solid" />
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Delete
            </button>
          </div>
        </div>
      
    </div>
  );
};

const AddressCard = ( {
  fullName,
     city,
     country,
     email,
     phone,
     state,
     streetAddress,
//   _id
}) => {
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between">
      <div className=" justify-between items-start">
        <div>
          <h2 className="font-semibold">{fullName}</h2>
          <p>{email}</p>
          <p>{phone}</p>
          <p>{city} , {state}, {country}</p>
          <p>{streetAddress}</p>
        </div>
        <div className="text-gray-500">
          <i className="fas fa-ellipsis-h"></i>
        </div>
      </div>
      <div className="rigth-2">
        <ActionDropdown />
      </div>
    </div>
  );
};

export default AddressCard;
