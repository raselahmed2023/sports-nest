import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="bg-[#f0fdf4] py-20 px-4">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Bangladesh&apos;s #1 Sports Booking Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Find & Book Sports <br />
          <span className="text-green-600">Facilities Near You</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-base sm:text-lg max-w-xl">
          Football turfs, badminton courts, swimming lanes and more —
          reserve your slot in seconds. No calls, no waiting.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/all-facilities"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-green-600/20"
          >
            Explore Facilities
          </Link>
        
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-4 pt-6 border-t border-green-100 w-full">
          {[
            { value: "142+", label: "Facilities" },
            { value: "12", label: "Cities" },
            { value: "2.4k+", label: "Players" },
            { value: "38", label: "Bookings Today" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}