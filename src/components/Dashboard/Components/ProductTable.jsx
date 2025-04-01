"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbFileTypeXls, TbFilter, TbPackageExport, TbPackageImport, TbPrinter } from "react-icons/tb";
import ProductFilterForm from "./ProductFilterForm";
import ProductAddForm from "./product/ProductAddForm";

const ProductTable = ({ products, btnAction, headers }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilter, setShowFilter] = useState(false);
  

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts]; // Add sorting logic if needed

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#f76411]">Products</h2>
        <div className="flex items-center gap-2 text-[#f76411]">
          {/* Rows Per Page Dropdown */}
          <div className="flex items-center">
            {/*<label htmlFor="rowsPerPage" className="mr-2 text-sm font-medium">
              Rows per page:
            </label>*/}
            <select
              id="rowsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Filter */}

          <div className="relative group  text-[#f76411]">
            <button onClick={() => setShowFilter(!showFilter)} className="flex items-center space-x-2 text- cursor-pointer border rounded-lg p-1.5">
              <TbPackageExport />
              <span className="font-normal">Filter</span>
              <MdOutlineKeyboardArrowDown className="text-xl ms-3" />
            </button>
            
          </div>


          {/* Export Dropdown */}
          <div className="relative group  text-[#f76411]">
            <div className="flex items-center space-x-2 text- cursor-pointer border rounded-lg p-1.5">
              <TbPackageExport />
              <span className="font-normal">Export</span>
              <MdOutlineKeyboardArrowDown className="text-xl ms-3" />
            </div>
            <div className="absolute top-10 lef-[16px] w-36 bg-white border rounded-lg shadow-lg hidden group-hover:block ">
              <button className="flex font-semibold items-center space-x-3 p-2 hover:bg-gray-100 w-full">
              <TbFilter />
                <span className="font-semibold">Print</span>
              </button>

              <button className="flex font-semibold items-center space-x-3  p-2 hover:bg-gray-100 w-full">
                <TbFileTypeXls />
                <span className="font-semibold">XLS</span>
              </button>
            </div>
          </div>

          {/* Import Dropdown */}
          <div className="relative group  text-[#f76411]">
            <div className="flex items-center space-x-2 text- cursor-pointer border rounded-lg p-1.5">
              <TbPackageImport />
              <span className="font-normal">Import</span>
              <MdOutlineKeyboardArrowDown className="text-xl ms-3" />
            </div>
            <div className="absolute top-10 lef-[16px] w-36 bg-white border rounded-lg shadow-lg hidden group-hover:block ">
              <button className="flex font-semibold items-center space-x-3 p-2 hover:bg-gray-100 w-full">
                <TbPrinter />
                <span className="font-semibold">Sample File</span>
              </button>

              <button className="flex font-semibold items-center space-x-3  p-2 hover:bg-gray-100 w-full">
                <TbFileTypeXls />
                <span className="font-semibold">Upload File</span>
              </button>
            </div>
          </div>




          {/* Add Product Button */}
          <button
            onClick={btnAction}
            className="px-3 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Product
          </button>
        </div>
      </div>
       
      {/* Drawer */}
      {/*<ProductAddForm
      isOpen={showAddProduct}
      onClose={() => setShowAddProduct(false)}
    />*/}
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        value={search}
        onChange={handleSearch}
      />

       {/* Filter Form */}
      
        <div
        className={`transition-all duration-1000 ease-in-out transform  ${
          showFilter ? "max-h-[1000px] opacity-100 " : "max-h-0 opacity-0 "
        } overflow-hidden`}
      >
        <ProductFilterForm
          onClose={() => setShowFilter(false)}
          onSearch={() => alert("Searching...")}
          onClear={() => alert("Clearing...")}
        />
        </div>
     
      {/* Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
          {headers.map((header) => (
            <th
              key={header.key}
              className={`p-2 border border-gray-300 ${header.className || ""}`}
            >
              {header.label}
            </th>
          ))}
          
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product, index) => (
            <tr key={index} 
            // className="text-center hover:bg-orange-100"
            className={`${index%2 === 0 ? 'bg-white':'bg-[#f9fafb]'} hover:bg-gray-300 hover:text-gray-50`}
            >
              <td className="p-2 border border-gray-300">{product.name}</td>
              <td className="p-2 border border-gray-300">{product.category}</td>
              <td className="p-2 border border-gray-300">
                {product.buying_price}
              </td>
              <td className="p-2 border border-gray-300">
                {product.selling_price}
              </td>
              <td className="p-2 border border-gray-300">
                <span
                  className={`px-2 py-1 rounded-lg ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="p-2 border border-gray-300 text-center">
                <div className="flex justify-center gap-2">
                  <Link href={`/dashboard/products/view/${1}`} className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </Link>
                  <Link href={`/edit/${1}`} className="text-green-500 hover:text-green-700">
                    <FaEdit />
                  </Link>
                  <Link href={`/delete/${1}`} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {currentPage * itemsPerPage - itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 border rounded-lg hover:bg-gray-200"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 border rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-2 py-1 border rounded-lg hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
