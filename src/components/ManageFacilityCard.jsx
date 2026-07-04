"use client";

import { useState } from "react";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import DeleteModal from "./DeleteModal";
import UpdateFacilityModal from "./UpdateMange";

export default function ManageFacilityCard({ facility, onDeleted, onUpdated }) {
  const [imageError, setImageError] = useState(false);
  const hasImage = facility.image && !imageError;

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 h-full border border-base-300 overflow-hidden">
      <figure className="h-44 bg-base-200">
        {hasImage ? (
          <Image
            src={facility.image}
            alt={facility.name || "Sports facility"}
            width={500}
            height={280}
            className="h-44 w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-44 w-full flex flex-col items-center justify-center bg-base-200 text-base-content/50">
            <span className="text-3xl mb-2">🏟️</span>
            <p className="text-sm font-semibold">SportNest Facility</p>
          </div>
        )}
      </figure>

      <div className="card-body p-4 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h2 className="card-title text-lg leading-snug line-clamp-2">
            {facility.name}
          </h2>

          <span className="badge badge-outline capitalize shrink-0">
            {facility.facility_type}
          </span>
        </div>

        <div className="space-y-2 mt-2 text-sm text-base-content/70">
          <p className="flex items-center gap-1">
            <LuMapPin className="shrink-0" />{" "}
            <span className="line-clamp-1">{facility.location}</span>
          </p>

          <p className="flex items-center gap-1">
            <IoIosPeople className="shrink-0" /> Capacity: {facility.capacity}
          </p>
        </div>

        <p className="text-green-600 font-semibold mt-2">
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