'use client'
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineClose } from "react-icons/md";
import { axiosInstance } from "@/libs/axiosInstance";
import { showToast } from "@/components/CustomToast";





const AddressForm = ({ data, onClose }) => {
  console.log('new data',data);

  const formik = useFormik({
    initialValues: {
      fullName: data?.[0].fullName || "",
      email: data?.[0].email || "",
      phone: data?.[0].phone || "",
      country: data?.[0].country || "",
      state: data?.[0].state || "",
      city: data?.[0].city || "",
      zipcode: data?.[0].zipcode || "",
      streetAddress: data?.[0].streetAddress || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Full Name is required")
        .min(3, "Full Name must be at least 3 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .nullable(),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone must be numeric"),
      country: Yup.string().required("Country is required"),
      streetAddress: Yup.string()
        .required("Street Address is required")
        .min(5, "Street Address must be at least 5 characters"),
    }),
    onSubmit: (values) => {
      // alert("Address added successfully!"); 
      console.log(values);
      axiosInstance.put('/users', {billingAddress: values}).then((data)=>{
        if(data?.data?.status){
          // showToast('success', data?.data?.msg);
          showToast('success', "Address added successfully!");
        }
      })
      onClose();
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 fixed inset-0 z-50 w-5/6 md:w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Address</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-xl focus:outline-none font-bold"
          >
          <MdOutlineClose size={30} />
        <i className="fas fa-times text-black"></i>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit} className="m-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              className={`mt-1 block w-full border ${
                formik.errors.fullName && formik.touched.fullName
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm p-2`}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.fullName && formik.touched.fullName && (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className={`mt-1 block w-full border ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm p-2`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              className={`mt-1 block w-full border ${
                formik.errors.phone && formik.touched.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm p-2`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              className={`mt-1 block w-full border ${
                formik.errors.country && formik.touched.country
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm p-2`}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">--</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Egypt">Egypt</option>
            </select>
            {formik.errors.country && formik.touched.country && (
              <p className="text-red-500 text-sm">{formik.errors.country}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formik.values.state}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipcode"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="streetAddress"
              className={`mt-1 block w-full border ${
                formik.errors.streetAddress && formik.touched.streetAddress
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm p-2`}
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.streetAddress && formik.touched.streetAddress && (
              <p className="text-red-500 text-sm">
                {formik.errors.streetAddress}
              </p>
            )}
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
            onClick={formik.handleSubmit}
          >
            Add Address
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm