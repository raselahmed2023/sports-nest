import { Suspense } from "react";
import FacilitiesBrowser from "../../components/FacilitiesBrowser";

const AllFacilities = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-success"></span>
            <p className="mt-3 text-base-content/60">Loading facilities...</p>
          </div>
        </div>
      }
    >
      <FacilitiesBrowser />
    </Suspense>
  );
};

export default AllFacilities;