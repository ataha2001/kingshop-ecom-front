"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { axiosInstance } from "@/libs/axiosInstance";
import { useRouter } from "next/navigation";
import { showToast } from '@/components/CustomToast';

const SignupForm = () => {
  const navigae = useRouter()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile:"",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile is required"),  
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      axiosInstance.post('/register',values).then((data)=>{
        console.log(data);
        if(data?.data?.status){
          // showToast('success', 'User registered successfully!');
          showToast('success', data?.data?.msg);
          navigae.push('/login')
        }
        
      }).catch((err)=>{
        console.log(err?.response?.data);
        showToast('error', 'User already exists!');
        // showToast('error', err?.response?.data?.msg);
      })
    },
  });

  return (
    <div className="flex justify-center items-start min-h-screen pt-0 md:py-0 bg-gray-200">
      <div className="bg-white md:w-[800px] m-12 rounded-lg shadow-lg flex flex-wrap md:flex-nowrap overflow-hidden">
        <div className="w-full md:w-1/2 p-4 rounded-lg md:p-0">
          <img
            src="/auth.jpg"
            alt="register image"
            className="w-full rounded-l-lg"
          />
        </div>
        <div className="w-full md:w-1/2 py-10 px-8 md:p-10">
          <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
            Sign Up
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                placeholder="Enter your name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            {/* Mobile Field */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-medium mb-2"
              >
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                id="mobile"
                name="mobile"
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.mobile && formik.errors.mobile
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                placeholder="Enter your mobile"
                {...formik.getFieldProps("mobile")}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.mobile}
                </p>
              ) : null}
            </div>


            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
