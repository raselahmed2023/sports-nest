import BookingForm from "../../../components/Booking";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineLabelImportant } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";


export default async function FacilityDetailsPage({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="font-semibold text-lg">Facility not found</p>
        <Link href="/all-facilities" className="text-green-600 text-sm hover:underline">
          ← Back to all facilities
        </Link>
      </div>
    );
  }

  const facility = await res.json();

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">

     
        <Link href="/all-facilities" className="text-sm text-base-content/50 hover:text-green-600 w-fit"> ← Back to all facilities</Link>

     
        <div className="rounded-2xl overflow-hidden h-64 sm:h-80 relative bg-base-300">
          {facility.image && (
            <Image src={facility.image} alt={facility.name} fill className="object-cover" />
          )}
        </div>

     
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

     
          <div className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm rounded-2xl p-6 flex flex-col gap-5">

            <div className="flex items-start justify-between gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-base-content">{facility.name}</h1>
              <span className="badge badge-success badge-lg capitalize">
                {facility.facility_type}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: <CiLocationOn />, label: "Location",  value: facility.location },
                { icon:  <IoIosPeople />, label: "Capacity",  value: `${facility.capacity} players` },
                { icon: <TbCoinTaka />, label: "Price",     value: `Taka ${facility.price_per_hour} / hr` },
                { icon: <MdOutlineLabelImportant />, label: "Bookings",  value: facility.booking_count },
                { icon:<IoPeopleSharp />, label: "Owner",     value: facility.owner_email },
              ].map((item) => (
                <div key={item.label} className="bg-base-200 rounded-xl px-4 py-3 flex flex-col gap-1">
                  <span className="text-xs items-center text-base-content/80 font-medium flex gap-2 ">{item.icon} {item.label}</span>
                  <span className="text-xs items-center text-base-content/80 font-medium flex gap-2">{item.value}</span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-semibold text-base-content mb-1">About</h2>
              <p className="text-sm text-base-content/60 leading-relaxed">{facility.description}</p>
            </div>

            <div>
              <h2 className="font-semibold text-base-content mb-2">Available Slots</h2>
              <div className="flex flex-wrap gap-2">
                {facility.available_slots?.map((slot, i) => (
                  <span key={i} className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
                    {slot}
                  </span>
                ))}
              </div>
            </div>

          </div>

         
          <div className="lg:col-span-1">
            <BookingForm facility={facility} />
          </div>

        </div>
      </div>
    </div>
  );
}