"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const FACILITY_TYPES = [
  { value: "football", label: "Football Turf" },
  { value: "badminton", label: "Badminton Court" },
  { value: "cricket", label: "Cricket Indoor" },
  { value: "swimming", label: "Swimming Lane" },
  { value: "tennis", label: "Tennis Court" },
  { value: "basketball", label: "Basketball Court" },
];

const UpdateFacilityModal = ({ facility, onUpdated }) => {
  const modalId = `update-facility-${facility._id}`;

  const [formData, setFormData] = useState({
    name: facility.name || "",
    facility_type: facility.facility_type || "",
    location: facility.location || "",
    description: facility.description || "",
    capacity: facility.capacity || "",
    price_per_hour: facility.price_per_hour || "",
    image: facility.image || "",
  });

  const [updating, setUpdating] = useState(false);

  const openModal = () => {
    document.getElementById(modalId).showModal();
  };

  const closeModal = () => {
    document.getElementById(modalId).close();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.facility_type ||
      !formData.location ||
      !formData.description ||
      !formData.capacity ||
      !formData.price_per_hour ||
      !formData.image
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const updatedFacility = {
      name: formData.name,
      facility_type: formData.facility_type,
      location: formData.location,
      description: formData.description,
      capacity: Number(formData.capacity),
      price_per_hour: Number(formData.price_per_hour),
      image: formData.image,
    };

    try {
      setUpdating(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${facility._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedFacility),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        toast.success("Facility updated successfully.");

        onUpdated?.({
          ...facility,
          ...updatedFacility,
        });

        closeModal();
      } else {
        toast.error(data.message || "No facility was updated.");
      }
    } catch (error) {
      console.error("Failed to update facility:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-outline flex-1 rounded-full"
        onClick={openModal}
      >
        Update
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box rounded-2xl max-w-2xl">
          <h3 className="font-bold text-xl">Update Facility</h3>

          <p className="text-base-content/60 text-sm mt-1 mb-5">
            Edit your facility details and keep your listing up to date.
          </p>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold">
                    Facility Name
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Facility Name"
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold">
                    Facility Type
                  </span>
                </label>

                <select
                  name="facility_type"
                  value={formData.facility_type}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select sport type</option>

                  {FACILITY_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold">Location</span>
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Location"
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold">Description</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full min-h-24"
                placeholder="Description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold">Capacity</span>
                </label>

                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Capacity"
                  min="1"
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold">
                    Price Per Hour
                  </span>
                </label>

                <input
                  type="number"
                  name="price_per_hour"
                  value={formData.price_per_hour}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Price Per Hour"
                  min="0"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold">Image URL</span>
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                disabled={updating}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="btn bg-green-600 hover:bg-green-700 text-white border-none"
              >
                {updating ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default UpdateFacilityModal;