import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/libs/axiosInstance";
import { FaTimes } from "react-icons/fa";

// Dynamically import JoditReact
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const BrandForm = ({
  isEdit,
  setIsEdit,
  data,
  isDrawerOpen,
  onClose,
  setIsDrawerOpen,
  fetchBrands,
}) => {
  const fileInputRef = useRef(null);
  const editor = useRef(null);
  const [image, setImage] = useState("");
  const [publicId, setPublicId] = useState("")
  
  useEffect(() => {
    setImage(data?.data?.url)
  }, [data])
  
  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      description: data?.description || "",
      status: data?.status || "Active",
      image: data?.image || {},
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
    
    }),
    onSubmit: (values) => {
      // console.log("Form Submitted:", values);
      if (isEdit) {
        axiosInstance.put(`/brand/${data?._id}`, values).then((data) => {
          if (data?.data?.status) {
            alert("Brand Updated Successfully ....");
          }
        });

      } else {
        axiosInstance.post("/brand", values).then((data) => {
          if (data?.data?.status) {
            alert("Brand Created Successfully ....");
      setIsEdit(false)  
      fetchBrands();
      setImage('')
      formik.resetForm({});
      onClose();
       // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
          }
        });
      }
      setIsEdit(false)  
      fetchBrands();
      formik.resetForm({});
      onClose();
    },
  });
  const handleImageDelete = async (id) => {
    console.log("id", id);
    await axiosInstance.post(`/delete`, { public_id: publicId }).then((data) => {
      if (data?.data?.status) {
        alert("Image Deleted......");
        // getProduct()
        axiosInstance
          .put(`/brand/${id}`, {image: {} })
          .then((data) => {
            if (data.data.status) {
              alert("Image Deleted....");
              fetchBrands()
            }
          });
      }
    });
  };

 const handleFileChange = (event)=>{
    // console.log(event.currentTarget.files[0]);
    if(!event.currentTarget.files) return false
      const formData = new FormData()
      formData.append('image', event.currentTarget.files[0])
      axiosInstance.post('/upload',formData,
        {
        headers:{
          'Content-Type' : 'multipart/form-data'
        }
      }
    ).then((response)=>{
        if(response?.data){
          console.log('response.data',response.data);
          setTimeout(() => {
            setImage(response?.data?.url)
          }, 300);
          setPublicId(response?.data?.public_id)
          formik.setFieldValue("image", {url:response.data.url, id:response.data.public_id});
          
        }
      }).catch((error)=>{
        console.error("Error uloading the  image", error);
        
      })


    
  }
  
  return (
    <>
      <div
        // className={`fixed inset-0 scroll bg-black bg-opacity-50 flex justify-end transform transition-transform duration-500 ${
        //   isOpen ? "translate-x-0 block" : "translate-x-full hidden"
        // }`}
        className={`fixed overflow-x-hidden top-0 right-0 z-50 h-full w-120 scroll bg-white shadow-lg
        transform transition-transform ${
          isDrawerOpen ? "translate-x-0  " : "translate-x-full "
        }`}
      >
        <div className="h-full w-full max-w-4xl bg-white shadow-lg p-6 overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {isEdit ? "Edit" : "Add"} Brand
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Grid layout for two inputs per row */}
            <div className="grid grid-cols-1 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Name *</label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`mt-1 block w-full rounded-md border ${
                    formik.errors.name ? "border-red-500" : "border-gray-300"
                  } p-2`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs">{formik.errors.name}</p>
                )}
              </div>


              {/* Image */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  IMAGE
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}  // Attach ref here
                  onChange = {(event)=> handleFileChange(event)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                {image && (
                  <div className="mt-4">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <FaTimes
                      size={20}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleImageDelete(publicId)}
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium">Status *</label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formik.values.status === "active"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formik.values.status === "inactive"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

                          {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <JoditEditor
                  ref={editor}
                  value={formik.values.description}
                  onBlur={() => formik.setFieldTouched("description", true)}
                  onChange={(content) =>
                    formik.setFieldValue("description", content)
                  }
                />
                {formik.touched.description && formik.errors.description && (
                    <p className="text-red-500 text-xs">{formik.errors.description}</p>
                  )}
              </div>





            {/* Save Button */}
            <div className="flex  gap-4 items-center">
              <button
                type="submit"
                className="block px-4 py-2  text-white bg-[#f76411]  rounded-md hover:bg-[#f34d13]"
              >
                {isEdit ? "Update" : "Save"}
              </button>
              <button
              type='button'
                onClick={onClose}
                className=" rounded-md py-2 px-4 bg-gray-200 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {isDrawerOpen && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 `}></div>
      )}
    </>
  );
};

export default BrandForm;
