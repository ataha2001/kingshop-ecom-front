import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import { axiosInstance } from "@/libs/axiosInstance";
import { showToast } from "@/components/CustomToast";

const AddressFormCheckout = ({
  onClose,
  showBillingAddress,
  shippingAddress,
  billingAddress,
  title,
  fetchAddresses,
}) => {
  const [countries] = useState(["Bangladesh", "Egypt", "USA", "UK"]);
  const [states] = useState(["Dhaka", "Cairo", "New York", "London"]);
  const [cities] = useState([
    "Mirpur",
    "Nasr City",
    "Manhattan",
    "Westminster",
  ]);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string().required("Zip Code is required"),
    streetAddress: Yup.string().required("Street Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: showBillingAddress ? title === "BillingAddress" ? billingAddress?.fullname :  shippingAddress?.fullname : billingAddress?.fullname,
      email: showBillingAddress ?  title === "BillingAddress" ? billingAddress?.email :  shippingAddress?.email : billingAddress?.email,
      phone: showBillingAddress ?  title === "BillingAddress" ? billingAddress?.phone :  shippingAddress?.phone : billingAddress?.phone,
      country: showBillingAddress ?  title === "BillingAddress" ? billingAddress?.country : shippingAddress?.country : billingAddress?.country,
      state: showBillingAddress ?  title === "BillingAddress" ? billingAddress?.state :  shippingAddress?.state : billingAddress?.state,
      city: showBillingAddress ?  title === "BillingAddress" ? billingAddress?.city :  shippingAddress?.city : billingAddress?.city,
      zipcode: showBillingAddress ?  title === "BillingAddress" ? billingAddress?.zipcode :  shippingAddress?.zipcode : billingAddress?.zipcode,
      streetAddress: showBillingAddress ?  title === "BillingAddress" ? billingAddress?.streetAddress :  shippingAddress?.streetAddress : billingAddress?.streetAddress,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      // onSave(values);
      if (showBillingAddress) {
        axiosInstance
          .put("/users", {
            shippingAddress: values,
            billingAddress: showBillingAddress ? values : "",
          })
          .then((data) => {
            if (data?.data?.status) {
              showToast("success", "Shiping & Billing Address Added....");
              fetchAddresses()
            } else {
              showToast("error", "Somthing went wronge!!..");
            }
          });
      } else {
        if (title === "Billing Address") {
          axiosInstance
            .put("/users", {
              billingAddress: values
            })
            .then((data) => {
              if (data?.data?.status) {
                showToast("success", "Billing Address Added....");
                fetchAddresses()
              } else {
                showToast("error", "Somthing went wronge!!..");
              }
            });
        }
        if (title === "Shipping Address") {
          axiosInstance
            .put("/users", {
              shippingAddress: values,
            })
            .then((data) => {
              if (data?.data?.status) {
                showToast("success", "Shiping Address Added....");
                fetchAddresses()
              } else {
                showToast("error", "Somthing went wronge!!..");
              }
            });
        }
      }
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-semibold mb-4">Address</h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Full Name *</label>
            <input
              type="text"
              name="fullname"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("fullname")}
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <p className="text-red-500 text-xs">{formik.errors.fullname}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email *</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone *</label>
            <input
              type="text"
              name="phone"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Country *</label>
            <select
              name="country"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("country")}
            >
              <option value="">-- Select Country --</option>
              {countries.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-xs">{formik.errors.country}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">State *</label>
            <select
              name="state"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("state")}
            >
              <option value="">-- Select State --</option>
              {states.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {formik.touched.state && formik.errors.state && (
              <p className="text-red-500 text-xs">{formik.errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">City *</label>
            <select
              name="city"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("city")}
            >
              <option value="">-- Select City --</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-xs">{formik.errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Zip Code *</label>
            <input
              type="text"
              name="zipcode"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("zipcode")}
            />
            {formik.touched.zipcode && formik.errors.zipcode && (
              <p className="text-red-500 text-xs">{formik.errors.zipcode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Street Address *
            </label>
            <input
              type="text"
              name="streetAddress"
              className="w-full p-2 border rounded"
              {...formik.getFieldProps("streetAddress")}
            />
            {formik.touched.streetAddress && formik.errors.streetAddress && (
              <p className="text-red-500 text-xs">
                {formik.errors.streetAddress}
              </p>
            )}
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormCheckout;
