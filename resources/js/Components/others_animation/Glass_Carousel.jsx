import { useCallback, useEffect, useState } from "react";

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor",
    date: "Dec 2024",
    image:
      "https://i.pinimg.com/1200x/0b/67/25/0b67255a1d95953bae8c4ffae4433b62.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Academic",
  },
  {
    id: 2,
    title: "Lorem Ipsum Dolor",
    date: "June 2024",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Creative",
  },
  {
    id: 3,
    title: "Lorem Ipsum Dolor",
    date: "March 2024",
    image:
      "https://i.pinimg.com/736x/b8/23/fb/b823fb582349d3bbbfd189d6323e1b7b.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Co-Curricular",
  },
  {
    id: 4,
    title: "Lorem Ipsum Dolor",
    date: "Jan 2024",
    image:
      "https://i.pinimg.com/736x/a8/34/0a/a8340abeae97026d7f611768329892f3.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Academic",
  },
  {
    id: 5,
    title: "Lorem Ipsum Dolor",
    date: "Nov 2023",
    image:
      "https://i.pinimg.com/736x/1d/f7/93/1df79363e9bda25a91d00abff1d425ef.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Creative",
  },
  {
    id: 6,
    title: "Lorem Ipsum Dolor",
    date: "Sept 2023",
    image:
      "https://i.pinimg.com/736x/74/3f/a4/743fa43d1cc20977d8eedec193549ad0.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Co-Curricular",
  },
  {
    id: 7,
    title: "Lorem Ipsum Dolor",
    date: "Aug 2023",
    image:
      "https://i.pinimg.com/736x/d6/15/8f/d6158f1287b75404eff5b492ba0a953e.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Academic",
  },
  {
    id: 8,
    title: "Lorem Ipsum Dolor",
    date: "July 2023",
    image:
      "https://i.pinimg.com/1200x/65/4b/4b/654b4bcd897f6d320e91544f56b950f3.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Creative",
  },
  {
    id: 9,
    title: "Lorem Ipsum Dolor",
    date: "May 2023",
    image:
      "https://i.pinimg.com/736x/88/f4/fc/88f4fcae1a2653bc5ea1797e2f419b70.jpg",
    description:
      "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Co-Curricular",
  },
];

const getPositionClass = (offset) => {
  if (offset === 0) {
    return "[transform:translate3d(0,0,250px)_rotateY(0deg)] z-10 opacity-100 shadow-[0_40px_80px_rgba(0,0,0,0.8)]";
  }

  if (offset === -1) {
    return "[transform:translate3d(-45%,0,-250px)_rotateY(45deg)_scale(0.8)] sm:[transform:translate3d(-35vw,0,-150px)_rotateY(35deg)_scale(0.85)] xl:[transform:translate3d(-32vw,0,-150px)_rotateY(35deg)_scale(0.85)] z-[5] opacity-50";
  }

  if (offset === 1) {
    return "[transform:translate3d(45%,0,-250px)_rotateY(-45deg)_scale(0.8)] sm:[transform:translate3d(35vw,0,-150px)_rotateY(-35deg)_scale(0.85)] xl:[transform:translate3d(32vw,0,-150px)_rotateY(-35deg)_scale(0.85)] z-[5] opacity-50";
  }

  if (offset < -1) {
    return "[transform:translate3d(-68vw,0,-500px)_rotateY(45deg)_scale(0.6)] sm:[transform:translate3d(-63vw,0,-500px)_rotateY(45deg)_scale(0.6)] xl:[transform:translate3d(-57vw,0,-500px)_rotateY(45deg)_scale(0.6)] z-[1] opacity-20";
  }

  if (offset > 1) {
    return "[transform:translate3d(68vw,0,-500px)_rotateY(-45deg)_scale(0.6)] sm:[transform:translate3d(63vw,0,-500px)_rotateY(-45deg)_scale(0.6)] xl:[transform:translate3d(57vw,0,-500px)_rotateY(-45deg)_scale(0.6)] z-[1] opacity-20";
  }

  return "[transform:translate3d(0,0,-1000px)_scale(0.1)] opacity-0";
};

export default function Glass_Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = ACHIEVEMENTS.length;

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTypingTarget =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (isTypingTarget) return;

      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white [perspective:2000px]">
      <div className="relative flex h-[500px] w-screen items-center justify-center [transform-style:preserve-3d]">
        {ACHIEVEMENTS.map((item, index) => {
          let offset = index - activeIndex;
          if (offset > Math.floor(total / 2)) offset -= total;
          if (offset < -Math.floor(total / 2)) offset += total;

          return (
            <article
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`absolute h-[450px] w-[75vw] cursor-pointer overflow-hidden rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-[20px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:h-[clamp(380px,60vh,500px)] sm:w-[clamp(280px,25vw,400px)] ${getPositionClass(
                offset
              )}`}
            >
              <div
                className="h-[60%] bg-cover bg-center"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="flex h-[40%] flex-col bg-gradient-to-b from-transparent to-black/40 p-5">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h3 className="text-base">{item.title}</h3>
                  <span className="rounded px-3 py-1 text-[11px] uppercase tracking-[1px] bg-white/10">
                    {item.tag}
                  </span>
                </div>
                <p className="my-1 text-xs italic text-white/90">{item.description}</p>
                <p className="mt-auto text-xs text-white/80">{item.date}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex max-w-[90vw] min-w-fit items-center gap-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-[20px]">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous card"
          className="px-2 text-3xl leading-none text-white transition hover:text-white/70"
        >
          {"<"}
        </button>

        <div className="mx-1 flex items-center gap-1 border-x border-white/20 px-3 sm:mx-2 sm:gap-2 sm:px-4">
          {ACHIEVEMENTS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : "false"}
                onClick={() => setActiveIndex(index)}
                className={`h-1 w-1 rounded-full transition-all duration-300 sm:h-[6px] sm:w-[6px] ${
                  isActive
                    ? "w-3 sm:w-[18px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    : "bg-white/30 hover:scale-110 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next card"
          className="px-2 text-3xl leading-none text-white transition hover:text-white/70"
        >
          {">"}
        </button>
      </div>
    </section>
  );
}
