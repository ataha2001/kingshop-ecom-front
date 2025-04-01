import React, { useState } from "react";
import { FaInfoCircle, FaStar, FaTruck, FaVideo } from "react-icons/fa";

const ProductTabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Details");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="border rounded-b-3xl rounded-t-3xl">
      <div className="flex tabs-container mb-4 p-4 overflow-x-auto flex-nowrap">
        {[
          { name: "Details", icon: <FaInfoCircle className="mr-2" /> },
          { name: "Videos", icon: <FaVideo className="mr-2" /> },
          { name: "Reviews", icon: <FaStar className="mr-2" /> },
          { name: "Shipping & Returns", icon: <FaTruck className="mr-2" /> },
        ].map((tab) => (
          <div
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={`${
              activeTab === tab.name
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } tab px-4 py-2 border rounded-3xl mr-2 cursor-pointer whitespace-nowrap flex items-center space-x-2`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </div>
        ))}
      </div>
      <div className="tab-content border p-6 rounded-b-3xl">
        {activeTab === "Details" && (
          <div
          // className="bg-white p-8 max-w-4xl mx-auto"
          >
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
              Product Details
            </h2>
            <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
          </div>
        )}

        {activeTab === "Videos" && (
          <div>
            <h2 className="text-xl md:text-4xl bont-bold p-8">
              Product Videos
            </h2>
            <div className=
            // "grid grid-cols-4 gap-3"
            "flex flex-wrap gap-3"
            >
              { data?.videos?.length ? data?.videos.map((item, index)=>{
                return <div key={index} className="">
                  <iframe style={{width:"100%", height:"300px"}} src={item?.link} frameborder="0"></iframe>
                </div>}
              ) : 
              <img className="block mx-auto" src="/no-video.jpg" alt="no video" />
            }
            </div>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div>
            <h2 className="text-xl md:text-4xl bont-bold p-8">
              Product Reviews
            </h2>
            <div className="my-2 flex items-center p-8 ml-8">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
            </div>
          </div>
        )}

        {activeTab === "Shipping & Returns" && (
          <div>
            <h2 className="text-xl md:text-4xl bont-bold p-4 md:p-8">
              Product Shipping & Returns
            </h2>
            <div dangerouslySetInnerHTML={{ __html: data?.shippingReturn?.shippingAndReturnPolicy }}>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
