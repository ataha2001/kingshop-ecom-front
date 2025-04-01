"use client";
import { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import {
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineSave,
  AiOutlineRight,
} from "react-icons/ai";
import AddressFormCheckout from "@/components/AddressFormCheckout";
import { axiosInstance } from "@/libs/axiosInstance";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Dashboard/Components/CheckoutForm";
// import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const ShippingInfo = ({
  shippingAddress,
  billingAddress,
  showBillingAddress,
  setShowBillingAddress,
  onEditAddress,
  onAddNewAddress,
  onSaveAndPay,
  onBackToCart,
  subtotal,
  tax,
  shippingCharge,
  discount,
  total,
  items,
}) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-2">
        Provide Your Shipping Information
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Check your Information Brfore You Continue
      </p>
      {/* progressbar */}
      <div className="flex items-center mb-6">
        <ProgressStep stepNumber={1} label="Cart" isComplete />
        <ProgressStep stepNumber={2} label="Checkout" isComplete />
        <ProgressStep stepNumber={3} label="Payment" />
      </div>
      {/* Delivery/Pick up Toggle */}
      <div className="flex mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-l ">
          Delivery
        </button>
        {/*<button className="bg-blue-200 text-white px-4 py-2 rounded-l ">Pick Up</button>*/}
      </div>

      {/* Shipping adfdress section */}
      <AddressSection
        title="Shipping Address"
        address={shippingAddress}
        onEditAddress={onEditAddress}
        onAddNewAddress={onAddNewAddress}
      />
      {/* Billing address section */}
      {!showBillingAddress ? (
        <AddressSection
          title="Billing Address"
          address={billingAddress}
          onEditAddress={onEditAddress}
          onAddNewAddress={onAddNewAddress}
        />
      ) : (
        ""
      )}

      {/* Billing address section */}
      <div className="flex items-center mb-6">
        <input
          onChange={(e) => setShowBillingAddress(e?.target?.checked)}
          type="checkbox"
          className="mr-2"
        />
        <label htmlFor="" className="">
          Save shipping address as a billing address
        </label>
      </div>

      <div className="mb-6">
        {items?.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded flex items-center gap-3">
          <div className="">
          <img className="w-20 h-20 rounded-md shadow-md" src={item?.productId.images[0]?.url} alt={item?.productId?.name} />
          </div>
          <div className="">
            <h2 className="text-lg font-semibold">
            {item?.productId?.name+", "+item?.variation?.size+", "+item?.variation?.color}
            </h2>
           
            <p><b>Quantity: </b>{item?.quantity}</p>
            <p><b>Price   : </b>{item?.productId?.sellingPrice * item?.quantity}</p>
          </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <CartSummary
        subtotal={subtotal}
        tax={tax}
        shippingCharge={shippingCharge}
        discount={discount}
        total={total}
      />
      {/* Action Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <button
          onClick={onBackToCart}
          className="bg-gray-200 text-gray-500 px-4 py-2 rounded mb-4 md:mb-0 flex items-center"
        >
          <AiOutlineLeft className="mr-2" /> Back To Cart
        </button>
        <button
          onClick={onSaveAndPay}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4 md:mb-0 flex items-center"
        >
        Save And Pay  <AiOutlineRight className="ms-2" /> 
        </button>
      </div>
    </div>
  );
};
// Progress Step Component
const ProgressStep = ({ stepNumber, label, isComplete }) => {
  return (
    <div className="flex-1">
      <div className="flex relative items-center justify-center">
        <div
          className={`relative z-30 w-8 h-8 rounded-full flex text-white items-center justify-center ${
            isComplete ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          {stepNumber}
        </div>
        {stepNumber === 1 && (
          <div
            className={`absolute left-[50%] z-20 w-full flex-1 h-1  ${
              isComplete ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        )}
        {stepNumber === 2 && (
          <div
            className={`absolute  z-10 w-full flex-1 h-1  ${
              isComplete ? "bg-green-200" : "bg-gray-300"
            }`}
          />
        )}
        {stepNumber === 3 && (
          <div
            className={`absolute right-[50%] z-10 w-full flex-1 h-1  ${
              isComplete ? "bg-green-200" : "bg-gray-300"
            }`}
          />
        )}
      </div>
      <p className="text-center text-sm mt-2">{label}</p>
    </div>
  );
};
// const address={
//     fullname:"",
//     phone:"",
//     email:"",
//     addressline1:"",
//     addressline2:"",
//     city:"",
//     state:"",
//     zipCode:"",
//     country:""
// }
// Address Section
const AddressSection = ({ title, address, onEditAddress, onAddNewAddress }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="flex justify-between gap-3">
          <button
            onClick={() => onEditAddress(title)}
            className="text-green-500 bg-white px-4 py-2 border border-green-500 rounded-lg flex items-center hover:bg-green-500 hover:text-white"
          >
            <AiOutlineEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => onAddNewAddress(title)}
            className="text-red-500 bg-white px-4 py-2 border border-red-500 rounded-lg flex items-center hover:bg-orange-500 hover:text-white"
          >
            <AiOutlinePlus className="mr-2" /> Add New
          </button>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <p>{address?.fullname}</p>
        <p>{address?.phone}</p>
        <p>{address?.email}</p>
        <p>{address?.addressline1}</p>
        {address?.addressline2 && <p>{address?.addressline2}</p>}
        <p>
          {address?.city}, {address?.state}
        </p>
        <p>
          {address?.zipCode} {address?.country}
        </p>
      </div>
    </div>
  );
};

// Cart Summary
const CartSummary = ({ subtotal, tax, shippingCharge, discount, total }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <button className="bg-blue-100 text-blue-500 px-4 py-2 rounded mb-4 flex items-center">
        <FaTag className="mr-2" /> Apply Coupon Code
      </button>
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p>$ {subtotal}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Tax</p>
          <p>$ {tax}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Shipping Charge</p>
          <p>$ {shippingCharge}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Discount</p>
          <p>$ {discount || 0 }</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Total</p>
          <p>$ {total}</p>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState(null);
   const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const [orderSummary, setOrderSummary] = useState({})
    function generateOrderSummary (items, taxRate = 0.3, shippingCharge = 10, discountRate = 0){
        const subtotal = items.reduce((total,item)=> total + (item.productId?.sellingPrice * item.quantity) , 0)

        console.log('subtotal', subtotal);
    
        const tax = subtotal * taxRate
        const discount = subtotal * discountRate
        const total = subtotal + tax + shippingCharge - discount

        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            shippingCharge: shippingCharge.toFixed(2),
            total: total.toFixed(2),
            discount: discount.toFixed(2)
        }
    }


    
    const [showBillingAddress, setShowBillingAddress] = useState(false);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [addresses, setAddressess] = useState({
        billingAddress: {},
        shippingAddress: {},
        });
        const [addressType, setAddressType] = useState("");
        const [items, setItems] = useState([]);
        
        const fetchAddresses = async () => {
            axiosInstance.get("/user").then((data) => {
      if (data?.data?.status) {
        setAddressess({
          shippingAddress: data?.data?.user.shippingAddress,
          billingAddress: data?.data?.user.billingAddress,
          });
      }
    });
    };
    
    const fetchCart = async () => {
        axiosInstance.get("/cart").then((data) => {
            if (data?.data?.status) {
        setItems(data?.data?.data?.item);
        setOrderSummary(generateOrderSummary(data?.data?.data?.item))
        
      }
    });
  };
  useEffect(() => {
    fetchAddresses();
    fetchCart();
  }, []);
  const handleAddNewAddress = (title) => {
    console.log(title);
    setAddressType(title);
    setIsAddressFormOpen(true);
    };
    

const handleBackToCart = () => alert("Save and Pay  Clicked");
const handleSaveAndPay = async () => {
    // console.log('test');
    //  if (!stripe || !elements) {
    //     setError("Stripe is not loaded yet. Please try again.");
    //     console.log('Error', error);
        
    //     return;
    // }

    
    const data = {
        paymentType: "Card",
        orderType: "Delivery",
        shippingAddress: addresses?.shippingAddress,
        billingAddress: addresses?.billingAddress,
        total: orderSummary?.total,
        shippingCharge: orderSummary?.shippingCharge ,
        discount: orderSummary?.discount,
        tax: orderSummary?.tax,
        subtotal: orderSummary?.subtotal,
        items: items.map((item)=> {
            return {
                productName: item?.productId?.name,
                productImage: item?.productId?.images?.[0]?.url,
                color:item?.variation?.color,
                size:item?.variation?.size,
                price: item?.productId?.sellingPrice,
                quantity:item?.quantity,
                sku:item?.variation?.sku,

            }
            }),

        //  orderId: generateOrderId(),
        // userId: request.user.id,
        // orderDate: Date.now(),
        // orderStatus: "Pending",
        // returnReason: { type: String },
        // returnStatus: "Pending",
        // cancellationReason: orderData?.cancellationReason,
    }
        axiosInstance.post('/orders', data).then((data)=>{
            if(data?.data?.status){
                alert('Order Added Succcessfully')
                console.log("Data=", data?.data?.data);
                
            }
            })
        const res = await axiosInstance.post('/create-payment-intent', {
                  amount: orderSummary?.total * 100, // Stripe requires amount in cents
                  currency: "usd",
                });
 if (res?.data?.clientSecret) {
                setClientSecret(res.data.clientSecret);
            } else {
                setError("Failed to get client secret.");
            }
        // const { clientSecret } = await res.data;
        
        if (!clientSecret) {
            setError("Failed to get client secret.");
            setProcessing(false);
            return;
        }

        // const result = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: elements.getElement(CardElement),
        //     },
        // });

        // if (result.error) {
        //     setError(result.error.message);
        // } else {
        //     setSuccess(true);
        // }
        // setProcessing(false);
    
    }

    

  return (
    <>
      <ShippingInfo
        items={items}
        showBillingAddress={showBillingAddress}
        setShowBillingAddress={setShowBillingAddress}
        shippingAddress={addresses?.shippingAddress}
        billingAddress={addresses?.billingAddress}
        onEditAddress={handleAddNewAddress}
        onAddNewAddress={handleAddNewAddress}
        onSaveAndPay={handleSaveAndPay}
        onBackToCart={handleBackToCart}
        subtotal={orderSummary?.subtotal}
        tax={orderSummary?.tax}
        shippingCharge={orderSummary?.shippingCharge}
        discount={orderSummary?.discount}
        total={orderSummary?.total}
      />
      {isAddressFormOpen && (
        <AddressFormCheckout
          title={addressType}
          fetchAddresses={fetchAddresses}
          shippingAddress={addresses?.shippingAddress}
          billingAddress={addresses?.billingAddress}
          showBillingAddress={showBillingAddress}
          onClose={() => setIsAddressFormOpen(false)}
        />
        
      )}

      {/* Load CheckoutForm only when we have a clientSecret */}
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
    </>
  );
};

export default Checkout;
