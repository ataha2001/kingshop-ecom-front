import React from 'react'

const TermsCondeitions = () => {
  return (
    <div className='py-12 xl:container px-2 xl:px-4 mx-auto'> 


      <h1 className="text-xl md:text-4xl  font-bold text-start mb-6 text-gray-800">
      Terms & Condeitions
      </h1>

       {/* Section 1 */}
       <div className="border-b border-gray-300 pb-4 mb-4">
       <h2 className="text-lg font-medium text-gray-700 mb-2">
         Free Online Returns
       </h2>
       <p className="text-gray-600">
         To make your holiday shopping easier, we're extending our return
         window. Orders placed on or between November 1st, 2023, and December
         24th, 2023, may be returned or exchanged until January 31st, 2024.
         Orders placed after December 24th, 2023, will follow our normal return
         window of 30 days after purchase.
       </p>
     </div>

     {/* Section 2 */}
     <div className="border-b border-gray-300 pb-4 mb-4">
       <h2 className="text-lg font-medium text-gray-700 mb-2">
         Initiating Your Return
       </h2>
       <p className="text-gray-600">
         Looking to initiate a return online? Use the{" "}
         <a href="#" className="text-blue-500 underline">
           Returns Page
         </a>
         . Click the link below and follow the instructions to initiate a
         return.
       </p>
     </div>

     {/* Section 3 */}
     <div className="border-b border-gray-300 pb-4 mb-4">
       <h2 className="text-lg font-medium text-gray-700 mb-2">Refunds</h2>
       <p className="text-gray-600">
         Refunds typically take 3–5 business days to process and will be
         credited back to the original form of payment. If you paid with a
         Shopping Gift Card, you will receive a new one with the refunded
         amount. For exchanges, processing may take longer.
       </p>
     </div>

     {/* Section 4 */}
     <div className="border-b border-gray-300 pb-4 mb-4">
       <h2 className="text-lg font-medium text-gray-700 mb-2">
         Returning Items in Store
       </h2>
       <p className="text-gray-600">
         Return items to your nearest store within 30 days of purchase. Ensure
         the item is in its original condition with tags attached. Please
         provide the original receipt for processing.
       </p>
     </div>

     {/* Section 5 */}
     <div className="border-b border-gray-300 pb-4 mb-4">
       <h2 className="text-lg font-medium text-gray-700 mb-2">
         Returns in Shopping Retail Stores
       </h2>
       <p className="text-gray-600">
         You can return items purchased online in any of our Shopping Retail
         Stores. Please bring the original form of payment and a digital copy
         of the Order Confirmation email.
       </p>
     </div>

     {/* Section 6 */}
     <div>
       <h2 className="text-lg font-medium text-gray-700 mb-2">Exchanges</h2>
       <p className="text-gray-600">
         To exchange an item, please initiate a request through the returns
         page. Exchanges are subject to availability. Shipping is free for
         exchanges.
       </p>
     </div>
    
    </div>
  )
}

export default TermsCondeitions