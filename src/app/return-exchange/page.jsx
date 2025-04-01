'use client'
import { useState } from "react";

const ReturnExchange = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleSection = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    const sections = [
        {
          title: "Free Online Returns",
          content:
            "To make your holiday shopping easier, we're extending our return window. Orders placed on or between November 1st, 2023, and December 24th, 2023, may be returned or exchanged until January 31st, 2024. Orders placed after December 24th, 2023, will follow our normal return window of 30 days after purchase.",
        },
        {
          title: "Initiating Your Return",
          content:
            "Looking to initiate a return online? Use the Returns Page. Click the link below and follow the instructions to initiate a return.",
        },
        {
          title: "Refunds",
          content:
            "Refunds typically take 3–5 business days to process and will be credited back to the original form of payment. If you paid with a Shopping Gift Card, you will receive a new one with the refunded amount. For exchanges, processing may take longer.",
        },
        {
          title: "Returning Items in Store",
          content:
            "Return items to your nearest store within 30 days of purchase. Ensure the item is in its original condition with tags attached. Please provide the original receipt for processing.",
        },
        {
          title: "Returns in Shopping Retail Stores",
          content:
            "You can return items purchased online in any of our Shopping Retail Stores. Please bring the original form of payment and digital copy of the Order Confirmation email.",
        },
        {
          title: "Exchanges",
          content:
            "To exchange an item, please initiate a request through the returns page. Exchanges are subject to availability. Shipping is free for exchanges.",
        },
      ];
  return (
    <div className='py-12 xl:container px-2 xl:px-4 mx-auto'> 


      <h1 className="text-xl md:text-4xl  font-bold text-start mb-6 text-gray-800">
        Returns & Exchange
      </h1>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="border-b border-gray-300 pb-4 cursor-pointer"
          >
            <button
              className="w-full text-left flex justify-between items-center py-2 focus:outline-none"
              onClick={() => toggleSection(index)}
            >
              <span className="text-lg font-medium text-gray-700">
                {section.title}
              </span>
              <span className="text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="text-gray-600 mt-2">{section.content}</div>
            )}
          </div>
        ))}
      </div>

    
    
    </div>
  )
}

export default ReturnExchange