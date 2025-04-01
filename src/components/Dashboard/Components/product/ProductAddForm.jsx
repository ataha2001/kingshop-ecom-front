import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/libs/axiosInstance";

// Dynamically import JoditReact
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const ProductAddForm = ({
  isOpen,
  onClose,
  setIsDrawerOpen,
  data,
  fetchProducts,
}) => {
  const editor = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [subcategoryData, setSubCategoryData] = useState([]);
  // console.log('category',category);
  
  const fetchCategories = async () => {
    await axiosInstance.get("/category").then((data) => {
      if (data?.data?.status) {
        setSubCategory(data?.data?.data);
      }
    });
    await axiosInstance.get("/brand").then((data) => {
      if (data?.data?.status) {
        setBrands(data?.data?.data);
      }
    });
  };
  
  useEffect(() => {
    setSubCategoryData(subCategory.filter((item)=> item?.category === category))
  }, [category])
  
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      sku: data?.sku || "",
      category: data?.category || "",
      subcategory: data?.subcategory || "",
      barcode: data?.barcode || "",
      buyingPrice: data?.buyingPrice || "",
      sellingPrice: data?.sellingPrice || "",
      tax: data?.tax || "",
      brand: data?.brand || "",
      status: data?.status || "Active",
      canPurchase: data?.canPurchase ? "yes" : "no" || "yes",
      showStockOut: data?.showStockOut ? "enable" : "disable" || "enable",
      refundable: data?.refundable || "no",
      maxPurchaseQty: data?.maxPurchaseQty || "",
      lowStockQty: data?.lowStockQty || "",
      unit: data?.unit || "piece",
      weight: data?.weight || "",
      tags: data?.tags || "",
      description: data?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      sku: Yup.string().required("SKU is required"),
      buyingPrice: Yup.number()
        .typeError("Must be a number")
        .required("Buying Price is required"),
      sellingPrice: Yup.number()
        .typeError("Must be a number")
        .required("Selling Price is required"),
      category: Yup.string().required("Category is required"),
      subcategory: Yup.string().required("Category is required"),
      brand: Yup.string().required("Brand is required"),
      maxPurchaseQty: Yup.number().typeError("Must be a number"),
      lowStockQty: Yup.number().typeError("Must be a number"),
      unit: Yup.string().required("Unit is required"),
      weight: Yup.number()
        .typeError("Must be a number")
        .required("Weight is required"),
    }),
    onSubmit: (values) => {
      // console.log("Form Submitted:", values);
      if (!isEdit) {
        axiosInstance
          .post("/products", {
            ...values,
            showStockOut: values?.showStockOut === "enable" ? true : false,
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Product Created Ok ....");
              fetchProducts();
              formik.resetForm({});
              setIsDrawerOpen(!open);
            }
          });
      } else {
        axiosInstance
          .put(`/products/${data?._id}`, {
            ...values,
            showStockOut: values?.showStockOut === "enable" ? true : false,
          })
          .then((data) => {
            if (data?.data?.status) {
              alert("Product Uploaded Ok ....");
              fetchProducts();
              formik.resetForm({});
              // setIsDrawerOpen(!open)
            }
          });
      }
      onClose();
    },
  });

  return (
    <>
      <div
        // className={`fixed inset-0 scroll bg-black bg-opacity-50 flex justify-end transform transition-transform duration-500 ${
        //   isOpen ? "translate-x-0 block" : "translate-x-full hidden"
        // }`}
        className={`fixed top-0 right-0 z-50 h-full w-120 scroll bg-white shadow-lg
        transform transition-transform ${
          isOpen ? "translate-x-0  " : "translate-x-full "
        }`}
      >
        <div className="h-full w-full max-w-4xl bg-white shadow-lg p-6 overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {isEdit ? "Edit" : "Add"} Product
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
            <div className="grid grid-cols-2 gap-4">
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

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium">SKU *</label>
                <input
                  type="text"
                  name="sku"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sku}
                  className={`mt-1 block w-full rounded-md border ${
                    formik.errors.sku ? "border-red-500" : "border-gray-300"
                  } p-2`}
                />
                {formik.touched.sku && formik.errors.sku && (
                  <p className="text-red-500 text-xs">{formik.errors.sku}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium">Category *</label>
                <select
                  name="category"
                  onChange={(e)=> {formik.handleChange(e); setCategory(e.currentTarget.value)}}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled >Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Juniors">Juniors</option>
                </select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.category}
                  </p>
                )}
              </div>

              {/* SubCategory */}
              <div>
                <label className="block text-sm font-medium">
                  Sub Category *
                </label>
                <select
                  name="subcategory"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subcategory}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled >Select sub Category</option>
                  {subcategoryData?.length ? subcategoryData?.map((item,index)=>{
                    return <option key={index} value={item?.subcategory}> {item?.subcategory} </option>
                  }) : 
                  <option disabled value="">No Data</option>
                }
                </select>
                {formik.touched.subcategory && formik.errors.subcategory && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.subcategory}
                  </p>
                )}
              </div>

              {/* Barcode */}
              <div>
                <label className="block text-sm font-medium">Barcode</label>
                <input
                  type="text"
                  name="barcode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.barcode}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Buying Price */}
              <div>
                <label className="block text-sm font-medium">
                  Buying Price *
                </label>
                <input
                  type="text"
                  name="buyingPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.buyingPrice}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-sm font-medium">
                  Selling Price *
                </label>
                <input
                  type="text"
                  name="sellingPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sellingPrice}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Tax */}
              <div>
                <label className="block text-sm font-medium">Tax</label>
                <select
                  name="tax"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tax}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Tax</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium">Brand</label>
                <select
                  name="brand"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.brand}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>Select Brand</option>
                  {brands?.length ? brands.map((item,index)=>{
                    return <option key={index} value={item?.name}>{item?.name}</option>

                  }) : <option disabled >No Data</option>}
                  
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium">Status *</label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formik.values.status === "Active"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formik.values.status === "Inactive"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>

              {/* Can Purchasable */}
              <div>
                <label className="block text-sm font-medium">
                  Can Purchasable *
                </label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="canPurchase"
                      value="yes"
                      checked={formik.values.canPurchase === "yes"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="canPurchase"
                      value="no"
                      checked={formik.values.canPurchase === "no"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {/* Show Stock Out */}
              <div>
                <label className="block text-sm font-medium">
                  Show Stock Out *
                </label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="showStockOut"
                      value="enable"
                      checked={formik.values.showStockOut === "enable"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Enable</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="showStockOut"
                      value="disable"
                      checked={formik.values.showStockOut === "disable"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Disable</span>
                  </label>
                </div>
              </div>

              {/* Refundable */}
              <div>
                <label className="block text-sm font-medium">
                  Refundable *
                </label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="refundable"
                      value="yes"
                      checked={formik.values.refundable === "yes"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="refundable"
                      value="no"
                      checked={formik.values.refundable === "no"}
                      onChange={formik.handleChange}
                      className="form-radio text-orange-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {/* Maximum Purchase Quantity */}
              <div>
                <label className="block text-sm font-medium">
                  Max Purchase Qty
                </label>
                <input
                  type="text"
                  name="maxPurchaseQty"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maxPurchaseQty}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Low Stock Quantity Warning */}
              <div>
                <label className="block text-sm font-medium">
                  Low Stock Qty Warning
                </label>
                <input
                  type="text"
                  name="lowStockQty"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lowStockQty}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium">Unit *</label>
                <select
                  name="unit"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.unit}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="piece">Piece</option>
                  <option value="gram">Gram</option>
                  <option value="liter">Liter</option>
                  <option value="milliliter">Milliliter</option>
                </select>
                {formik.touched.unit && formik.errors.unit && (
                  <p className="text-red-500 text-xs">{formik.errors.unit}</p>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium">Weight *</label>
                <input
                  type="text"
                  name="weight"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.weight}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {formik.touched.weight && formik.errors.weight && (
                  <p className="text-red-500 text-xs">{formik.errors.weight}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium">Tags</label>
              <input
                type="text"
                name="tags"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
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
                type="button"
                onClick={onClose}
                className=" rounded-md py-2 px-4 bg-gray-200 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {isOpen && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 `}></div>
      )}
    </>
  );
};

export default ProductAddForm;
