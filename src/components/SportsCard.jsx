"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import { authClient } from "../lib/auth-client";

const SportsCard = ({ facility }) => {
  const { data: session } = authClient.useSession();
  const [imageError, setImageError] = useState(false);

  const detailsPath = `/facility/${facility._id}`;
  const bookingHref = session?.user
    ? detailsPath
    : `/login?redirect=${encodeURIComponent(detailsPath)}`;

  const hasImage = facility.image && !imageError;

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300 h-full overflow-hidden">
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

          <span className="badge badge-sm badge-outline capitalize shrink-0">
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

        <p className="font-semibold text-green-600 text-sm mt-2">
          Taka {facility.price_per_hour} / hour
        </p>

        <div className="card-actions mt-auto pt-4">
          <Link href={bookingHref} className="w-full">
            <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full shadow-md shadow-green-600/10 transition-all duration-300 hover:-translate-y-0.5 w-full justify-center">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SportsCard;