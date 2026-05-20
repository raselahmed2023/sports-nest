const STEPS = [
  {
    step: "01",
    icon: "🔍",
    title: "Browse Facilities",
    desc: "Search by sport type, location, or price. Filter to find exactly what you need.",
  },
  {
    step: "02",
    icon: "📅",
    title: "Pick a Slot",
    desc: "Choose your preferred date and available time slot from the facility schedule.",
  },
  {
    step: "03",
    icon: "✅",
    title: "Confirm & Play",
    desc: "Confirm your booking instantly. Show up and enjoy your game — no paperwork.",
  },
];

// ── Single step card ──
function StepCard({ step, icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-4xl">{icon}</span>
        <span className="text-5xl font-black text-gray-50">{step}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function SimpleUse() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-400 mt-2">Reserve your slot in 3 simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <StepCard key={s.step} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}