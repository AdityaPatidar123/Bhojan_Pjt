import React, { useEffect, useState } from "react";
import api from "../config/api";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/public/getAllResturant");
        setRestaurants(res.data.data || []);
      } catch (err) {
        setError("Failed to fetch restaurants");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-error">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {restaurants.map((rest) => (
        <div key={rest._id} className="bg-base-100 rounded-xl shadow-lg p-6 flex flex-col gap-3">
          <img
            src={rest.images?.[0] || "/default-restaurant.jpg"}
            alt={rest.resturantName}
            className="w-full h-48 object-cover rounded-xl mb-2"
          />
          <h2 className="text-xl font-bold text-primary mb-1">{rest.resturantName}</h2>
          <p className="text-base-content/70">{rest.address}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge badge-outline">{rest.cuisine}</span>
            <span className="badge badge-outline">{rest.foodType}</span>
            <span className={`badge ${rest.status === "active" ? "badge-success" : "badge-error"}`}>
              {rest.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Restaurant;
