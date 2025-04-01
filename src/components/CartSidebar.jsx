import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";
import { axiosInstance } from "@/libs/axiosInstance";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const CartSidebar = ({ isOpen, setIsOpen }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter()

  const fetchCart = async () => {
    axiosInstance.get("cart").then((data) => {
      if (data?.data?.status) {
        setCart(data?.data?.data);
      }
    });
  };
  useEffect(() => {
    fetchCart();
  }, [isOpen]);

  const updateQuantity = async (variationId, productId, quantity) => {
    try {
      axiosInstance
        .put("/cart", { variationId, productId, quantity })
        .then((data) => {
          if (data?.data?.status) {
            alert(quantity);
            fetchCart();
          }
        });
    } catch (error) {
      console.log("Failed to update cart quantity");
    }
  };

  const handleIncrement = (variationId, productId, currentQuantity) => {
    updateQuantity(variationId, productId, currentQuantity + 1);
  };

  const handleDecrement = (variationId, productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(variationId, productId, currentQuantity - 1);
      // setCart(data?.data?.data)
    }
  };

  const handleDeleteProduct = async ( variationId, productId)=>{
    try {
      axiosInstance
      .delete(`/cart/${productId}/${variationId}`).then((data) => {
        if (data?.data?.status) {
          // alert(quantity);
          fetchCart();
        }
      });

        
      
  } catch (error) {
    console.log("Failed to update cart quantity");
    }
  }

  const clearCart = async()=>{
    try {
      axiosInstance
      .delete("/cart").then((data) => {
        if (data?.data?.status) {
          // alert(quantity);
          fetchCart();
        }
      });

        
      
  } catch (error) {
    console.log("Failed to update cart quantity");
    }
  }
  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 ${
        isOpen ? "block translate-x-100" : "hidden translate-x-0"
      }`}
    >
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <Transition
        show={isOpen}
        enter="transform transition ease-in-out duraction-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="w-[400px] bg-white h-full shadow-lg transform overflow-y-auto">
          {/* header* */}
          <div className="p-4 border-b border-grsy-200 flex justify-between items-center">
            <h2 className="tetx-lg font-semibold ">Your Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900 "
            >
              <IoClose />
            </button>
          </div>
          {/* Cart Items*/}
          <div className="p-4">
            {
              cart?.item?.length > 0 ? (
                <div className="flex flex-col">
              {cart &&
                cart?.item?.map((item) => {
                  return (
                    <div
                      key={item?.productId?._id}
                      className="flex items-center w-full border-b pb-4"
                    >
                      <img
                        src={item?.productId.images[0]?.url}
                        // src={item?.images?.[0]?.url || "/placeholder.jpg"}
                        alt="cart item"
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                      <div className="ml-4 w-full flex justify-between items-center">
                        <div className="w-1/2">
                          <h3 className="text-sm font-semibold">
                            {item?.productId.name} {item?.variation.color+", " + item?.variation?.size}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {"$ " + item?.productId.sellingPrice}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <button
                              onClick={() =>
                                handleDecrement(
                                  item?.variationId,
                                  item?.productId?._id,
                                  item?.quantity
                                )
                              }
                              className="text-gray-600 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium">
                              {item?.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrement(
                                  item?.variationId,
                                  item?.productId?._id,
                                  item?.quantity
                                )
                              }
                              className="text-gray-600 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="w-1/2 flex justify-end mr-4">
                        <button className="w-8 h-8 p-2 shadow-md rounded-full" title="remove this item"
                        onClick={()=> handleDeleteProduct( item?.variationId,item?.productId?._id)}
                          
                        >
                        <MdDelete className="text-[#ff4500] hover:text-gray-300" />
                        </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>


              ) : ( <img src="/emptycart2.png" className="w-56 h-56 block mx-auto" alt="empty cart" />)
            }
          </div>i
          {
            cart?.item?.length > 0 ? (
          <div className="p-4 border-t border-gray-200">

            <button onClick={clearCart } className="w-full mb-3 text-[#ff450070] border border-[#ff450070] p-3 rounded-lg hover:bg-[#ff4500] hover:text-white transition">
            Clear Cart
          </button>
          
            <button onClick={()=> {router.push('/checkout'); setIsOpen(false)}} className="w-full bg-[#ff450070] text-white p-3 rounded-lg hover:bg-[#ff4500] transition">
              Process to Checkout
            </button>
          </div>
        ) : ""
      }
        </div>
      </Transition>
    </div>
  );
};

export default CartSidebar;
