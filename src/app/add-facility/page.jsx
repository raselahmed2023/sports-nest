"use client";

import React, { useState } from "react";
import { authClient } from "../../lib/auth-client";

const FACILITY_TYPES = [
  { value: "football", label: "Football Turf" },
  { value: "badminton", label: "Badminton Court" },
  { value: "cricket", label: "Cricket Indoor" },
  { value: "swimming", label: "Swimming Lane" },
];

const TIME_SLOT_GROUPS = {
  "Morning Slots": ["06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM"],
  "Afternoon Slots": ["04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM"],
  "Night Slots": ["07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM", "09:00 PM - 10:00 PM"],
};

export default function AddFacilityPage() {

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [addedSlots, setAddedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleAddSlot = () => {
    if (selectedSlot && !addedSlots.includes(selectedSlot)) {
      setAddedSlots([...addedSlots, selectedSlot]);
      setSelectedSlot("");
    }
  };

  const handleRemoveSlot = (slotToRemove) => {
    setAddedSlots(addedSlots.filter((slot) => slot !== slotToRemove));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const facility = Object.fromEntries(formData.entries());

   
    facility.available_slots = addedSlots;
    facility.price_per_hour = Number(facility.price_per_hour);
    facility.capacity = Number(facility.capacity);
    facility.booking_count = 0;


    const res = await fetch("http://localhost:8000/facilities", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(facility),
    });

    const data = await res.json();
 
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        <div>
          <h1 className="text-xl font-bold text-center mb-4 text-base-content">
            Add New Facility
          </h1>
        </div>

        <form onSubmit={onSubmit}>
          <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl overflow-hidden">

         
            <div className="navbar bg-base-200/50 px-6 py-3 border-b border-base-300 min-h-0">
              <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-base-content/50 uppercase">
                 Basic Information
              </span>
            </div>

            <div className="card-body p-6 gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="form-control w-full">
                  <label className="label py-1">
                    <span className="label-text font-semibold text-sm">
                      Facility Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Green Arena Turf A"
                    className="input input-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200"
                  />
                </div>

                
                <div className="form-control w-full">
                  <label className="label py-1">
                    <span className="label-text font-semibold text-sm">
                      Facility Type <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    name="facility_type"
                    className="select select-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200"
                  >
                    <option value="">Select sport type</option>
                    {FACILITY_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-semibold text-sm">
                    Description <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the facility..."
                  className="textarea textarea-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 min-h-28 resize-y transition-all duration-200"
                />
              </div>
            </div>

            <div className="divider my-0" />

            
            <div className="navbar bg-base-200/50 px-6 py-3 border-b border-base-300 min-h-0">
              <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-base-content/50 uppercase">
               Location & Pricing
              </span>
            </div>

            <div className="card-body p-6 gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

               
                <div className="form-control w-full">
                  <label className="label py-1">
                    <span className="label-text font-semibold text-sm">
                      Location <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="input input-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200"
                  />
                </div>

               
                <div className="form-control w-full">
                  <label className="label py-1">
                    <span className="label-text font-semibold text-sm">
                      Max Capacity <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    placeholder="Maximum players count"
                    min="1"
                    className="input input-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200"
                  />
                </div>
              </div>

             
              <div className="form-control w-full max-w-xs">
                <label className="label py-1">
                  <span className="label-text font-semibold text-sm">
                    Price Per Hour (৳) <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  name="price_per_hour"
                  placeholder="e.g. 1200"
                  min="0"
                  className="input input-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200"
                />
              </div>
            </div>

            <div className="divider my-0" />

           
            <div className="navbar bg-base-200/50 px-6 py-3 border-b border-base-300 min-h-0">
              <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-base-content/50 uppercase">
                 Available Time Slots
              </span>
            </div>

            <div className="card-body p-6 gap-4">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-semibold text-sm">
                    Add Time Slot <span className="text-error">*</span>
                  </span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="select select-bordered flex-1 outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200"
                  >
                    <option value="">-- Select a time slot --</option>
                    {Object.entries(TIME_SLOT_GROUPS).map(([groupName, times]) => {
                      const filteredTimes = times.filter(t => !addedSlots.includes(t));
                      if (filteredTimes.length === 0) return null;
                      return (
                        <optgroup key={groupName} label={groupName}>
                          {filteredTimes.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </optgroup>
                      );
                    })}
                  </select>

                  <button
                    type="button"
                    onClick={handleAddSlot}
                    disabled={!selectedSlot}
                    className="btn border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white disabled:bg-base-200 disabled:text-base-content/30 disabled:border-base-300 font-bold text-xs px-5 transition-all duration-200"
                  >
                    + Add Slot
                  </button>
                </div>
              </div>

              {addedSlots.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {addedSlots.map((slot) => (
                    <div key={slot} className="badge bg-[#efffea] text-green-700 border border-green-200/60 gap-2 py-3.5 px-3 text-xs font-semibold rounded-lg shadow-sm">
                      {slot}
                      <span
                        onClick={() => handleRemoveSlot(slot)}
                        className="hover:text-red-500 font-bold cursor-pointer ml-1 transition-colors"
                        role="button"
                      >
                        ✕
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="divider my-0" />

           
            <div className="navbar bg-base-200/50 px-6 py-3 border-b border-base-300 min-h-0">
              <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-base-content/50 uppercase">
                 Facility Image
              </span>
            </div>

            <div className="card-body p-6">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-semibold text-sm">
                    Image URL <span className="text-error">*</span>
                  </span>
                </label>
               


                <input
                  type="url"
                  name="image"
                  placeholder="https://i.ibb.co/your-image.jpg"
                  className="input input-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200"
                />
                <label className="label py-0.5">
                  <span className="label-text-alt text-base-content/50">
                    imgbb.com / postimage.org 
                  </span>
                </label>
              </div>
            </div>

            <div className="divider my-0" />

            
            <div className="navbar bg-base-200/50 px-6 py-3 border-b border-base-300 min-h-0">
              <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-base-content/50 uppercase">
                 Owner Info
              </span>
            </div>

            <div className="card-body p-6 gap-3 bg-base-200/20">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-semibold text-sm">Owner Email</span>
                </label>
                
                <input
                  type="email"
                  name="owner_email"
                  readOnly
                  value={user?.email || ""}
                  className="input input-bordered w-full bg-base-200 text-base-content/40 cursor-not-allowed font-medium outline-none"
                />
              </div>
            </div>

            <div className="divider my-0" />

           
            <div className="px-6 py-5 bg-base-200/40 flex items-center justify-between gap-4">
              <button
                type="button"
                className="btn btn-ghost hover:bg-base-300 text-sm font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-md shadow-green-600/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Add Facility
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}