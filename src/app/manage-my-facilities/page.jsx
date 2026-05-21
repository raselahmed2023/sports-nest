"use client";

import { useEffect, useState } from "react";
import { authClient } from "../../lib/auth-client";
import ManageFacilityCard from "../../components/ManageFacilityCard";

export default function ManageMyFacilities() {

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    if(user){
      fetch(`http://localhost:8000/facilities?email=${user.email}`)
      .then(res => res.json())
      .then(data => setFacilities(data));
    }
  }, [user]);

  return (

    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Manage My Facilities
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {facilities.map(facility => (
          <ManageFacilityCard
            key={facility._id}
            facility={facility}/>
        ))}
      </div>
    </div>
  );
}