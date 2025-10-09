import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ViewRestaurant = ({ isOpen, onClose, restaurant }) => {
  if (!isOpen || !restaurant) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Restaurant Details</h2>
            <button className="btn btn-sm btn-ghost" onClick={onClose}>✕</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={restaurant.images?.[0] || "/default-restaurant.jpg"}
                alt={restaurant.resturantName}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="space-y-2">
                <div><span className="font-semibold">Name:</span> {restaurant.resturantName}</div>
                <div><span className="font-semibold">Address:</span> {restaurant.address}</div>
                <div><span className="font-semibold">Cuisine:</span> {restaurant.cuisine}</div>
                <div><span className="font-semibold">Food Type:</span> {restaurant.foodType}</div>
                <div><span className="font-semibold">Status:</span> <span className={`badge ${restaurant.status === "active" ? "badge-success" : "badge-error"}`}>{restaurant.status}</span></div>
                <div><span className="font-semibold">Opening Time:</span> {restaurant.openingTime}</div>
                <div><span className="font-semibold">Closing Time:</span> {restaurant.closingTime}</div>
                <div><span className="font-semibold">Average Cost For Two:</span> ₹{restaurant.averageCostForTwo}</div>
                <div><span className="font-semibold">Opening Status:</span> {restaurant.openingStatus}</div>
                <div><span className="font-semibold">Type:</span> {restaurant.resturantType}</div>
              </div>
            </div>
            <div className="space-y-2">
              <div><span className="font-semibold">Manager Name:</span> {restaurant.managerName}</div>
              <div><span className="font-semibold">Manager Phone:</span> {restaurant.managerPhone}</div>
              <div><span className="font-semibold">Reception Phone:</span> {restaurant.receptionPhone}</div>
              <div><span className="font-semibold">Email:</span> {restaurant.email}</div>
              <div><span className="font-semibold">GST No:</span> {restaurant.GSTNo}</div>
              <div><span className="font-semibold">FSSAI No:</span> {restaurant.FSSAINo}</div>
              <div><span className="font-semibold">UPI ID:</span> {restaurant.upiId}</div>
              <div><span className="font-semibold">Bank Account Number:</span> {restaurant.bankAccNumber}</div>
              <div><span className="font-semibold">IFSC Code:</span> {restaurant.ifscCode}</div>
              <div className="mt-4">
                <span className="font-semibold">Manager Image:</span>
                {restaurant.managerImage && (
                  <img src={restaurant.managerImage} alt="Manager" className="w-24 h-24 rounded-full mt-2 object-cover" />
                )}
              </div>
              <div className="mt-4">
                <span className="font-semibold">All Images:</span>
                <div className="flex gap-2 flex-wrap mt-2">
                  {restaurant.images && restaurant.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Restaurant ${idx}`} className="w-20 h-20 rounded-lg object-cover" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


export default ViewRestaurant;