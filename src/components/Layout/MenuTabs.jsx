import { axiosInstance } from "@/libs/axiosInstance";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// 'Men' 'Women'     'Juniors'

const tabData = {
  Men: {
    image: "/men-cover.png",
    clothing: ["Hoodies & SweatShirts"],
    shoes: ["Basket Ball"],
    accessories: ["Bags & Backpacks", "Hat & Beanies", "Socks"],
  },
  Women: {
    image: "/women-cover.png",
    clothing: [
      "Dresses & Skirts",
      "Hoodies & Sweatshirts",
      "Pants",
      "Tights & Leggings",
      "Tops & T-shirts",
    ],
    shoes: ["Running", "Sneakers", "Training & Gym"],
    accessories: ["Bags & Backpacks", "Hat & Beanies", "Socks"],
  },
  Juniors: {
    image: "/juniors-cover.png",
    clothing: ["T-Shirts"],
    shoes: ["Sneakers"],
    accessories: ["Hats"],
  },
};
const MenuTabs = () => {

  const [category, setCategory] = useState([])
  const fetchCategories = async()=>{
    axiosInstance.get('/category').then((data)=>{
      if(data?.data?.status){
        setCategory(data?.data?.data)
      }
    })
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  // console.log(category);
  
  const [activeTab, setactiveTab] = useState("Men");
  const renderContent = () => {
    const data = tabData[activeTab];
    return (
      <div className="flex justify-between py-3 w-full">
        <div className="flex justify-between space-x-8 p-4 w-full">
          <div className="w-1/2">
            <img
              src={data?.image}
              alt="Category"
              className="rounded-lg w-full object-fill h-[300px]"
            />
          </div>
          <div className="flex justify-between space-x-8 w-full">
          <ul className="gap-2 flex flex-row w-full flex-warp justify-start ">
          {category?.filter(item => item?.category === activeTab)?.map((item, index) => {
            return <li key={index} className="w-1/3 block">
              <Link href={`/products?category=${item?.subcategory}`}>
                {item?.subcategory}
              </Link>
            </li>
              })
            }
        </ul>
            {/* <div className="w-1/3">
              <h2 className="font-bold mb-4 ">Clothing</h2>
              <ul className="space-y-2">
                {data?.clothing?.map((item, index) => (
                  <li key={index} className="">
                    <Link href={`/products?category=${item?.toLowerCase()}`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/3">
              <h2 className="font-bold mb-4 ">Shoes</h2>
              <ul className="space-y-2">
                {data?.shoes?.map((item, index) => (
                  <li key={index} className="">
                    <Link className="text-md" href={`/products?category=${item?.toLowerCase()}`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/3">
              <h2 className="font-bold mb-4 ">Accessories</h2>
              <ul className="space-y-2">
                {data?.accessories?.map((item, index) => (
                  <li key={index} className="">
                    <Link href={`/products?category=${item?.toLowerCase()}`}>
                      {item?.category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <nav className="flex justify-center space-x-8 py-4 border-b">
        {["Men", "Women", "Juniors"].map((tab) => (
          <button
            key={tab}
            onClick={() => setactiveTab(tab)}
            className={`text-black text-md font-bold ${
              activeTab === tab
                ? "text-orange-500 border-b-2 border-orange-500"
                : ""
            } `}
          >
            {tab}
          </button>
        ))}
      </nav>
      {renderContent()}
    </div>
  );
};

export default MenuTabs;
