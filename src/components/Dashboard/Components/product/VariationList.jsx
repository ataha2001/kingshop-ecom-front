import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/libs/axiosInstance";
import { useParams } from "next/navigation";

const VariationList = ({variationsData, getProduct}) => {
  const [variations, setVariations] = useState(variationsData);
  const [editVariation, setEditVariation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [variationToDelete, setVariationToDelete] = useState(null);
    const params = useParams()
  // useEffect(() => {
  //   fetchVariations();
  // }, [variations]);
useEffect(() => {
  setVariations(variationsData)
}, [variationsData])

  // const fetchVariations = async () => {
  //   try {
  //     // const response = await axiosInstance.get("/products/${params.slug[1]}variations");
  //     getProduct()
      
  //     setVariations(variationsData);
  //   } catch (error) {
  //     console.error("Error fetching variations", error);
  //   }
  // };

  const handleAddOrEditVariation = async (values) => {
    try {
      if (editVariation) {
        await axiosInstance.put(`/products/${params.slug[1]}/variations/${editVariation._id}`, values).then((data)=>{
          if(data?.data?.status){
            alert('Variant Updated Successfully.....')
          }
        });;
      } else {
        await axiosInstance.post(`/products/${params.slug[1]}/variations`, values).then((data)=>{
          if(data?.data?.status){
            alert('Variant Added Successfully.....')
          }
        });
      }
      // fetchVariations();
      getProduct()
      setIsModalOpen(false);
      setEditVariation(null);
    } catch (error) {
      console.error("Error saving variation", error);
    }
  };

  const handleDeleteVariation = async () => {
    try {
      await axiosInstance.delete(`/products/${params.slug[1]}/variations/${variationToDelete}`).then((data)=>{
        if(data?.data?.status){
          alert('Variant Deleted successfully ....')
        }
      })
      getProduct()
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting variation", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow">
       <div className="flex justify-between items-center mb-4 shadow-md p-4 mt-0">
                <h2 className="text-lg font-semibold">Variation</h2>
                <button
                  onClick={() => {
                    setEditVariation(null)
                    setIsModalOpen(true)}}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center shadow-md rounded-md"
                >
                  <FaPlus className="mr-2" /> Add Variation
                </button>
              </div>
        {/*<div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Variation List</h2>
          <button
            onClick={() => {
              setEditVariation(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            <FaPlus className="mr-2" /> Add Variation
          </button>
        </div>*/}
        <div className="space-y-2">
          {variations.map((variation) => (
            <div key={variation._id} className="flex justify-between p-2 border rounded">
              <span>
                <strong>SKU:</strong> {variation.sku} › <strong>Color:</strong> {variation.color} › <strong>Size:</strong> {variation.size} › 
                <strong>Quantity:</strong> {variation.quantity}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditVariation(variation);
                    setIsModalOpen(true);
                  }}
                  className="bg-green-100 text-green-600 p-2 rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setVariationToDelete(variation._id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-100 text-red-600 p-2 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <VariationModal
          variation={editVariation}
          onSave={handleAddOrEditVariation}
          onClose={() => {
            // Formik.resetForm()
            setIsModalOpen(false)
            }}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this variation?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleDeleteVariation}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VariationModal = ({ variation, onSave, onClose }) => {
  const formik = useFormik({
    initialValues: variation || { sku: "", color: "", size: "", 
      // price: "", 
      quantity: "" },
    validationSchema: Yup.object({
      sku: Yup.string().required("SKU is required"),
      color: Yup.string().required("Color is required"),
      size: Yup.string().required("Size is required"),
      // price: Yup.number().positive().required("Price is required"),
      quantity: Yup.number().integer().min(1).required("Quantity is required"),
    }),
    onSubmit: onSave,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-full rounded shadow-lg max-w-md">
        <h2 className="text-lg font-semibold mb-4">{variation ? "Edit Variation" : "Add Variation"}</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {Object.keys(formik.initialValues).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium">{key.toUpperCase()}</label>
              <input
                type={
                  // key === "price" || 
                   key === "quantity" ? "number" : "text"}
                name={key}
                onChange={formik.handleChange}
                value={formik.values[key]}
                className="w-full border p-2 rounded"
              />
              {formik.errors[key] && <p className="text-red-500 text-sm">{formik.errors[key]}</p>}
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VariationList;
