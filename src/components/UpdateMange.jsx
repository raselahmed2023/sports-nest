"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const UpdateFacilityModal = ({ facility }) => {

    const [name, setName] = useState(facility.name);
    const [description, setDescription] = useState(facility.description);
    const [capacity, setCapacity] = useState(facility.capacity);
    const [price, setPrice] = useState(facility.price_per_hour);
    const [image, setImage] = useState(facility.image);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedFacility = {
            name,
            description,
            capacity,
            price_per_hour: price,
            image
        };

        const res = await fetch(
            `http://localhost:8000/facilities/${facility._id}`,
            {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(updatedFacility),
            }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
            toast.success("Facility Updated");
            document.getElementById(`modal-${facility._id}`).close();
        }
        window.location.reload();
    };

    return (
        <>
            <button
                className="btn btn-sm btn-ghost"
                onClick={() => document.getElementById(`modal-${facility._id}`).showModal()
                } > Update Facilities</button>


            <dialog id={`modal-${facility._id}`} className="modal">
                <div className="modal-box">

                    <h3 className="font-bold text-lg mb-4"> Update Facility </h3>

                    <form onSubmit={handleUpdate} className="space-y-3">

                        <input
                            type="text"
                            defaultValue={facility.name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Facility Name" />

                        <textarea
                            defaultValue={facility.description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            placeholder="Description" />

                        <input
                            type="number"
                            defaultValue={facility.capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Capacity" />

                        <input
                            type="number"
                            defaultValue={facility.price_per_hour}
                            onChange={(e) => setPrice(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Price Per Hour" />

                        <input
                            type="text"
                            defaultValue={facility.image}
                            onChange={(e) => setImage(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Image URL" />

                        <button className="btn btn-ghost w-full">Update</button>

                    </form>


                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default UpdateFacilityModal;