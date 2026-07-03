"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "../../components/PrivateRoute";

const MyBookingContent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    document.getElementById("cancel_booking_modal").showModal();
  };

  const closeCancelModal = () => {
    document.getElementById("cancel_booking_modal").close();
    setSelectedBooking(null);
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking?._id) return;

    try {
      setCancelLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${selectedBooking._id}`,
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
          previousBookings.filter(
            (booking) => booking._id !== selectedBooking._id
          )
        );

        toast.success("Booking cancelled successfully.");
        closeCancelModal();
      } else {
        toast.error("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCancelLoading(false);
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
        <div className="text-center mb-8">
          <p className="text-green-600 font-semibold uppercase tracking-wide text-sm">
            Booking Dashboard
          </p>
          <h1 className="text-3xl font-bold mt-2">My Bookings</h1>
          <p className="text-base-content/60 mt-2">
            Review your booked facilities and cancel reservations when needed.
          </p>
        </div>

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
                    {booking.status || "pending"}
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
                    onClick={() => openCancelModal(booking)}
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

      <dialog id="cancel_booking_modal" className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-xl">Cancel Booking?</h3>

          <p className="text-base-content/60 mt-3">
            Are you sure you want to cancel your booking for{" "}
            <span className="font-semibold text-base-content">
              {selectedBooking?.facility_name}
            </span>
            ?
          </p>

          <div className="bg-base-200 rounded-xl p-4 mt-4 text-sm space-y-1">
            <p>Date: {selectedBooking?.booking_date}</p>
            <p>Slot: {selectedBooking?.time_slot}</p>
            <p>Price: Taka {selectedBooking?.total_price}</p>
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={closeCancelModal}
              className="btn btn-ghost"
              disabled={cancelLoading}
            >
              Keep Booking
            </button>

            <button
              type="button"
              onClick={handleCancelBooking}
              disabled={cancelLoading}
              className="btn btn-error text-white"
            >
              {cancelLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Cancelling...
                </>
              ) : (
                "Yes, Cancel"
              )}
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
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