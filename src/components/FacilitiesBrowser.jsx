"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SportsCard from "./SportsCard";

const sportTypes = [
  "football",
  "badminton",
  "swimming",
  "tennis",
  "cricket",
  "basketball",
];

const FacilitiesBrowser = () => {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "";

  const [facilities, setFacilities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState(initialType);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedType(initialType);
  }, [initialType]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`)
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load facilities:", error);
        setLoading(false);
      });
  }, []);

  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) => {
      const facilityName = facility.name?.toLowerCase() || "";
      const facilityType = facility.facility_type?.toLowerCase() || "";

      const matchesSearch = facilityName.includes(searchText.toLowerCase());

      const matchesType = selectedType
        ? facilityType === selectedType.toLowerCase()
        : true;

      return matchesSearch && matchesType;
    });
  }, [facilities, searchText, selectedType]);

  return (
    <div className="min-h-screen bg-base-200 px-4 sm:px-8 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <p className="text-green-600 font-semibold uppercase tracking-wide text-sm">
            Sports Facilities
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Find Your Perfect Place to Play
          </h1>

          <p className="text-base-content/60 mt-3">
            Search facilities by name or filter by sport type to book your next
            session faster.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-base-100 rounded-2xl shadow-sm p-4 md:p-5 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by facility name..."
              className="input input-bordered w-full md:col-span-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              className="select select-bordered w-full capitalize"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Sport Types</option>

              {sportTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {(searchText || selectedType) && (
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <p className="text-sm text-base-content/60">
                Showing {filteredFacilities.length} result
                {filteredFacilities.length !== 1 ? "s" : ""}
              </p>

              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  setSearchText("");
                  setSelectedType("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-success"></span>
            <p className="mt-3 text-base-content/60">Loading facilities...</p>
          </div>
        ) : filteredFacilities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center py-20 bg-base-100 rounded-2xl"
          >
            <h2 className="text-2xl font-bold">No facilities found</h2>

            <p className="text-base-content/60 mt-2">
              Try another search keyword or choose a different sport type.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((facility, index) => (
              <motion.div
                key={facility._id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              >
                <SportsCard facility={facility} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitiesBrowser;