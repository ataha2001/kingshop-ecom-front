import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const ProductFilterForm = ({ onClose, onSearch, onClear }) => {
  return (
    <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-lg mt-4">
      <div className="grid grid-cols-4 gap-4">
        {/* First Row */}
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">SKU</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Buying Price</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Selling Price</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Second Row */}
        <div>
          <label className="block mb-1 text-sm font-medium">Category</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">--</option>
            <option value="Clothing">Clothing</option>
            <option value="Hats">Hats</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Brand</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">--</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Barcode</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Tax</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Third Row */}
        <div>
          <label className="block mb-1 text-sm font-medium">Unit</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">--</option>
            <option value="Piece">Piece</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Status</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">--</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Purchasable</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Show Stock Out</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={onSearch}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          <FaSearch className="inline-block mr-1" /> Search
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          <FaTimes className="inline-block mr-1" /> Clear
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductFilterForm;
