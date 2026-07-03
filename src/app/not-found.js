import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] bg-base-200 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center bg-base-100 border border-base-300 rounded-3xl shadow-sm p-8 md:p-12">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center text-5xl mb-6">
          <BiErrorCircle />
        </div>

        <p className="text-green-600 font-semibold uppercase tracking-wide text-sm">
          404 Error
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-base-content mt-3">
          Page Not Found
        </h1>

        <p className="text-base-content/60 mt-4 leading-7">
          The page you are looking for does not exist or may have been moved.
          Let&apos;s take you back to SportNest.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md shadow-green-600/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            Back Home
          </Link>

          <Link
            href="/all-facilities"
            className="btn btn-outline rounded-full"
          >
            Explore Facilities
          </Link>
        </div>
      </div>
    </section>
  );
}