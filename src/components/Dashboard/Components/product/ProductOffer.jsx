import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdOutlineSave } from "react-icons/md";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/libs/axiosInstance";

const ProductOffer = ({offer}) => {
  console.log('offer', offer);
  
  const params = useParams()
  const initialValues = {
    // statrDate: offer?.statrDate.split(":0")?.[0] || "",
    // statrDate: offer?.statrDate.split(':0')?.[0] || "",
    statrDate: offer?.statrDate ? new Date(offer.statrDate).toISOString().slice(0, 16) : "",

    endDate: offer?.endDate.split(':0')?.[0] || "",
    discountPercentage: offer?.discountPercentage || 0,
    flashSale: offer?.flashSale ? true : false,
  };

  const validationSchema = Yup.object({
    statrDate: Yup.date()
      .required("Start date is required")
      .min(new Date(), "Start date must be in the future"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("statrDate"), "End date must be later than start date"),
    discountPercentage: Yup.number()
      .required("Discount percentage is required")
      .min(0, "Discount must be at least 0")
      .max(100, "Discount cannot exceed 100"),
    flashSale: Yup.boolean().required("Flash sale status is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    axiosInstance.put(`/products/${params.slug[1]}`, 
      {offer:{...values, discount: Number(values.discountPercentage),flashSale:values?.flashSale ==='yes' ? true : false}}).then((data)=>{
      if(data?.data?.status){
        alert('Offer Created Successfuly .....')
      }
    })
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Offer</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    OFFER START DATE <span className="text-orange-500">*</span>
                  </label>
                  <Field
                    name="statrDate"
                    type="datetime-local"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={values.statrDate}
                  />
                  <ErrorMessage
                    name="statrDate"
                    component="div"
                    className="text-orange-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    OFFER END DATE <span className="text-orange-500">*</span>
                  </label>
                  <Field
                    name="endDate"
                    type="datetime-local"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={values.endDate}
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-orange-500 text-xs mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  DISCOUNT PERCENTAGE <span className="text-orange-500">*</span>
                </label>
                <Field
                  name="discountPercentage"
                  type="number"
                  min="0"
                  max="100"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={values.discountPercentage}
                />
                <ErrorMessage
                  name="discountPercentage"
                  component="div"
                  className="text-orange-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  DO YOU WANT TO ADD IN THE FLASH SALE? <span className="text-orange-500">*</span>
                </label>
                <div className="mt-2 flex items-center">
                  <Field
                    type="radio"
                    name="flashSale"
                    value={values.flashSale ? true : false}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="yes" className="ml-3 block text-sm font-medium text-gray-700">
                    Yes
                  </label>
                  <Field
                    type="radio"
                    name="flashSale"
                    value={values.flashSale ? true : false}
                    className="ml-6 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="no" className="ml-3 block text-sm font-medium text-gray-700">
                    No
                  </label>
                </div>
                <ErrorMessage
                  name="flashSale"
                  component="div"
                  className="text-orange-500 text-xs mt-1"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <MdOutlineSave className="mr-2" size={25} />
                   Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductOffer;
