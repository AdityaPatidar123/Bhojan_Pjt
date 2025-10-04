import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddResturantModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    resturantName: "",
    address: "",
    lat: "",
    lon: "",
    cuisine: "",
    foodType: "veg",
    managerName: "",
    managerPhone: "",
    managerImage: "",
    receptionPhone: "",
    email: "",
    images: [],
    status: "active",
    openingTime: "09:00 AM",
    closingTime: "09:00 PM",
    averageCostForTwo: 0,
    openingStatus: "open",
    resturantType: "all",
    GSTNo: "",
    FSSAINo: "",
    upiId: "",
    bankAccNumber: "",
    ifscCode: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "images") {
        setForm((prev) => ({ ...prev, images: Array.from(files) }));
      } else {
        setForm((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd && onAdd(form);
    setForm({
      resturantName: "",
      address: "",
      lat: "",
      lon: "",
      cuisine: "",
      foodType: "veg",
      managerName: "",
      managerPhone: "",
      managerImage: "",
      receptionPhone: "",
      email: "",
      images: [],
      status: "active",
      openingTime: "09:00 AM",
      closingTime: "09:00 PM",
      averageCostForTwo: 0,
      openingStatus: "open",
      resturantType: "all",
      GSTNo: "",
      FSSAINo: "",
      upiId: "",
      bankAccNumber: "",
      ifscCode: "",
    });
    onClose && onClose();
  };

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-primary">Add Restaurant</h3>
            <button className="btn btn-sm btn-ghost" onClick={onClose}>
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            <input type="text" name="resturantName" placeholder="Restaurant Name" className="input w-full" value={form.resturantName} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" className="input w-full" value={form.address} onChange={handleChange} required />
            <div className="flex gap-2">
              <input type="text" name="lat" placeholder="Latitude" className="input w-full" value={form.lat} onChange={handleChange} required />
              <input type="text" name="lon" placeholder="Longitude" className="input w-full" value={form.lon} onChange={handleChange} required />
            </div>
            <input type="text" name="cuisine" placeholder="Cuisine" className="input w-full" value={form.cuisine} onChange={handleChange} required />
            <select name="foodType" className="select w-full" value={form.foodType} onChange={handleChange} required>
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
              <option value="eggetarian">Eggetarian</option>
              <option value="vegan">Vegan</option>
              <option value="jain">Jain</option>
              <option value="any">Any</option>
            </select>
            <input type="text" name="managerName" placeholder="Manager Name" className="input w-full" value={form.managerName} onChange={handleChange} required />
            <input type="text" name="managerPhone" placeholder="Manager Phone" className="input w-full" value={form.managerPhone} onChange={handleChange} required />
            <input type="text" name="receptionPhone" placeholder="Reception Phone" className="input w-full" value={form.receptionPhone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="input w-full" value={form.email} onChange={handleChange} required />
            <input type="file" name="managerImage" className="file-input w-full" onChange={handleChange} required />
            <input type="file" name="images" className="file-input w-full" multiple onChange={handleChange} required />
            <select name="status" className="select w-full" value={form.status} onChange={handleChange} required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex gap-2">
              <input type="text" name="openingTime" placeholder="Opening Time" className="input w-full" value={form.openingTime} onChange={handleChange} required />
              <input type="text" name="closingTime" placeholder="Closing Time" className="input w-full" value={form.closingTime} onChange={handleChange} required />
            </div>
            <input type="number" name="averageCostForTwo" placeholder="Average Cost For Two" className="input w-full" value={form.averageCostForTwo} onChange={handleChange} required />
            <select name="openingStatus" className="select w-full" value={form.openingStatus} onChange={handleChange} required>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <select name="resturantType" className="select w-full" value={form.resturantType} onChange={handleChange} required>
              <option value="dine-in">Dine-In</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
              <option value="all">All</option>
            </select>
            <input type="text" name="GSTNo" placeholder="GST Number" className="input w-full" value={form.GSTNo} onChange={handleChange} required />
            <input type="text" name="FSSAINo" placeholder="FSSAI Number" className="input w-full" value={form.FSSAINo} onChange={handleChange} required />
            <input type="text" name="upiId" placeholder="UPI ID" className="input w-full" value={form.upiId} onChange={handleChange} required />
            <input type="text" name="bankAccNumber" placeholder="Bank Account Number" className="input w-full" value={form.bankAccNumber} onChange={handleChange} required />
            <input type="text" name="ifscCode" placeholder="IFSC Code" className="input w-full" value={form.ifscCode} onChange={handleChange} required />
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddResturantModal;
