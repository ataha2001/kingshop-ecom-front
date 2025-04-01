// utils/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use an environment variable for the base URL
  timeout: 80000, // Set a request timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to the instance
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Retrieve token from cookies
    // console.log("token=", token);

    if (token) {
      console.log("token1", token);
      
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    console.log("Config Headers:", config?.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // For example, add the token dynamically from cookies or localStorage
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response.data, // Return the data directly
//   (error) => {
//     // Handle errors globally
//     if (error.response) {
//       console.error("API Error:", error.response.data);
//     } else if (error.request) {
//       console.error("Network Error:", error.request);
//     } else {
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
