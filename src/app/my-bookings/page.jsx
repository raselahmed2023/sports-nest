"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "../../components/PrivateRoute";

const MyBookingContent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load bookings:", error);
        toast.error("Failed to load bookings.");
        setLoading(false);
      });
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data.deletedCount > 0) {
      setBookings((previousBookings) =>
        previousBookings.filter((booking) => booking._id !== id)
      );
      toast.success("Booking cancelled successfully.");
    } else {
      toast.error("Failed to cancel booking.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-success"></span>
          <p className="mt-3 text-base-content/60">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

        {!bookings.length && (
          <div className="text-center py-20 bg-base-100 rounded-2xl">
            <h2 className="text-2xl font-bold">No bookings found</h2>
            <p className="text-base-content/60 mt-2">
              You have not booked any facility yet.
            </p>
          </div>
        )}

        {!!bookings.length && (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-base-100 border border-base-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div>
                    <h2 className="text-xl font-bold">
                      {booking.facility_name}
                    </h2>
                    <p className="text-sm text-base-content/60 mt-1">
                      {booking.booking_date}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 capitalize">
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-base-content/70">
                  <p>Slot: {booking.time_slot}</p>
                  <p>Hours: {booking.hours}</p>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <p className="text-lg font-bold text-green-600">
                    Taka {booking.total_price}
                  </p>

                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="btn btn-sm btn-error text-white rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MyBooking = () => {
  return (
    <PrivateRoute>
      <MyBookingContent />
    </PrivateRoute>
  );
};

export default MyBooking;