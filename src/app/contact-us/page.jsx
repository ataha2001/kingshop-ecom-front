import React from 'react'
import { FaEnvelope, FaMap, FaMapPin, FaPhone } from 'react-icons/fa'
import { FiMapPin } from "react-icons/fi";

const ContacttUS = () => {
  return (
    <div className='py-12 xl:container px-2 xl:px-4 mx-auto'> 


      <h1 className="text-xl md:text-4xl  font-bold text-start mb-6 text-gray-800">
      Contact Us
      </h1>
            <p className="mb-4">
              Questions, Concerns, Comments? You talk, we listen.
              <br />
              If you have any additional questions or comments, we would love to hear from you!
              <br />
              Submit your query using any of the methods below.
            </p>
            <div className="mb-6">
              <p className="font-bold">Email:</p>
              <p className="text-blue-600 flex gap-2 items-center mt-1"><FaEnvelope /> info@nilabs.net</p>
            </div>
            <div className="mb-6">
              <p className="font-bold">Toll-free number:</p>
              <p className="text-blue-600 flex gap-2 items-center mt-1"><FaPhone />+88013373846328</p>
              <p className="text-gray-600 mt-1">7 days a week</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-bold flex gap-2">
                <span className="bg-red-500 text-white rounded-full p-2">
                <FiMapPin className='' />
                </span>
                Mirpur 1</p>
                <p>House 31, Road 9, Block A, Mirpur 1</p>
                <p>Dhaka, Dhaka-1216</p>
                <p className="text-blue-600 flex gap-2 items-center mt-1"><FaPhone /> +8801735733643</p>
              </div>
              <div>
                <p className="font-bold flex gap-2">
                <span className="bg-red-500 text-white rounded-full p-2">
                <FiMapPin className='' />
                </span>
                Dhanmondi 27</p>
                <p>House 31, Road 10, Block B, Dhanmondi 32</p>
                <p>Dhaka, Dhaka-1209</p>
                <p className="text-blue-600 flex gap-2 items-center mt-1">
                <FaPhone />
                +8801723624245</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="font-bold">
              
              Support</p>
              <p className="text-blue-600 flex gap-2 items-center">
              <FaEnvelope />
              info@nilabs.net</p>
            </div>
          
    
    </div>
  )
}

export default ContacttUS