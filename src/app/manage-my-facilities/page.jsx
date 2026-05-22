"use client";

import { useEffect, useState } from "react";
import ManageFacilityCard from "../../components/ManageFacilityCard";

export default function ManageMyFacilities() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-facilities`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFacilities(data);
        } else {
          console.log("Server response:", data);
        }
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Manage My Facilities
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <ManageFacilityCard
            key={facility._id}
            facility={facility}
          />
        ))}
      </div>

    </div>
  );
}