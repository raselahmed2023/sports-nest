"use client";
import React, { useEffect, useState } from 'react';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));

  }, []);

  const handleCancel = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`, 
        },
      }
    );

    const data = await res.json();
    if (data.deletedCount > 0) {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          My Bookings
        </h1>

        {!bookings.length && (
          <div className="text-center py-20 bg-base-200 rounded-2xl">
            <p className="text-gray-500 text-lg">
              No bookings found
            </p>
          </div>
        )}

        {!!bookings.length && (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div key={b._id}
                className="bg-base-100 border border-base-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{b.facility_name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{b.booking_date} </p>
                  </div>
                  <span className={'px-3 py-1 rounded-full text-xs font-medium'}> {b.status}</span>
                </div>


                <div className="space-y-2 text-sm">
                  <p> Slot: {b.time_slot}</p>
                  <p> Hours: {b.hours}</p>
                </div>


                <div className="flex items-center justify-between mt-5">
                  <p className="text-lg font-bold text-green-600">
                    Taka {b.total_price}
                  </p>
                  <button onClick={() => handleCancel(b._id)} className="btn btn-sm btn-error text-white rounded-full" >Cancel</button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default MyBooking;