"use client";
import InformationTab from "@/components/Dashboard/Components/product/InformationTab ";
import ProductImages from "@/components/Dashboard/Components/product/ProductImages";
import VariationList from "@/components/Dashboard/Components/product/VariationList";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaImage, FaThLarge, FaEllipsisH } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProductOffer from "@/components/Dashboard/Components/product/ProductOffer";
import ShippingReturn from "@/components/Dashboard/Components/product/ShippingReturn";
import ProductSeo from "@/components/Dashboard/Components/product/ProductSeo";
import ProductVideos from "@/components/Dashboard/Components/product/ProductVideos";
import { axiosInstance } from "@/libs/axiosInstance";
import { useParams } from "next/navigation";

const DbProductDetails = () => {
  const [activeTab, setActiveTab] = useState("Information");
  const [product, setProduct] = useState()
  const params = useParams()
  console.log('params',params.slug[1]);
  
  const getProduct=async()=>{
    axiosInstance.get(`/products/${params.slug[1]}`).then((data)=>{
      // console.log('data', data);
      
      if(data?.data?.status){
        setProduct(data?.data?.data)
        // console.log('data ', data?.data?.data);
        
      }
    })

  }
  useEffect(() => {
    getProduct()
  }, [])
  // console.log(product);
  
  // const images = [
  //   "/1-preview.png",
  //   "/2-preview.png",
  //   "/3-preview.png",
  //   "/4-preview.png",
  //   // "https://via.placeholder.com/300x200?text=Image+5",
  // ];

  const tabs = [
    { name: "Information", icon: <FaInfoCircle /> },
    { name: "Images", icon: <FaImage /> },
    { name: "Variation", icon: <FaThLarge /> },
  ];
  const productInfo = {
    name: product?.name,
    sku: product?.sku,
    category: product?.category,
    brand: product?.brand,
    buyingPrice: product?.buyingPrice,
    maxPurchaseQuantity: product?.maxPurchaseQty,
    weight: product?.weight,
    canPurchase: product?.canPurchase ? "Yes" : "No",
    refundable: product?.refundable ? "Yes" : 'No',
    tags: product?.tags,
    barcode: product?.barcode,
    // tax: product?.tax,
    tax: ['vat-5' , 'vat-10'],
    sellingPrice: product?.sellingPrice,
    lowStockWarning: product?.lowStockQty,
    unit: product?.unit,
    showStockOut: product?.showStockOut ? 'Enable' : 'Disable',
    status: product?.status,
    description: product?.description ,
    // benefits:[
    // '- Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable.',
    // '- Twill fabric has a lightweight, smooth feel.',
    // '- A mid-depth, 6-panel design makes for easy styling.',
    // '- The Swoosh branded metal tri-glide lets you adjust your fit with ease.',

    // ],
  
    // details:[
    //   '- 100% polyester',
    //   '- A metal Swoosh ingot logo',
    //   '- An adjustable metal clamp closure with Embossed Swoosh',
    //   '- Hand-wash',
    //   '- Imported',
    // ],
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Information":
        return (
          <div className="p-4">
            <InformationTab  productInfo={productInfo} />
          </div>
        );
      case "Images":
        return (
          <div className="p-4">
            <ProductImages getProduct={getProduct} initialImages={product?.images} />
          </div>
        );
      case "Variation":
        return (
          <div className="p-4">
            <VariationList getProduct={getProduct} variationsData={product?.variations} />
          </div>
        );
      case "Offers":
        return (
          <div className="p-4">
            <ProductOffer offer={product?.offer}  />
          </div>
        );

      case "Videos":
        return (
          <div className="p-4">
            <ProductVideos ashraf={product?.videos} />
          </div>
        );
      case "Shipping & Return":
        return (
          <div className="p-4">
            <ShippingReturn shippingReturn={product.shippingReturn} />
          </div>
        );
      case "Seo":
        return (
          <div className="p-4">
            <ProductSeo seo={product.seo} getProduct={getProduct}/>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex mb-4 items-center gap-2">
        <Link href={"/dashboard"}>Dashboard</Link>
        <MdOutlineKeyboardArrowRight />
        <Link href={"/dashboard/products"}>Products</Link>
        <MdOutlineKeyboardArrowRight />
        <span className="text-blue-500">View</span>
      </div>
      <div className="flex md:flex-nowrap flex-wrap justify-between space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center justify-center w-full sm:w-1/4 px-4 py-2 mb-2 sm:mb-0 rounded-md ${
              activeTab === tab.name
                ? "bg-red-500 text-white"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            <span className="ml-2">{tab.name}</span>
          </button>
        ))}

        {/* More Dropdown */}
        <div className="relative group w-full sm:w-1/4">
          <button className="flex items-center w-full px-4 py-2 bg-white text-gray-500 border border-gray-200 rounded-md">
            <FaEllipsisH className="mr-2" /> More
          </button>
          <div className="absolute hidden group-hover:block bg-white border border-gray-200 rounded mt-0 w-full sm:w-44 z-10">
            <div
              onClick={() => setActiveTab("Offers")}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Offers
            </div>
            <div
              onClick={() => setActiveTab("Videos")}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Videos
            </div>
            <div
              onClick={() => setActiveTab("Shipping & Return")}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Shipping & Return
            </div>
            <div
              onClick={() => setActiveTab("Seo")}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Seo
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4 border border-gray-200 bg-white rounded p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default DbProductDetails;
