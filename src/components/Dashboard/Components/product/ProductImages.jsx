import { axiosInstance } from "@/libs/axiosInstance";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";

const ProductImages = ({ initialImages, getProduct }) => {
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState(initialImages[0]);
  const [showModal, setShowModal] = useState(false);
 const  params = useParams()
useEffect(() => {
  setImages(initialImages)
}, [initialImages])

 
 
  const handleImageUpload = (event) => {
    if(!event.target.files) return false
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    // console.log('fromData', formData);
    
    // formData.append("images", JSON.stringify(event.target.files[0]));
    axiosInstance.post('/upload',formData,
            {
            headers:{
              'Content-Type' : 'multipart/form-data'
            }
          }
        ).then((response)=>{
          console.log('response', response);
          
          if (response?.data?.url) {
            // console.log("Uploading image:",typeof response.data.url);
        
            axiosInstance.post(`/products/${params.slug[1]}/images`, {
                imageUrl: response?.data?.url, publicId:response?.data?.result.public_id
                // Send only the URL as a string
            })
            .then((data) => {
                if (data?.data?.status) {
                  alert("Image added successfully...");
                  getProduct()
                }
            })
            .catch((error) => {
                console.error("Error uploading image:", error);
            });
        }
        
          }).catch((error)=>{
            console.error("Error uloading the  image", error);
            
          })
  };

  const handleImageDelete = async (id)=>{
    console.log('id',id);
    await axiosInstance.delete(`/products/${params.slug[1]}/images/${id}`).then((data)=>{
      if(data?.data?.status){
        alert('Image Deleted......')
        getProduct()
      }
    })
    
  }
  const handleCancelClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-4">
      {/* Thumbnails Sidebar */}
      <div className="relative flex flex-col items-center md:items-start w-full md:w-1/5 space-y-2">
        {/* Upload Button */}
        <div className="absolute -top-6 w-full flex justify-center">
          <label
            htmlFor="imageUpload"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer shadow-lg"
          >
            <FaUpload />
            <span>Upload</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {images?.map((image, index) => (
          <button
            key={index}
            className={`rounded-lg overflow-hidden w-16 h-16 md:w-20 md:h-20 ${
              selectedImage === image ? "ring-2 ring-Orange-500" : ""
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image?.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image Display */}
      <div className="relative w-full md:w-4/5 flex justify-center items-center">
      <div className="rounded-lg">
      <img
      src={selectedImage?.url}
      alt="Selected"
      className="rounded-lg object-contain max-h-[450px] w-full"
      />
      </div>
        <button
          className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-lg"
          onClick={()=> handleImageDelete(selectedImage._id)}
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex flex-col items-center">
              <div className="text-orange-500 text-4xl mb-4">!</div>
              <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
              <p className="text-sm text-gray-600 mb-4">
                You will not be able to recover the deleted record!
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Yes, Delete it!
              </button>
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                No, Cancel!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;
