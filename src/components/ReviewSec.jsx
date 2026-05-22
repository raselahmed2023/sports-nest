"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const REVIEWS = [
  {
    name: "Rashed Ahmed",
    sport: "Football",
    avatar: "RA",
    rating: 5,
    text: "Green Arena Turf A was amazing! The surface was top quality and booking took less than a minute. Will definitely come back.",
    facility: "Green Arena Turf A",
    location: "Dhanmondi, Dhaka",
  },
  {
    name: "Nadia Islam",
    sport: "Badminton",
    avatar: "NI",
    rating: 5,
    text: "Smash Point Court 2 is air-conditioned and spotless. The slot system is super easy. No more calling to check availability!",
    facility: "Smash Point Court 2",
    location: "Gulshan, Dhaka",
  },
  {
    name: "Tanvir Hossain",
    sport: "Swimming",
    avatar: "TH",
    rating: 4,
    text: "AquaZone lanes are clean and well maintained. Booked early morning slot — the process was smooth and instant.",
    facility: "AquaZone Lane 3",
    location: "Mirpur, Dhaka",
  },
  {
    name: "Sumaiya Akter",
    sport: "Tennis",
    avatar: "SA",
    rating: 5,
    text: "Rally Club Court 1 exceeded my expectations. Hard surface is great and the lighting is perfect for evening sessions.",
    facility: "Rally Club Court 1",
    location: "Uttara, Dhaka",
  },
  {
    name: "Imran Khan",
    sport: "Cricket",
    avatar: "IK",
    rating: 4,
    text: "CricZone nets are well-equipped. Bowling machine was available and the staff was helpful. Loved the experience.",
    facility: "CricZone Net Bay B",
    location: "Mohammadpur, Dhaka",
  },
  {
    name: "Farhan Kabir",
    sport: "Football",
    avatar: "FK",
    rating: 5,
    text: "KickOff Arena has great floodlights and the turf is FIFA standard. Booked for our corporate tournament — 10/10!",
    facility: "KickOff Arena Turf B",
    location: "Bashundhara, Dhaka",
  },
];


function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < count ? "#16a34a" : "#e5e7eb"}
          className="w-4 h-4"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}


function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 w-full">

      
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
          <div className="text-xs text-gray-400">{review.sport} player</div>
        </div>
        <Stars count={review.rating} />
      </div>


      <p className="text-gray-500 text-sm leading-relaxed">
        &ldquo;{review.text}&rdquo;
      </p>

     
      <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span className="text-xs text-gray-400">
          {review.facility} · {review.location}
        </span>
      </div>

    </div>
  );
}


function Dots({ total, current, onChange }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current ? "bg-green-600 w-6" : "bg-gray-200 w-2"
          }`}
        />
      ))}
    </div>
  );
}


export default function ReviewSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = left, -1 = right

  
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((p) => (p + 1) % REVIEWS.length);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

     
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            ⭐ Trusted by players
          </div>
          <h2 className="text-3xl font-bold text-gray-900">What Players Say</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Real reviews from real SportNest users across Bangladesh
          </p>
        </div>

     
        <div className="relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ReviewCard review={REVIEWS[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

       
        <Dots total={REVIEWS.length} current={current} onChange={goTo} />

        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}