import { CiBookmarkCheck, CiSearch } from "react-icons/ci";
import { HiCalendarDateRange } from "react-icons/hi2";

const steps = [
  {
    id: 1,
    icon: <CiSearch />,
    title: "Browse Facilities",
    description: "Find your favorite sports facility easily.",
  },
  {
    id: 2,
    icon: <HiCalendarDateRange />,
    title: "Choose Slot",
    description: "Select your preferred date and time.",
  },
  {
    id: 3,
    icon: <CiBookmarkCheck />,
    title: "Confirm Booking",
    description: "Book instantly and enjoy your game.",
  },
];

export default function SimpleUse() {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-base-content">
            How It Works
          </h2>
          <p className="text-base-content/60 mt-2">
            Book your facility in 3 easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-base-100 border border-base-300 p-6 rounded-2xl shadow-sm text-center justify-items-center"
            >
              <div className="text-5xl mb-4 text-base-content">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mb-2 text-base-content">
                {step.title}
              </h3>

              <p className="text-base-content/60 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}