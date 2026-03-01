import React, { useMemo, useState } from "react";

const REVIEWS = [
  {
    id: 6,
    name: "Alice",
    role: "Data Scientist",
    avatar: "https://i.pravatar.cc/150?img=23",
    review:
      "Absolutely mind-blowing! From graphics to gameplay, it's a virtual masterpiece. I lost track of time in the immersive experience.",
  },
  {
    id: 0,
    name: "Bob",
    role: "Architect",
    avatar: "https://i.pravatar.cc/150?img=13",
    review:
      "A hidden gem for tech enthusiasts. The selection is vast, and the ease of discovering new tech is addictively delightful!",
  },
  {
    id: 2,
    name: "Charlie",
    role: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/150?img=8",
    review:
      "Results speak louder than words. I've never seen progress like this. The workflows are challenging but oh-so-rewarding. Kudos!",
  },
  {
    id: 3,
    name: "Diana",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/150?img=41",
    review:
      "It's very easy to customize and categorize lists for new projects/task categories.",
  },
  {
    id: 13,
    name: "Ethan",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?img=57",
    review:
      "An adventure for the curious mind. Every click led to a new discovery. It's like a digital journey through the wonders of the internet.",
  },
  {
    id: 4,
    name: "Fiona",
    role: "Marketing Specialist",
    avatar: "https://i.pravatar.cc/150?img=42",
    review:
      "Plan, create, and explore seamlessly. This service made my creative dreams a reality. Smooth navigation, and the recommendations were spot on.",
  },
  {
    id: 10,
    name: "George",
    role: "Software Developer",
    avatar: "https://i.pravatar.cc/150?img=21",
    review:
      "A game-changer for organization. Tasks, calendars, notes - everything neatly synced. My life has never been this streamlined. Pure genius!",
  },
  {
    id: 11,
    name: "Hannah",
    role: "Graphic Designer",
    avatar: "https://i.pravatar.cc/150?img=18",
    review:
      "Drowning in a sea of creativity. The content here is a visual feast. An endless source of inspiration for my artistic endeavors.",
  },
  {
    id: 5,
    name: "Ian",
    role: "CTO",
    avatar: "https://i.pravatar.cc/150?img=33",
    review:
      "Discovering new beats is addictive with this service. The curated playlists are spot-on, and the personalized recommendations are eerily accurate. A music lover's paradise!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const current = useMemo(() => REVIEWS[currentIndex], [currentIndex]);

  const slide = (direction) => {
    if (isSwitching) return;
    setIsSwitching(true);

    window.setTimeout(() => {
      setCurrentIndex((prev) => {
        if (direction === "prev") {
          return (REVIEWS.length + prev - 1) % REVIEWS.length;
        }
        return (REVIEWS.length + prev + 1) % REVIEWS.length;
      });
      setIsSwitching(false);
    }, 500);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-tr from-slate-200 to-slate-50 px-4 text-slate-800">
      <main className="my-4 w-full max-w-2xl rounded-3xl bg-white p-8 text-center sm:p-16">
        <h1 className="text-xl font-bold">A word from our customers</h1>
        <p className="text-sm">We've been helping businesses do their best since 2018</p>

        <div className="mt-6 grid grid-cols-1 gap-2 [grid-template-areas:'slider_slider'_'nav-left_nav-right'] sm:grid-cols-[60px_auto_60px] sm:gap-6 sm:[grid-template-areas:'nav-left_slider_nav-right']">
          <button
            type="button"
            onClick={() => slide("prev")}
            className={`[grid-area:nav-left] relative isolate h-10 w-10 shrink-0 rounded-full bg-black text-2xl text-gray-600 transition-all duration-500 sm:mt-8 ${
              isSwitching ? "translate-x-20" : "translate-x-0"
            } before:absolute before:inset-px before:-z-10 before:rounded-full before:bg-white before:transition-all before:duration-300 hover:bg-black hover:text-white hover:before:inset-full`}
            aria-label="Previous testimonial"
          >
            {"\u2039"}
          </button>

          <div className="[grid-area:slider]">
            <div className="grid overflow-hidden [grid-template-areas:'stack']">
              <div className="card [grid-area:stack]">
                <blockquote
                  className={`relative isolate rounded-md bg-black p-6 text-sm text-white transition-all duration-500 ${
                    isSwitching ? "scale-0" : "scale-100"
                  } before:absolute before:-bottom-2 before:left-2/4 before:-z-10 before:h-4 before:w-4 before:-translate-x-2/4 before:rotate-45 before:bg-black before:transition before:duration-500 ${
                    isSwitching ? "before:-translate-y-full" : "before:translate-y-0"
                  }`}
                >
                  "{current.review}"
                </blockquote>

                <div
                  className={`mt-6 flex flex-col items-center gap-2 text-sm transition-all duration-500 ${
                    isSwitching ? "translate-y-[150px] scale-0" : "translate-y-0 scale-100"
                  }`}
                >
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold">{current.name}</p>
                    <p className="text-xs">{current.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => slide("next")}
            className={`[grid-area:nav-right] relative isolate h-10 w-10 shrink-0 rounded-full bg-black text-2xl text-gray-600 transition-all duration-500 sm:mt-8 ${
              isSwitching ? "-translate-x-20" : "translate-x-0"
            } before:absolute before:inset-px before:-z-10 before:rounded-full before:bg-white before:transition-all before:duration-300 hover:bg-black hover:text-white hover:before:inset-full`}
            aria-label="Next testimonial"
          >
            {"\u203A"}
          </button>
        </div>
      </main>
    </section>
  );
}
