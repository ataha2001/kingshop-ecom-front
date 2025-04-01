import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdClose } from "react-icons/md";
import { axiosInstance } from "@/libs/axiosInstance";
import { useParams } from "next/navigation";

const ProdctVideos = ({ashraf}) => {
        
  const [videos, setVideos] = useState(ashraf)
  const [videoId, setVideoId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const params = useParams()

  
  const getVideos = async()=>{
    try {
      const response = await axiosInstance.get(`/products/${params.slug[1]}/videos`)
        if(response?.data?.status){
            setVideos(response?.data?.data)
        }
      
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }
  useEffect(() => {
    getVideos()
  }, [])
  
  const initialValues = {
    provider: editingVideo?.provider || "",
    link: editingVideo?.link || "",
  }
  const openModal = (video, id) => {
    setEditingVideo(video);
    if(video){
      setVideoId(video._id);

    }else{
      // Formik.resetForm()
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingVideo(null);
    setIsModalOpen(false);
  };

  const handleSave = (values) => {
    if (editingVideo) {
      // Update existing video
      // setVideos((prev) =>
      //   prev.map((video) =>
      //     video.id === editingVideo.id ? { ...editingVideo, ...values } : video
      //   )
      // );
      axiosInstance.put(`/products/${params.slug[1]}/videos/${videoId}`, values).then((data)=>{
        if (data?.data?.status){
          alert('Video Updated Successfully')
          getVideos()
        }
      })
    } else {
      // Add new video
      setVideos((prev) => [
        ...prev,
        { id: Date.now(), ...values }, // Generate unique ID
      ]);
      axiosInstance.post(`/products/${params.slug[1]}/videos`,{videos:values}).then((data)=>{
        if(data?.data?.status){
          alert("Video Added To Product Successfully .......")
          getVideos()
        }
      })
    }
    closeModal();
  };

  const handleDelete = (id) => {
    axiosInstance.delete(`/products/${params.slug[1]}/videos/${id}`).then((data)=>{
      if (data?.data?.status){
        alert('Video Deleted Successfully')
        getVideos()
      }
    })
    // setVideos((prev) => prev.filter((video) => video.id !== id));
  };

  const validationSchema = Yup.object().shape({
    provider: Yup.string().required("Video provider is required"),
    link: Yup.string().url("Invalid URL format").required("Link is required"),
  });

  return (
    <div className="container mx-auto ">
      <div className="bg-white shadow-md rounded-lg px-6 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 border-b-2 pb-2 pt-0">
          <h2 className="text-lg font-semibold">Video</h2>
          <button
            onClick={() => openModal()}
            className="bg-orange-500 hove:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" /> Add Video
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">VIDEO PROVIDER</th>
                <th className="py-2 px-4 border-b text-left">LINK</th>
                <th className="py-2 px-4 border-b text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {videos?.map((video, index) => (
                <tr key={index}>

                  
                  <td className="py-2 px-4 border-b">{video.provider}</td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={video?.link}
                      className="text-blue-500 break-words"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {video?.link}
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openModal(video)}
                      className="bg-green-100 text-green-500 px-2 py-1 rounded mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(video?._id)
}
                      }
                      className="bg-red-100 text-red-500 px-2 py-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Showing 1 to {videos?.length} of {videos?.length} entries
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6">
          <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold mb-4">
              {editingVideo ? "Edit Video" : "Add Video"}
            </h3>
            <button
                      type="button"
                      onClick={closeModal}
                      className="bg-white-200 hover:text-red-500 flex items-center gap-2 text-xl text-gray-700 mb-4 rounded mr-2"
                    >
                    <MdClose />
                    </button>
            </div>
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={handleSave}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Video Provider *
                    </label>
                    <Field
                      as="select"
                      name="provider"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">-- Select Provider --</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Vimeo">Vimeo</option>
                    </Field>
                    <ErrorMessage
                      name="provider"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Link *
                    </label>
                    <Field
                      as="textarea"
                      name="link"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                    />
                    <ErrorMessage
                      name="link"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-200 hover:bg-gray-400 flex items-center gap-2 text-gray-700 px-4 py-2 rounded mr-2"
                    >
                    <MdClose />
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2 text-white px-4 py-2 rounded-md"
                    >
                    <FaSave />
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProdctVideos;
