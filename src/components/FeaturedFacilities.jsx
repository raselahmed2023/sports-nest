"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";

const FeaturedFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`)
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading facilities...</p>;
  }

  return (
    <div className="px-12 py-12 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Facilities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <div
            key={facility._id}
            className="card bg-base-100 shadow-sm"
          >

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

              <h2 className="card-title text-lg flex justify-between items-center">
                {facility.name}
                <span className="badge badge-outline capitalize">
                  {facility.facility_type}
                </span>
              </h2>

              <p className="text-sm flex text-center items-center gap-2"><LuMapPin /> {facility.location}</p>

              <p className="font-semibold text-green-600">
                ৳ {facility.price_per_hour} / hour
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFacilities;