"use client";

import { axiosInstance } from "@/libs/axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";

const PasswordChangeForm = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      axiosInstance.put('/user/change-password',values).then((data)=>{
        if(data?.data?.status){
          alert("Password changed successfully!");

        }
      })
      console.log("Submitted Values:", values);
      resetForm();
    },
  });

  return (
    <div 
    // className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div 
    //   className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-start text-orange-500 mb-10 mt-8">
          Change Password
        </h1>

        <form onSubmit={formik.handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-full ">
          {/* Old Password */}
          <div className="mb-8">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-orange-500"
              }`}
              placeholder="Enter your old password"
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.oldPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-8">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-orange-500"
              }`}
              placeholder="Enter your new password"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-10">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-orange-500"
              }`}
              placeholder="Confirm your new password"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-4 px-4  rounded-lg hover:bg-orange-600 transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
