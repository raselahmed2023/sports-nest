"use client";

export default function DeleteModal({ id }) {
  
  const handleDelete = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:8000/facilities/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (data.deletedCount > 0) {
    window.location.reload();
  }
};

  return (
    <>
      <button className="btn btn-sm btn-error text-white flex-1"
        onClick={() => document.getElementById(id).showModal()}> Delete</button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Facility?</h3>
          <div className="flex justify-end gap-2">
            <form method="dialog">
              <button className="btn">
                Cancel
              </button>
            </form>
            <button onClick={handleDelete} className="btn btn-error text-white"> Yes Delete </button>
          </div>
        </div>
      </dialog>
    </>
  );
}