import Link from "next/link";

const SPORTS = [
  { emoji: "⚽", label: "Football Turf", type: "football" },
  { emoji: "🏸", label: "Badminton Court", type: "badminton" },
  { emoji: "🏊", label: "Swimming Lane", type: "swimming" },
  { emoji: "🎾", label: "Tennis Court", type: "tennis" },
  { emoji: "🏏", label: "Cricket Net", type: "cricket" },
  { emoji: "🏀", label: "Basketball Court", type: "basketball" },
];

export default function Sports() {
  return (
    <section className="bg-base-100 border-b border-base-300 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {SPORTS.map((s) => (
            <Link
              key={s.type}
              href={`/all-facilities?type=${s.type}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-base-200 hover:bg-green-50 hover:text-green-700 border border-base-300 hover:border-green-200 text-sm font-medium text-base-content/70 transition-all duration-200"
            >
              <span>{s.emoji}</span>
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}