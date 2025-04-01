'use client'
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl } from "react-icons/fa";
import { MdAlignHorizontalLeft, MdAlignHorizontalCenter, MdAlignHorizontalRight, MdOutlineSave } from "react-icons/md";
// import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/libs/axiosInstance";
// Dynamically import JoditReact
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


const ShippingReturn = ({shippingReturn}) => {
  const editor = useRef(null);
  const params = useParams()
  const initialValues = {
    shippingType: shippingReturn?.shippingType || "Flat Rate",
    shippingCost: shippingReturn?.shippingCost.toString() || "",
    isQuantityMultiply: shippingReturn?.isQuantityMultiply || 'No',
    shippingAndReturnPolicy: shippingReturn?.shippingAndReturnPolicy ||  ""
//     `• We offer extended returns throughout the holiday season. All purchases made between November 6, 2023, through January 7, 2024, can be returned until Jan 31, 2024. Returns are accepted by mail and in-store. Items must be unworn and tags must be attached.
// • A flat rate of $4.95 USD will be deducted from your refund for returns.
// • Once a return is received, please allow 7-14 business days to process and 3-5 business days for the refund to be credited to the payment method used at the time of purchase.
// • We do not offer item exchanges for online orders at this time. To exchange an item for a new size or color you must return the unwanted item(s) and place a new web order for the desired item(s). Your returned item will be processed and a refund will be granted to the original form of payment as long as the item meets our return policy terms. Availability of replacement items is not guaranteed.`,
  };

  const validationSchema = Yup.object({
    shippingType: Yup.string().required("Shipping Type is required"),
    shippingCost: Yup.number()
      .required("Shipping Cost is required")
      .min(0, "Shipping Cost cannot be negative"),
    isQuantityMultiply: Yup.boolean(),
    shippingAndReturnPolicy: Yup.string().required("Shipping & Return details are required"),
  });

  const handleSubmit = (values) => {
    // console.log(values);
    // alert(JSON.stringify(values, null, 2));
    axiosInstance.put(`/products/${params.slug[1]}`,
      {shippingReturn: {...values, shippingCost: Number(values.shippingCost),isQuantityMultiply:values?.isQuantityMultiply ==='yes' ? true : false } }
    ).then((data)=>{
      if(data?.data?.status){
        alert('Shipping & Return Created Successfuly .....')
      }
    })
  };

  return (
    <div className=" mx-auto bg-white px-6 py2 rounded-lg ">
      <h1 className="text-xl font-semibold mb-8 border-b-2">Shipping & Return</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Shipping Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">SHIPPING TYPE *</label>
              <div className="flex items-center space-x-4">
                <Field
                  type="radio"
                  name="shippingType"
                  value={values.shippingType}
                  id="free"
                  className="mr-2"
                />
                <label htmlFor="free">Free</label>
                <Field
                  type="radio"
                  name="shippingType"
                  value="Flat Rate"
                  id="flatRate"
                  className="mr-2"
                />
                <label htmlFor="flatRate">Flat Rate</label>
              </div>
              <ErrorMessage
                name="shippingType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Shipping Cost */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">SHIPPING COST *</label>
              <Field
                type="text"
                name="shippingCost"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="shippingCost"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Is Product Quantity Multiply */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                IS PRODUCT QUANTITY MULTIPLY *
              </label>
              <div className="flex items-center space-x-4">
                <Field
                  type="radio"
                  name="isQuantityMultiply"
                  value="true"
                  id="yes"
                  className="mr-2"
                />
                <label htmlFor="yes">Yes</label>
                <Field
                  type="radio"
                  name="isQuantityMultiply"
                  value="false"
                  id="no"
                  className="mr-2"
                />
                <label htmlFor="no">No</label>
              </div>
            </div>

            {/* Shipping & Return */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">SHIPPING & RETURN</label>
              <div className=" rounded py-2">
                <JoditEditor
                  ref={editor}
                  value={values.shippingAndReturnPolicy}
                  onChange={(content) => setFieldValue("shippingAndReturnPolicy", content)}
                />
              </div>
              <ErrorMessage
                name="shippingAndReturnPolicy"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 flex text-white px-4 py-2 rounded-md"
            >
            <MdOutlineSave className="mr-2" size={25} />
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShippingReturn;
