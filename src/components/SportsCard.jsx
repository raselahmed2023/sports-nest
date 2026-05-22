"use client";
import Image from "next/image";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import { useSession } from "../lib/auth-client";


const SportsCard = ({ facility }) => {
    const { data: session } = useSession();
    return (
        <div className="card bg-base-100 shadow-sm">

            <figure>
                {facility.image && (
                    <Image
                        src={facility.image}
                        alt={facility.name}
                        width={400}
                        height={250}
                        className="h-44 w-full object-cover" />)}
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg flex justify-between items-center">
                    {facility.name}
                    <span className={'badge badge-sm capitalize badge-outline'}>
                        {facility.facility_type}
                    </span>
                </h2>

                <p className="text-sm flex items-center gap-1">
                    <LuMapPin /> {facility.location}</p>
                <p className="text-sm flex items-center gap-1">
                    <IoIosPeople /> Capacity: {facility.capacity}</p>
                <p className="font-semibold text-green-600 text-sm">
                    Taka {facility.price_per_hour} / hour</p>

                <div className="card-actions mt-3">
                    <Link
                        href={session?.user ? `/facility/${facility._id}` : "/login"} >
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