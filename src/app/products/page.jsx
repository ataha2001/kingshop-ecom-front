'use client'
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { axiosInstance } from "@/libs/axiosInstance";
import { products } from "@/libs/productData";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState([])
  const params = useSearchParams()
  console.log('params',params.toString()?.split("=")?.[1]);
  
  const [filters, setFilters] = useState({subcategory:params.toString()?.split("=")?.[1]})
  useEffect(() => {
    setFilters({subcategory :params.toString()?.split("=")?.[1]})
  }, [params.toString()?.split("=")?.[1]])
  

  const fetchProducts=async()=>{
    axiosInstance.get('/products',{params:filters}).then((data)=>{
      if(data?.data?.status){
        setProducts(data?.data?.data)
      }
    })
  }

  const handleFilterChange= (newFilter)=>{
    setFilters(newFilter)
  }
  useEffect(() => {
    fetchProducts()
  }, [filters])
  // console.log('filters 1', filters);
  
  
  return (
    <div className="py-12 xl:container px-2 xl:px-4 mx-auto ">
      <div className="flex items-center space-x-3">
        <p>Home</p> <MdOutlineKeyboardArrowRight /> <p>Products </p>
      </div>
      <div className="flex items-center justify-between gap-3 mt-2">
      <div className="flex items-center gap-3">
      <h1 className="text-4xl font-bold mb-0">Expolore All Products</h1>
      <span className="text-xl ms-2">({products?.length} Products found)</span>
      </div>
      <div className="">
      <button onClick={()=> {setFilters({}); alert('test'); console.log(filters);
      fetchProducts()
      }} className="bg-[#ff4500] text-white p-3 rounded-md">Clear Filter</button>
      </div>
      </div>
      <div className="mt-8">
        <div className="flex space-x-3">
          <div className="w-1/4">
          <ProductFilter filters={filters} onFilterChange={handleFilterChange}/>
          </div>
          <div className="w-full">
          <ProductCard isWishListed={false} data={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
