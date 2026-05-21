"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingForm({ facility }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);

  const total = hours * facility.price_per_hour;
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // login check
    if (!user) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }

    // validation
    if (!date || !slot) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          facility_id:   facility._id,
          facility_name: facility.name,
          user_email:    user.email,
          booking_date:  date,
          time_slot:     slot,
          hours:         hours,
          total_price:   total,
          status:        "pending",
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Booking confirmed! 🎉");
      router.push("/my-bookings");

    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold text-lg mb-4">📅 Book this facility</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Facility name */}
        <div className="form-control">
          <label className="label-text font-medium text-sm mb-1 block">Facility</label>
          <input
            value={facility.name}
            readOnly
            className="input input-bordered bg-base-200 text-base-content/50 cursor-not-allowed w-full"
          />
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label-text font-medium text-sm mb-1 block">
            Date <span className="text-error">*</span>
          </label>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full focus:outline-none focus:border-green-600"
          />
        </div>

        {/* Time slot */}
        <div className="form-control">
          <label className="label-text font-medium text-sm mb-1 block">
            Time Slot <span className="text-error">*</span>
          </label>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="select select-bordered w-full focus:outline-none focus:border-green-600"
          >
            <option value="">-- Select a slot --</option>
            {facility.available_slots?.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Hours */}
        <div className="form-control">
          <label className="label-text font-medium text-sm mb-1 block">Hours</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHours(h)}
                className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all ${
                  hours === h
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-base-200 border-base-300 hover:border-green-400"
                }`}
              >
                {h}hr
              </button>
            ))}
          </div>
        </div>

        {/* Total price */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex justify-between text-sm text-base-content/60 mb-1">
            <span>৳{facility.price_per_hour} × {hours} hr</span>
            <span>= ৳{total}</span>
          </div>
          <div className="flex justify-between font-bold text-base-content border-t border-green-200 pt-2">
            <span>Total</span>
            <span className="text-green-600 text-lg">৳{total}</span>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="btn bg-green-600 hover:bg-green-700 text-white rounded-full border-none"
        >
          {loading
            ? <span className="loading loading-spinner loading-sm" />
            : "Confirm Booking"
          }
        </button>

        {/* Not logged in hint */}
        {!user && (
          <p className="text-xs text-center text-base-content/40">
            <a href="/login" className="text-green-600 hover:underline">Login</a> to book
          </p>
        )}

      </form>
    </div>
  );
}