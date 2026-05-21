"use client";

import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import DeleteModal from "../components/DeleteModal";
import UpdateFacilityModal from "../components/UpdateMange";

export default function ManageFacilityCard({ facility }) {

  return (

    <div className="card bg-base-100 shadow-sm">
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
        <h2 className="card-title"> {facility.name}</h2>
        <h2 className="card-title"> {facility.facility_type}</h2>
        <p className="text-sm flex items-center gap-1"><LuMapPin /> {facility.location}</p>
        <p className="text-sm flex items-center gap-1"> <IoIosPeople /> {facility.capacity}</p>
        <p className="text-green-600 font-semibold">৳ {facility.price_per_hour}</p>

        <div className="flex gap-2 mt-4">
          <UpdateFacilityModal facility={facility} />
          <DeleteModal id={facility._id} />
        </div>
      </div>
    </div>
  );
}