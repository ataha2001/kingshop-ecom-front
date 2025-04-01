"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart, FaLock, FaStar } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
// import { products } from "@/libs/productData";
import ProductTabs from "@/components/ProductTabs";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/libs/axiosInstance";
import { showToast } from "@/components/CustomToast";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [variationId, setVariationId] = useState("");

  const fetchProducts = async () => {
    axiosInstance.get(`/products`).then((data) => {
      if (data?.data?.status) {
        setProducts(data?.data?.data);
        // setSelectedImage(data?.data?.data?.images?.[0]?.url);
      }
    });
  };

  const fetchProduct = async () => {
    axiosInstance.get(`/products/${params?.slug}/byslug`).then((data) => {
      if (data?.data?.status) {
        setProduct(data?.data?.data);
        setSelectedImage(data?.data?.data?.images?.[0]?.url);
      }
    });
  };
  useEffect(() => {
    fetchProduct();
    fetchProducts()
  }, []);
  console.log(product);

  const [quantity, setQuantity] = useState(1);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleIncrease = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < 5 ? prevQuantity + 1 : prevQuantity
    );
  };

  const addToWishList = async () => {
    axiosInstance.post("/wishList", { product: product?._id }).then((data) => {
      console.log("status", data?.data?.status);

      if (data?.data?.status) {
        showToast("success", "Product Added to WishList....");
      } else {
        showToast(
          "error",
          "Somthing went wronge!!.. check your wishlist maybe product is thier.."
        );
      }
    });
  };

  // filter size based on selected color
  const sizeForSelectedColor = product?.variations
    ?.filter((item) => item?.color === selectedColor)
    ?.filter(
      (item, index, self) =>
        index === self.findIndex((v) => v?.size === item?.size)
    );

  const addToCart = async () => {
    if (variationId === "") {
      showToast("error", "Choose Size and Color..");
      return false;
    }
    axiosInstance
      .post("/cart", {
        productId: product?._id,
        variationId: variationId,
        quantity: quantity,
      })
      .then((data) => {
        if (data?.data?.status) {
          // alert('test')
          showToast("success", "Product Added to Cart....");
        } else {
          showToast("error", "Failed to add product to cart");
        }
      });
  };

  return (
    <div className="xl:container mx-auto px-2 xl:px-4 py-12">
      <div className="text-md flex items-center text-gray-500 mb-4">
        <Link href={"/products"}>Products</Link> <MdKeyboardArrowRight />
        {/*<Link href={"#"}>Clothing</Link> <MdKeyboardArrowRight />*/}
        <Link href={"#"}>{product?.name}</Link>
      </div>
      <div className="flex flex-col md:flex-row space-x-8">
        <div className="w-full md:w-1/2">
          <img
            src={selectedImage}
            className="mb-3 w-full h-[400px] aspect-square object-cover"
            alt="product image"
          />
          <Slider {...settings}>
            {product?.images?.map((item, index) => {
              return (
                <div
                  onClick={() => setSelectedImage(item?.url)}
                  key={item?.id}
                  className="w-1/4"
                >
                  <img
                    src={item?.url}
                    className="border-2 cursor-pointer"
                    alt={item?.id}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="md:w-full ">
          <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
          <p className="text-xl text-gray-700 mb-2">${product?.sellingPrice}</p>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
          </div>
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <span className="font-bold">Color:</span>
            {product?.variations
              ?.filter(
                (item, index, self) =>
                  index === self.findIndex((v) => v?.color === item?.color)
              )
              .map((item) => (
                <button
                  onClick={() => setSelectedColor(item?.color)}
                  key={item?._id}
                  className={`ms-2 px-3 py-2 text-md border rounded-full text-gray-700 ${
                    item?.color === selectedColor
                      ? "bg-[#ff4500] text-white"
                      : "bg-[#f7f7fc]"
                  } `}
                >
                  {item.color}
                </button>
              ))}
          </div>
          <div className="mb-4 ">
            {selectedColor && (
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <p className="font-bold">Available size for {selectedColor}:</p>
                {sizeForSelectedColor?.length > 0 ? (
                  sizeForSelectedColor.map((item, index) => (
                    <button
                      onClick={() => setVariationId(item?._id)}
                      key={index}
                      className={`ms-2 px-3 py-2 text-md border rounded-full text-gray-700  ${
                        variationId === item?._id
                          ? "bg-[#ff4500] text-white"
                          : "bg-[#f7f7fc]"
                      }  `}
                    >
                      {item?.size}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">No sizes available</p>
                )}
              </div>
            )}
          </div>
          <div className="mb-4">
            <span className="font-bold">Quantity:</span>
            <div className="inline-flex items-center ms-2">
              <button
                onClick={handleDecrease}
                className="bg-[#f7f7fc] px-2 py-0 border rounded-l"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center broder-t border-b"
              />
              <button
                onClick={handleIncrease}
                className="bg-[#f7f7fc] px-2 py-0 border rounded-r"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={addToCart}
              className="flex items-center text-white bg-[#94a3b8] px-4 py-2 border rounded-3xl "
            >
              <FaLock className="mr-2" />
              Add To Cart
            </button>
            <button
              onClick={addToWishList}
              className="flex items-center px-4 py-2 border rounded-3xl "
            >
              <FaHeart className="mr-2" />
              Favourite
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ProductTabs data={product} />
      </div>
      <div className="my-5">
        <h2 className="text-4xl bont-bold">Related Products</h2>
      </div>
      <ProductCard isWishListed={false} data={products} />
    </div>
  );
};

export default ProductDetail;
