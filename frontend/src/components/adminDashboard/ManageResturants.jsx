import React, { useState, useEffect } from "react";
import AddResturantModal from "./modals/AddResturantModal";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus, Eye, Hand } from "lucide-react";
import EditResturantModal from "./modals/EditRestaurantModal";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import ViewRestaurantModal from "./modals/ViewRestaurant";

const dummyData = [
  {
    id: 1,
    name: "Spicy Villa",
    owner: "Amit Sharma",
    address: "123 Main St, Indore",
    phone: "9876543210",
    status: "Active",
  },
  {
    id: 2,
    name: "Green Bowl",
    owner: "Priya Verma",
    address: "456 Park Ave, Bhopal",
    phone: "9123456780",
    status: "Inactive",
  },
];

const ManageRestaurants = () => {
  const [isAddRestaurantModalOpen, setIsAddRestaurantModalOpen] =
    useState(false);
  const [isEditRestaurantModalOpen, setIsEditRestaurantModalOpen] =
    useState(false);
  const [isViewRestaurantModalOpen, setIsViewRestaurantModalOpen] =
    useState(false);
  const [viewRestaurant, setViewRestaurant] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantsList, setRestaurantsList] = useState(dummyData);

  const fetchResturants = async () => {
    try {
      const response = await api.get("/admin/getallrestaurants");
      toast.success(response.data.message);
      setRestaurantsList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
      setRestaurantsList(dummyData); // Fallback to dummy data on error
    }
  };

  const HandleDelete = (id) => async () => {
    try {
      const response = await api.delete(`/admin/deleteRestaurant/${id}`);
      toast.success(response.data.message);
      fetchResturants();
    } catch (error) {
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  useEffect(() => {
    if (!isAddRestaurantModalOpen && !isEditRestaurantModalOpen) fetchResturants();
   
  }, [isAddRestaurantModalOpen, isEditRestaurantModalOpen]);
  // useEffect(() => {
  //   if (!isEditRestaurantModalOpen) fetchResturants();
  // }, [isEditRestaurantModalOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-base-100 rounded-3xl shadow-xl min-h-screen flex flex-col w-full "
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-primary">Manage Restaurants</h2>
        <button
          className="btn btn-primary flex items-center gap-2 rounded-full px-4 py-2 shadow-md hover:scale-105 transition-transform"
          onClick={() => setIsAddRestaurantModalOpen(true)}
        >
          <Plus className="w-5 h-5" /> Add Restaurant
        </button>
      </div>
      <AddResturantModal
        isOpen={isAddRestaurantModalOpen}
        onClose={() => setIsAddRestaurantModalOpen(false)}
      />

      {/* Table */}
      <div className="flex-1 overflow-auto rounded-2xl w-full shadow-inner">
        <table className="table w-full rounded-2xl overflow-hidden">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurantsList.map((rest) => (
              <motion.tr
                key={rest._id || rest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-base-200/50 transition-colors rounded-xl"
              >
                <td className="font-semibold">{rest.resturantName}</td>
                <td>{rest.managerName}</td>
                <td>{rest.address}</td>
                <td>{rest.managerPhone}</td>
                <td>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`px-3 py-1 rounded-full text-xs font-bold cursor-default select-none ${
                      rest.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {rest.status}
                  </motion.span>
                </td>
                <td>
                  <div className="flex gap-5">
                    <button
                      className="btn btn-sm btn-outline btn-info flex items-center gap-1 rounded-full hover:scale-105 transition-transform "
                      onClick={() => {
                        setSelectedRestaurant(rest);
                        setIsEditRestaurantModalOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <EditResturantModal
                      isOpen={isEditRestaurantModalOpen}
                      onClose={() => setIsEditRestaurantModalOpen(false)}
                      restaurant={selectedRestaurant}
                    />

                    <button
                      className="btn btn-sm btn-outline btn-secondary flex items-center gap-1 rounded-full hover:scale-105 transition-transform"
                      onClick={() => {
                        setViewRestaurant(rest);
                        setIsViewRestaurantModalOpen(true);
                      }}
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <ViewRestaurantModal
                      isOpen={isViewRestaurantModalOpen}
                      onClose={() => setIsViewRestaurantModalOpen(false)}
                      restaurant={viewRestaurant}
                    />
                    <button
                      className="btn btn-sm btn-outline btn-error flex items-center gap-1 rounded-full hover:scale-105 transition-transform"
                      onClick={HandleDelete(rest._id || rest.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageRestaurants;
