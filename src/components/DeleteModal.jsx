"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteModal({ id, facilityName, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const modalId = `delete-facility-${id}`;

  const openModal = () => {
    document.getElementById(modalId).showModal();
  };

  const closeModal = () => {
    document.getElementById(modalId).close();
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Facility deleted successfully.");
        onDeleted?.(id);
        closeModal();
      } else {
        toast.error("Failed to delete facility.");
      }
    } catch (error) {
      console.error("Failed to delete facility:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-error text-white flex-1 rounded-full"
        onClick={openModal}
      >
        Delete
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-xl">Delete Facility?</h3>

          <p className="text-base-content/60 mt-3">
            This action will permanently remove{" "}
            <span className="font-semibold text-base-content">
              {facilityName || "this facility"}
            </span>{" "}
            from your listings.
          </p>

          <div className="alert alert-warning mt-4">
            <span className="text-sm">
              Make sure this facility has no important active bookings before
              deleting it.
            </span>
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-ghost"
              disabled={deleting}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-error text-white"
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}