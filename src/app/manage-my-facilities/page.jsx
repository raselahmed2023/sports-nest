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
        setFacilities(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load facilities:", error);
        toast.error("Failed to load your facilities.");
        setLoading(false);
      });
  }, []);

  const handleDeletedFacility = (deletedId) => {
    setFacilities((previousFacilities) =>
      previousFacilities.filter((facility) => facility._id !== deletedId)
    );
  };

  const handleUpdatedFacility = (updatedFacility) => {
    setFacilities((previousFacilities) =>
      previousFacilities.map((facility) =>
        facility._id === updatedFacility._id ? updatedFacility : facility
      )
    );
  };

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
        <div className="text-center mb-8">
          <p className="text-green-600 font-semibold uppercase tracking-wide text-sm">
            Owner Dashboard
          </p>

          <h1 className="text-3xl font-bold mt-2">Manage My Facilities</h1>

          <p className="text-base-content/60 mt-2">
            Update or remove facilities you have listed on SportNest.
          </p>
        </div>

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
              <ManageFacilityCard
                key={facility._id}
                facility={facility}
                onDeleted={handleDeletedFacility}
                onUpdated={handleUpdatedFacility}
              />
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