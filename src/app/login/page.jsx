"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { showToast } from "@/components/CustomToast";
import { axiosInstance } from "@/libs/axiosInstance";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'

const LoginForm = () => {
  const navigae = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      axiosInstance.post('/login',values).then((data)=>{
              console.log(data);
              if(data?.data?.status){
                Cookies.set('token', data?.data?.token,{expires: 1})
                // Cookies.set('role', data?.data?.role,{expires: 1})
                // showToast('success', 'User registered successfully!');
                showToast('success', data?.data?.msg);
                if (data?.data?.role === 'customer'){
                  navigae.push('/')
                }else{
                  navigae.push('/dashboard')
                }
              }
              
            }).catch((err)=>{
              console.log(err?.response?.data);
              // showToast('error', 'User already exists!');
              showToast('error', err?.response?.data?.msg);
            })
    },
  });

  return (
    <div className="flex justify-center items-start min-h-screen pt-0 md:py-0 bg-gray-200">
    <div className="bg-yellow-500 md:w-[800px] m-12 rounded-lg shadow-lg flex flex-wrap md:flex-nowrap overflow-hidden">
    <div className="w-full md:w-1/2 p-4 rounded-lg md:p-0">
    <img
      src="/auth.jpg"
      alt="register image"
      className="w-full rounded-l-lg"
    />
  </div>
      <div className="bg-white md:w-[600px]  p-8 rounded-r-lg shadow-lg">
        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-orange-500">
            Sign Up
          </Link>
        </p>
      </div>

      </div>
    </div>
  );
};

export default LoginForm;
