"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    name: "Tanvir Rahman",
    role: "Football player",
    rating: 5,
    facility: "Green Arena Turf · Dhanmondi, Dhaka",
    review:
      "Booking a turf was very smooth. I could see the slot, price and facility details before confirming.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Badminton player",
    rating: 5,
    facility: "Rich Court · Kushtia",
    review:
      "The court information was clear and the booking process saved a lot of time compared to calling manually.",
  },
  {
    id: 3,
    name: "Imran Khan",
    role: "Cricket player",
    rating: 4,
    facility: "CricZone Net Bay B · Mohammadpur, Dhaka",
    review:
      "CricZone nets are well-equipped. Bowling machine was available and the staff was helpful. Loved the experience.",
  },
  {
    id: 4,
    name: "Sadia Akter",
    role: "Swimmer",
    rating: 5,
    facility: "BlueWave Swimming Lane · Mirpur, Dhaka",
    review:
      "I liked how easy it was to find available swimming slots. The platform feels clean and beginner-friendly.",
  },
  {
    id: 5,
    name: "Arif Hossain",
    role: "Tennis player",
    rating: 4,
    facility: "Ace Tennis Court · Gulshan, Dhaka",
    review:
      "The facility cards are helpful and the booking summary made the final confirmation simple.",
  },
];

const ReviewSec = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeReview = reviews[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full">
            <FaStar className="text-yellow-500" />
            Trusted by players
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-base-content mt-5">
            What Players Say
          </h2>

          <p className="text-base-content/60 mt-3">
            Real reviews from SportNest users across Bangladesh
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="bg-base-100 border border-base-300 rounded-2xl shadow-sm p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                    {activeReview.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-bold text-base-content">
                      {activeReview.name}
                    </h3>
                    <p className="text-sm text-base-content/50">
                      {activeReview.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= activeReview.rating
                          ? "text-green-500"
                          : "text-base-300"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="text-base-content/70 leading-7 mt-6">
                “{activeReview.review}”
              </p>

              <div className="border-t border-base-300 mt-6 pt-4">
                <p className="text-sm text-base-content/50">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                  {activeReview.facility}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-6">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show review ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-7 bg-green-600"
                    : "w-2 bg-base-300 hover:bg-green-300"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={handlePrevious}
              className="btn btn-circle btn-outline border-base-300"
              aria-label="Previous review"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="btn btn-circle btn-outline border-base-300"
              aria-label="Next review"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSec;