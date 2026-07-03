"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ManageFacilityCard from "../../components/ManageFacilityCard";
import PrivateRoute from "../../components/PrivateRoute";

const ManageMyFacilitiesContent = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-facilities`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFacilities(data);
        } else {
          console.log("Server response:", data);
          setFacilities([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load facilities:", error);
        toast.error("Failed to load your facilities.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-success"></span>
          <p className="mt-3 text-base-content/60">
            Loading your facilities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Manage My Facilities
        </h1>

        {facilities.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-2xl">
            <h2 className="text-2xl font-bold">No facilities added yet</h2>
            <p className="text-base-content/60 mt-2">
              Add your first sports facility and start receiving bookings.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <ManageFacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ManageMyFacilities() {
  return (
    <PrivateRoute>
      <ManageMyFacilitiesContent />
    </PrivateRoute>
  );
}