"use client";

import DynamicTable from "@/components/Dashboard/Components/DynamicTable";
import ProductAddForm from "@/components/Dashboard/Components/product/ProductAddForm";
import ProductTable from "@/components/Dashboard/Components/ProductTable";
import { axiosInstance } from "@/libs/axiosInstance";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const DbProducts = () => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchProducts = async()=>{
    await axiosInstance.get("/products").then((data)=>{
      if(data.data.status){
        setProducts(data.data.data);
      }
    })
  }
  useEffect(() => {
    fetchProducts()
  
  }, [])
  
  
  const headers = [
    { key: "name", label: "Name", width: "200" },
    { key: "category", label: "Category", width: "200" },
    { key: "buyingPrice", label: "Buying Price", width: "200" },
    { key: "sellingPrice", label: "Selling Price", width: "200" },
    { key: "status", label: "Status", width: "200" },
    { key: "action", label: "Action", width: "200" },
  ];
  const deleteProduct = async(indexId) =>{
    axiosInstance.delete(`/products/${indexId}`).then((data)=>{
      if(data?.data?.status){
        alert('Product deleted .....')
        fetchProducts()

      }
    })
  }
  const editProduct = async(indexId) =>{
    // alert(indexId)
    axiosInstance.get(`/products/${indexId}`).then((data)=>{
      // alert(data?.data?.status)
      if(data?.data?.status){
        setProduct(data?.data?.data)
        setIsDrawerOpen(true)
        
      }
    })
    // fetchProducts()
  }
  const Action = ({indexId}) => {
    
    return (
      <div className="flex space-x-2">
        <Link 
        href={`/dashboard/products/view/${indexId}`}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-md">
            <FaEdit className="text-blue-500" />
          </div>
        </Link>

        <Link 
        // href={`/dashboard/products/edit/${indexId}`}
        href={""}
        onClick={()=> editProduct(indexId)}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-green-100">
            <FaEdit className="text-green-500" />
          </div>
        </Link>

        <Link 
        // href={`/dashboard/products/delete/${indexId}`}
        href={""}
        onClick={()=> deleteProduct(indexId)}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-green-100">
            <FaTrash className="text-red-500" />
          </div>
        </Link>
      </div>
    );
  };
  const data = products?.map((item,index)=>{
    
    return {
      id:index+1,
      name: item?.name,
      category: item?.category,
      buyingPrice: item?.buyingPrice,
      sellingPrice: item?.sellingPrice,
      status: item?.status,
      action: <Action  indexId={item?._id} />,
    }
})

  return (
    <div>
      <h2 className="text-lg font-semibold  ms-4 mb-4">Dashboard / Products</h2>
      {/*<DynamicTable btnAction={()=> setIsDrawerOpen(!isDrawerOpen)} 
      products={products} headers={headers}/>*/}
      <DynamicTable
        isBtnNeeded={true}
        btnAction={() => {setIsDrawerOpen(!isDrawerOpen); setProduct([])}}
        title="Products"
        
        data={data}
        headers={headers}
      />
      <ProductAddForm
        isOpen={isDrawerOpen}
        data={product}
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

export default DbProducts;
