import Link from "next/link";
import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";

// const product = {
//   image: "",
//   title: "",
//   price: "",
//   oreginalPrice: "",
// };
// const productProps = {
//   data: [],
//   isWishListed: boolean,
// };
const ProductCard = ({ data, isWishListed, wishlistClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.map((item, index) => (
        <Link
          className="bg-white rounded-lg shadow-md p-2"
          key={index}
          href={`/products/${item?.slug}`}
        >
          <div className="w-full">
            <div className="relative ">
              <span className="absolute top-3 left-3 z-10 bg-blue-900 text-white text-sm font-bold px-2 py-1 rounded-full">
                Flash Sale
              </span>
              <FaHeart
                onClick={(e) => {
                  e.preventDefault(); // Prevent Link navigation
                  e.stopPropagation(); // Stop event from bubbling up
                  wishlistClick(item?._id); // Call your wishlist function
                }}
                className={`absolute top-4 right-4 bg-white p-[10px] rounded-full z-10 ${
                  isWishListed ? "!text-[#ff4800]" : "text-gray-300"
                }`}
                size={34}
              />
              <div className="overflow-hidden">
                <img
                  className="rounded-md w-full transform scale-95 hover:scale-100 transition duration-500 ease-in-out"
                  src={item?.images?.[0]?.url}
                  alt={item?.name}
                />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item?.name}</h2>
              <div className="my-2 flex items-center">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-black">
                  ${item?.sellingPrice}
                </span>
                <span className=" text-red-500 line-through ms-2">
                  ${item?.buyingPrice}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
