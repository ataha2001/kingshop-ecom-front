'use client'
import React from 'react'
import { useState } from "react";
const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    const faqs = [
        {
          question: "How do I check my order status?",
          answer:
            "You can check your order status by logging in to your My Account or entering your order number and email address on the Order Tracking page. Please note that the type of shipment will affect the shipping updates.",
        },
        {
          question: "Can I change or cancel my order?",
          answer:
            "Unfortunately, once your order has been placed, it cannot be canceled or changed. Please contact our Customer Service for more assistance.",
        },
        {
          question: "How do I return or exchange an item?",
          answer:
            "We are happy to offer free returns and exchanges for items purchased within 30 days of purchase. You may return your items via the Returns & Exchanges page for more information.",
        },
        {
          question: "What is the '2-Day Shipping' Service?",
          answer:
            "Our 2-Day Shipping ensures your order is delivered in two business days. This applies to qualifying orders only.",
        },
        {
          question: "What types of payments are accepted?",
          answer:
            "We accept all major credit cards, Apple Pay, PayPal, and Shopping Gift Cards.",
        },
        {
          question: "Why do I see 'Order Confirmed' for so long?",
          answer:
            "If your order is in 'Order Confirmed' status, it may take additional time to process due to inventory updates. Rest assured, your order is on the way!",
        },
      ];
      
  return (
    <div className='py-12 xl:container px-2 xl:px-4 mx-auto'>
    <h1 className="text-xl md:text-4xl font-bold text-start mb-8">FAQ</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>
              <span className="text-gray-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="text-gray-600 pb-4">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
  
    </div>
  )
}

export default Faq