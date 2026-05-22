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

  const total = hours * facility.price_per_hour;
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    if (!date || !slot) {
      toast.error("Please fill all fields");
      return;
    }

    const bookingInfo = {
      facility_id: facility._id,
      facility_name: facility.name,
      user_email: user.email,
      booking_date: date,
      time_slot: slot,
      hours,
      total_price: total,
      status: "pending",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookingInfo),
      }
    );

    const data = await res.json();

    if (data.insertedId) {
      toast.success("Booking Confirmed");
      router.push("/my-bookings");

    }
  };

  return (
    <div className="card bg-base-100 shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-5 text-center"> Book Facility </h2>

      <form onSubmit={handleSubmit} className="space-y-4" >
        <div>

          <label className="font-medium text-sm">
            Facility
          </label>

          <input
            type="text"
            value={facility.name}
            readOnly
            className="input input-bordered w-full mt-1 bg-base-200"
          />
        </div>


        <div>
          <label className="font-medium text-sm">Date </label>

          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full mt-1" />
        </div>


        <div>
          <label className="font-medium text-sm">
            Time Slot
          </label>

          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="select select-bordered w-full mt-1">

            <option value="">
              Select Slot
            </option>

            {facility.available_slots?.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}

          </select>
        </div>


        <div>
          <label className="font-medium text-sm">
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
        </div>


        <div className="bg-base-200 p-4 rounded-xl">
          <p> Price Per Hour: ৳ {facility.price_per_hour}</p>
          <p className="font-bold text-green-600 mt-1">Total: ৳ {total}</p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-green-600/20 w-full">
          Confirm Booking
        </button>

      </form>

    </div>
  );
}