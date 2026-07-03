export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-base-200 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold text-base-content mt-6">
          Loading SportNest
        </h2>

        <p className="text-base-content/60 mt-2">
          Please wait while we prepare your sports facilities.
        </p>
      </div>
    </div>
  );
}