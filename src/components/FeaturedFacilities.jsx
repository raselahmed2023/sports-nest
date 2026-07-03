"use client";

import { useEffect, useState } from "react";
import SportsCard from "./SportsCard";

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
    return (
      <section className="px-4 sm:px-8 lg:px-12 py-12 bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-success"></span>
          <p className="mt-3 text-base-content/60">Loading featured facilities...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-8 lg:px-12 py-14 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-green-600 font-semibold uppercase tracking-wide text-sm">
            Featured Facilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Popular Places to Play
          </h2>
          <p className="text-base-content/60 mt-3">
            Explore top sports facilities and reserve your preferred time slot in minutes.
          </p>
        </div>

        {facilities.length === 0 ? (
          <div className="text-center py-16 bg-base-100 rounded-2xl">
            <p className="text-base-content/60">No facilities available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <SportsCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedFacilities;