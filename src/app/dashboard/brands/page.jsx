"use client";
import BrandForm from "@/components/Dashboard/Components/Brand/BrandForm";
import DynamicTable from "@/components/Dashboard/Components/DynamicTable";
import { axiosInstance } from "@/libs/axiosInstance";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash, FaTrashAlt } from "react-icons/fa";

const ProductBrands = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brandData, setBrandData] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const fetchBrands = async () => {
    await axiosInstance.get("/brand").then((data) => {
      if (data?.data?.status) {
        setBrands(data?.data?.data);
      }
    });
  };
  useEffect(() => {
    fetchBrands();
    console.log("brands", brands);
  }, []);

  const headers = [
    // {key:'name', label:'Id', width:'200'},
    { key: "name", label: "Brand", width: "200" },

    { key: "status", label: "Status", width: "200" },
    { key: "action", label: "Action", width: "200" },
  ];

  const handleDelete = async (id) => {
    axiosInstance.delete(`/brand/${id}`).then((data) => {
      if (data?.data?.status) {
        // alert('')
        fetchBrands();
      }
    });
  };
  const handleEdit = async (id) => {
    setIsEdit(true);
    setIsDrawerOpen(true);
    axiosInstance.get(`/brand/${id}`).then((data) => {
      if (data?.data?.status) {
        setBrandData(data?.data?.data);
        setIsDrawerOpen(true);
      }
    });
  };
  const data = brands?.map((item, index) => {
    return {
      id: index + 1,
      name: item?.name,
      discription: item?.discription,
      status: item?.status,
      action: (
        <div className="flex space-x-2">
          <Link href={""} onClick={() => handleEdit(item?._id)}>
            <div className="flex items-center justify-center w-8 h-8 bg-green-100">
              <FaEdit className="text-green-500" />
            </div>
          </Link>

          <Link href={""} onClick={() => handleDelete(item?._id)}>
            <div className="flex items-center justify-center w-8 h-8 bg-green-100">
              <FaTrash className="text-red-500" />
            </div>
          </Link>
        </div>
      ),
    };
  });

  const handleCloseClick=()=>{
    setIsEdit(false)
    setBrandData('')
    setIsDrawerOpen(false)
    }

  return (
    <div>
      <h2 className="text-lg font-semibold  ms-4 mb-4">Brands</h2>
      <DynamicTable
        isBtnNeeded={true}
        btnAction={() => setIsDrawerOpen(!isDrawerOpen)}
        title="Brands"
        data={data}
        headers={headers}
      />

      <BrandForm
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        data={brandData}
        fetchBrands={fetchBrands}
        isDrawerOpen={isDrawerOpen}
        // onClose={() => setIsDrawerOpen(!isDrawerOpen)}
        onClose={handleCloseClick}
      />
    </div>
  );
};

export default ProductBrands;
