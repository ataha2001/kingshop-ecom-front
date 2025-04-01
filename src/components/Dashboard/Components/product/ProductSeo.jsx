import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
// import JoditEditor from "jodit-react";
import { FaSave, FaTimes } from "react-icons/fa";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/libs/axiosInstance";

// Dynamically import JoditReact
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


const ProductSeo = ({seo, getProduct}) => {
  const editor = useRef(null);
  const params = useParams()
  const [image, setImage] = useState("")
  const [publicId, setPublicId] = useState("")
  useEffect(() => {
      setImage(seo?.image?.url)
      setPublicId(seo?.image?.id)
  }, [seo])
  
  // Initial values for the form
  const initialValues = {
    title: seo?.title  || "",
    description: seo?.description || "",
    metaKeyword: seo?.metaKeyword || "",
    image: seo?.image ||  null,
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    metaKeyword: Yup.string().required("Meta Keyword is required"),
    // image: Yup.mixed()
    //   .nullable()
    //   .required("Image is required"),
  });

  const handleSubmit = (values) => {
    console.log('values',values);
    axiosInstance.put(`/products/${params.slug[1]}`,{seo:values}).then((data)=>{
      if(data?.data?.status){
        console.log('data?.data',data?.data);
        
        alert('Product SEO Updated .....')
        getProduct()
      }
    })
  };
    const handleImageDelete = async (id)=>{
      console.log('id',id);
      await axiosInstance.post(`/delete`,{public_id:id}).then((data)=>{
        if(data?.data?.status){
          alert('Image Deleted......')
          // getProduct()
          axiosInstance.put(`/products/${params.slug[1]}`,{seo:{...seo, image:{}}}).then((data)=>{
            if(data.data.status){
              alert('Deleted from product SEO Image....')
              getProduct()
            }
          })
        }
      })
      
    }

  // const handleFileChange = (event)=>{
  //   // console.log(event.currentTarget.files[0]);
  //   if(!event.currentTarget.files) return false
  //     const formData = new FormData()
  //     formData.append('image', event.currentTarget.files[0])
  //     axiosInstance.post('/upload',formData,
  //       {
  //       headers:{
  //         'Content-Type' : 'multipart/form-data'
  //       }
  //     }
  //   ).then((response)=>{
  //       if(response?.data){
  //         console.log('response.data',response.data);
  //         setImage(response?.data?.url)
  //         setPublicId(response?.data?.public_id)
  //         setFieldValue("image", {url:response.data.url, id:response.data.public_id});
          
  //       }
  //     }).catch((error)=>{
  //       console.error("Error uloading the  image", error);
        
  //     })


    
  // }
  return (
    <div className=" mx-auto bg-white px-8 py-2 ">
      <h1 className="text-2xl font-semibold mb-8 border-b-2">SEO</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                TITLE *
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Snapback Hat"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                DESCRIPTION *
              </label>
              <JoditEditor
                ref={editor}
                value={values.description}
                onChange={(content) => setFieldValue("description", content)}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Meta Keyword */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaKeyword">
                META KEYWORD *
              </label>
              <Field
                type="text"
                id="metaKeyword"
                name="metaKeyword"
                placeholder="Hats"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="metaKeyword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                IMAGE
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                // onChange = {(event)=> handleFileChange(event)}
                onChange={(event) => {
                //   setFieldValue("image", event.currentTarget.files[0]);
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
            setImage(response.data.url)
          }, 300);
          // setImage(response?.data?.url)
          setPublicId(response?.data?.public_id)
          setFieldValue("image", {url:response.data.url, id:response.data.public_id});
          
        }
      }).catch((error)=>{
        console.error("Error uloading the  image", error);
        
      })

                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              {values.image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                   <FaTimes  size={20} className="text-red-500 cursor-pointer" onClick={()=> handleImageDelete(publicId)} />
                </div>
              )}
                
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                <FaSave className="mr-2" />
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductSeo;
