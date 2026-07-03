"use client";

import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import DeleteModal from "./DeleteModal";
import UpdateFacilityModal from "./UpdateMange";

export default function ManageFacilityCard({ facility, onDeleted, onUpdated }) {
  return (
    <div className="card bg-base-100 shadow-sm h-full border border-base-200 overflow-hidden">
      <figure>
        <Image
          src={facility.image}
          alt={facility.name}
          width={400}
          height={250}
          className="h-44 w-full object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="card-title text-lg">{facility.name}</h2>

          <span className="badge badge-outline capitalize">
            {facility.facility_type}
          </span>
        </div>

        <p className="text-sm flex items-center gap-1 text-base-content/70">
          <LuMapPin /> {facility.location}
        </p>

        <p className="text-sm flex items-center gap-1 text-base-content/70">
          <IoIosPeople /> Capacity: {facility.capacity}
        </p>

        <p className="text-green-600 font-semibold">
          ৳ {facility.price_per_hour} / hour
        </p>

        <div className="flex gap-2 mt-auto pt-4">
          <UpdateFacilityModal facility={facility} onUpdated={onUpdated} />

          <DeleteModal
            id={facility._id}
            facilityName={facility.name}
            onDeleted={onDeleted}
          />
        </div>
      </div>
    </div>
  );
}