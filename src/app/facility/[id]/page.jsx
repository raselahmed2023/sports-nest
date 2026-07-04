import BookingForm from "../../../components/Booking";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineLabelImportant } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";

export const dynamic = "force-dynamic";

export default async function FacilityDetailsPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/facility/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const facility = await res.json();

  const infoItems = [
    {
      icon: <CiLocationOn />,
      label: "Location",
      value: facility.location || "Not provided",
    },
    {
      icon: <IoIosPeople />,
      label: "Capacity",
      value: `${facility.capacity || 0} players`,
    },
    {
      icon: <TbCoinTaka />,
      label: "Price",
      value: `Taka ${facility.price_per_hour || 0} / hour`,
    },
    {
      icon: <MdOutlineLabelImportant />,
      label: "Bookings",
      value: facility.booking_count || 0,
    },
    {
      icon: <IoPeopleSharp />,
      label: "Owner",
      value: facility.owner_email || "Not available",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/all-facilities"
          className="inline-flex items-center text-sm text-base-content/60 hover:text-green-600 mb-5 transition"
        >
          ← Back to all facilities
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl overflow-hidden h-72 sm:h-96 relative bg-base-300 border border-base-300 shadow-sm">
              {facility.image ? (
                <Image
                  src={facility.image}
                  alt={facility.name || "Sports facility"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-base-content/50">
                  <span className="text-5xl mb-3">🏟️</span>
                  <p className="font-semibold">SportNest Facility</p>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

              <div className="absolute left-5 bottom-5 right-5">
                <span className="badge bg-green-600 border-green-600 text-white capitalize mb-3">
                  {facility.facility_type}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {facility.name}
                </h1>

                <p className="text-white/80 text-sm mt-2 flex items-center gap-1">
                  <CiLocationOn className="text-lg" />
                  {facility.location}
                </p>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-sm rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                <div>
                  <p className="text-green-600 font-semibold uppercase tracking-wide text-sm">
                    Facility Details
                  </p>

                  <h2 className="text-2xl font-bold text-base-content mt-1">
                    Everything you need to know
                  </h2>
                </div>

                <span className="badge badge-outline badge-lg capitalize">
                  {facility.facility_type}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="bg-base-200 border border-base-300 rounded-2xl px-4 py-4"
                  >
                    <span className="text-xs text-base-content/60 font-medium flex items-center gap-2">
                      <span className="text-lg text-green-600">
                        {item.icon}
                      </span>
                      {item.label}
                    </span>

                    <span className="block text-sm font-semibold text-base-content mt-2 break-words">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divider" />

              <div>
                <h2 className="font-bold text-xl text-base-content mb-2">
                  About this facility
                </h2>

                <p className="text-base-content/70 leading-7">
                  {facility.description ||
                    "No detailed description has been added for this facility yet."}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="font-bold text-xl text-base-content mb-3">
                  Available Time Slots
                </h2>

                {facility.available_slots?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {facility.available_slots.map((slot, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-semibold"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-base-content/60 text-sm">
                    No available slots right now.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <BookingForm facility={facility} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}