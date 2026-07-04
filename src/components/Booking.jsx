"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbCoinTaka } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";

export default function BookingForm({ facility }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const pricePerHour = Number(facility.price_per_hour) || 0;
  const total = Number(hours) * pricePerHour;
  const today = new Date().toISOString().split("T")[0];
  const hasSlots = facility.available_slots?.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPending) {
      toast.error("Please wait while we check your session.");
      return;
    }

    if (!user) {
      toast.error("Please login first.");
      router.push(
        `/login?redirect=${encodeURIComponent(`/facility/${facility._id}`)}`
      );
      return;
    }

    if (!date) {
      toast.error("Please select a booking date.");
      return;
    }

    if (!slot) {
      toast.error("Please select a time slot.");
      return;
    }

    if (!hours || Number(hours) < 1) {
      toast.error("Please select valid booking hours.");
      return;
    }

    const bookingInfo = {
      facility_id: facility._id,
      facility_name: facility.name,
      user_email: user.email,
      booking_date: date,
      time_slot: slot,
      hours: Number(hours),
      total_price: total,
      status: "pending",
    };

    try {
      setSubmitting(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookingInfo),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Booking confirmed successfully.");
        router.push("/my-bookings");
      } else {
        toast.error(data.message || "Failed to confirm booking.");
      }
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm rounded-3xl p-6">
      <div className="text-center mb-6">
        <p className="text-green-600 font-semibold uppercase tracking-wide text-xs">
          Reserve Slot
        </p>

        <h2 className="text-2xl font-bold text-base-content mt-1">
          Book Facility
        </h2>

        <p className="text-sm text-base-content/60 mt-2">
          Choose your date, slot and duration to confirm your booking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-sm text-base-content">
            Facility
          </label>

          <input
            type="text"
            value={facility.name || ""}
            readOnly
            className="input input-bordered w-full mt-1 bg-base-200 text-base-content/70 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="font-semibold text-sm text-base-content flex items-center gap-1">
            <MdOutlineDateRange />
            Booking Date
          </label>

          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label className="font-semibold text-sm text-base-content flex items-center gap-1">
            <IoTimeOutline />
            Time Slot
          </label>

          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            disabled={!hasSlots}
            className="select select-bordered w-full mt-1"
          >
            <option value="">
              {hasSlots ? "Select Slot" : "No slots available"}
            </option>

            {facility.available_slots?.map((availableSlot, index) => (
              <option key={index} value={availableSlot}>
                {availableSlot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold text-sm text-base-content">
            Hours
          </label>

          <input
            type="number"
            value={hours}
            min="1"
            max="4"
            onChange={(e) => setHours(Number(e.target.value))}
            className="input input-bordered w-full mt-1"
          />

          <p className="text-xs text-base-content/50 mt-1">
            You can book between 1 and 4 hours.
          </p>
        </div>

        <div className="bg-base-200 border border-base-300 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-sm text-base-content/70">
            <span className="flex items-center gap-1">
              <TbCoinTaka />
              Price Per Hour
            </span>

            <span>৳ {pricePerHour}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-base-content/70">
            <span>Duration</span>
            <span>{hours} hour{Number(hours) > 1 ? "s" : ""}</span>
          </div>

          <div className="border-t border-base-300 pt-3 flex items-center justify-between">
            <span className="font-bold text-base-content">Total Price</span>
            <span className="font-bold text-green-600 text-xl">৳ {total}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || isPending || !hasSlots}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-green-600/20 w-full flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Confirming...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>

        {!user && (
          <p className="text-xs text-center text-base-content/50">
            You need to login before confirming a booking.
          </p>
        )}
      </form>
    </div>
  );
}