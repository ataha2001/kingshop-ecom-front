'use client'
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/libs/axiosInstance";

const AccountInfo = () => {
  const [imageName, setImageName] = useState("20230926_091644.jpg");
  const [data, setData] = useState({})

  const fetchUser=async()=>{
    axiosInstance.get('/user').then((data)=>{
      if(data?.data?.status){
        setData(data?.data?.user)
      }
    })
  }
  console.log('data',data);
  
  useEffect(() => {
    fetchUser()
  }, [])
  
  
  const handleImageUpload = (e, setFieldValue) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageName(file.name);
      setFieldValue("image", file);
    }
  };

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "mobile must be 10 digits")
      .required("mobile is required"),
  });

  // Initial Values
  const initialValues = {
    name: data?.name || "ashraf",
    email: data?.email || "atahaegy2001@gmail.com",
    mobile: data?.mobile || "",
    image: data?.image || null,
  };

  // Submit Handler
  const onSubmit = (values) => {
    axiosInstance.put('/users',values).then((data)=>{
      if(data?.data?.status){
        alert("Changes Saved Successfully!");

      }
    })
    // console.log("Form Data", values);
  };

  return (
    <div className="bg-white xl:container px-4 py-2 mx-auto">
    <h1
    className="text-2xl font-bold text-start text-orange-500 mb-10 mt-8" 
    // className="text-2xl font-bold text-orange-500 mb-6 "
    >
      Account Information
    </h1>
      <div className="ml-10 p-8 rounded-lg shadow-md w-full max-w-3xl">
        <div className=" p-2 rounded-lg ml-4 ">
          <h2 className="text-lg font-semibold mb-4">Personal Info</h2>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* mobile */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    mobile <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <Field
                      as="select"
                      name="countryCode"
                      className="p-2 border border-gray-300 rounded-l"
                    >
                      <option value="BD +880">EG +20</option>
                      <option value="US +1">US +1</option>
                      <option value="IN +91">IN +91</option>
                    </Field>
                    <Field
                      type="text"
                      name="mobile"
                      className="w-full p-2 border border-gray-300 rounded-r"
                    />
                  </div>
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Upload Image */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Image
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="upload"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                    />
                    <label
                      htmlFor="upload"
                      className="p-2 border border-gray-300 rounded-l cursor-pointer"
                    >
                      Choose File
                    </label>
                    <span className="p-2 border border-gray-300 rounded-r">
                      {imageName}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-500 w-full text-white py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
