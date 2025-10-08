import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import api from "../../../config/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Basic Info", "Manager", "Location", "Images"];

const EditRestaurantModal = ({ isOpen, onClose, restaurant }) => {
  const [step, setStep] = useState(0);

  const [restaurantData, setRestaurantData] = useState({
    resturantName: "",
    address: "",
    lat: "",
    lon: "",
    cuisine: "",
    foodType: "veg",
    managerName: "",
    managerPhone: "",
    receptionPhone: "",
    email: "",
    status: "active",
    openingTime: "",
    closingTime: "",
    averageCostForTwo: 0,
    openingStatus: "open",
    resturantType: "all",
    GSTNo: "",
    FSSAINo: "",
    upiId: "",
    bankAccNumber: "",
    ifscCode: "",
  });

  const [managerImagePreview, setManagerImagePreview] = useState(null);
  const [restaurantImagesPreview, setRestaurantImagesPreview] = useState([]);
  const [managerImageFiles, setManagerImageFiles] = useState("");
  const [restaurantImageFiles, setRestaurantImageFiles] = useState([]);

  useEffect(() => {
    if (restaurant) {
      setRestaurantData((prev) => ({
        ...prev,
        ...restaurant,
      }));
      setManagerImagePreview(restaurant.managerImage || null);
      setRestaurantImagesPreview(restaurant.restaurantImages || []);
    }
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleRestaurantImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const FileUrl = URL.createObjectURL(file);
      setRestaurantImagesPreview((prev) => [...prev, FileUrl]);
    });
    setRestaurantImageFiles(files);
  };

  const handleManagerImageChange = (e) => {
    const files = e.target.files;
    setManagerImagePreview(URL.createObjectURL(files[0]));
    setManagerImageFiles(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(restaurantData).forEach((key) =>
        formData.append(key, restaurantData[key])
      );
      if (managerImageFiles) {
        formData.append("managerImage", managerImageFiles);
      }
      restaurantImageFiles.forEach((file) =>
        formData.append("restaurantImages", file)
      );

      const res = await api.put(
        `/admin/updateResturant/${restaurant._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(res.data.message || "Restaurant updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="bg-white w-full h-full flex flex-col rounded-none shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-primary text-primary-content">
              <h2 className="text-lg font-semibold">Edit Restaurant</h2>
              <button onClick={onClose} className="hover:opacity-80">
                <RxCrossCircled className="text-2xl" />
              </button>
            </div>

            {/* Stepper */}
            <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-50">
              {steps.map((s, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm font-bold ${
                      i === step
                        ? "bg-primary text-white"
                        : i < step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <p
                    className={`mt-1 text-xs ${
                      i <= step ? "text-primary font-medium" : "text-gray-400"
                    }`}
                  >
                    {s}
                  </p>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <form className="h-full flex flex-col" onSubmit={handleSubmit}>
                {/* ⚡ Reuse your existing step components (Basic Info, Manager, etc.) here */}

                {/* Step Controls */}
                <div
                  className={`mt-auto flex items-center pt-6 ${
                    step === steps.length - 1
                      ? "justify-evenly"
                      : "justify-between"
                  }`}
                >
                  {step > 0 ? (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={prevStep}
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success">
                      Update Restaurant
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditRestaurantModal;
