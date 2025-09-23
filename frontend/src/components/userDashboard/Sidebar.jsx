import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {toast} from "react-hot-toast"
import api from "../../config/api";
import {
  Menu,
  Home,
  Utensils,
  Heart,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = ({ active, setActive }) => {
  const { user, setUser, setIsLogin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    console.log("calling Logout");
    try {
      const res = await api.get("/auth/logOut");
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("BhojanUser");
      toast.success("Logout Succesfull");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  const menuItems = [
    { name: "Home", icon: <Home className="w-5 h-5" /> },
    { name: "Orders", icon: <Utensils className="w-5 h-5" /> },
    { name: "Favorites", icon: <Heart className="w-5 h-5" /> },
    { name: "Wallet", icon: <Wallet className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 80 }}
        className="bg-base-100 shadow-lg p-4 flex flex-col transition-all duration-1 overflow-hidden "
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-ghost btn-circle mb-6"
        >
          <Menu />
        </button>
        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-3 btn btn-ghost justify-start"
            >
              {item.icon}
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
        <button
          className="btn btn-error btn-outline mt-auto flex items-center gap-2 mb-5"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && "Logout"}
        </button>
      </motion.aside>
    </>
  );
};

export default Sidebar;
