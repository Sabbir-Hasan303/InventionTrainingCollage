import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    title: "Designers",
    description: "Tools that work like you do.",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/designers.webp",
    thumb:
      "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-designer.webp?w=480",
  },
  {
    title: "Marketers",
    description: "Create faster, explore new possibilities.",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/marketers.webp",
    thumb:
      "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-marketer.webp?w=480",
  },
  {
    title: "VFX filmmakers",
    description: "From concept to cut, faster.",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/filmmakers.webp",
    thumb:
      "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-film.webp?w=480",
  },
  {
    title: "Content creators",
    description: "Make scroll-stopping content, easily.",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/content-creators.webp",
    thumb:
      "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-content.webp?w=480",
  },
  {
    title: "Art directors",
    description: "Creative control at every stage.",
    bg: "https://cdn-front.freepik.com/home/anon-rvmp/professionals/art-directors.webp",
    thumb:
      "https://cdn-front.freepik.com/home/anon-rvmp/professionals/img-art.webp?w=480",
  },
];

const TRANSITION_BEZIER = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

function isHoverCapable() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover)").matches;
}

export default function ProductivitySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const cardsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < SLIDES.length - 1;

  const centerCard = useCallback((index) => {
    const wrap = sliderRef.current;
    const card = cardsRef.current[index];
    if (!wrap || !card) return;

    const mobile = isMobileViewport();
    const axis = mobile ? "top" : "left";
    const sizeKey = mobile ? "clientHeight" : "clientWidth";
    const start = mobile ? card.offsetTop : card.offsetLeft;

    wrap.scrollTo({
      [axis]: start - (wrap[sizeKey] / 2 - card[sizeKey] / 2),
      behavior: "smooth",
    });
  }, []);

  const activate = useCallback(
    (index, shouldScroll = true) => {
      setActiveIndex((prev) => {
        if (index === prev) return prev;
        if (shouldScroll) {
          requestAnimationFrame(() => centerCard(index));
        }
        return index;
      });
    },
    [centerCard]
  );

  const go = useCallback(
    (step) => {
      setActiveIndex((prev) => {
        const next = Math.min(Math.max(prev + step, 0), SLIDES.length - 1);
        if (next !== prev) {
          requestAnimationFrame(() => centerCard(next));
        }
        return next;
      });
    },
    [centerCard]
  );

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(isMobileViewport());
      requestAnimationFrame(() => centerCard(activeIndexRef.current));
    };
    onResize();

    const onKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") go(1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") go(-1);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [centerCard, go]);

  useEffect(() => {
    centerCard(activeIndex);
  }, [activeIndex, centerCard]);

  return (
    <section className="bg-[#07090d] text-[#c5c7ce]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-4 px-4 pb-5 pt-[30px] md:flex-row md:items-end md:gap-8 md:px-5 md:pb-10 md:pt-[70px]">
        <h2 className="font-sans text-2xl font-normal leading-[1.2] text-white md:text-[2.25rem]">
          Boost your professional workflow and productivity
        </h2>

        <div className="flex w-full flex-row justify-between gap-2 md:w-auto md:justify-start">
          <button
            id="prev"
            type="button"
            aria-label="Prev"
            onClick={() => go(-1)}
            disabled={!canPrev}
            className="flex size-8 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-[#ff6b35] disabled:cursor-default disabled:opacity-30 md:size-10 md:text-2xl"
          >
            {"<"}
          </button>
          <button
            id="next"
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            disabled={!canNext}
            className="flex size-8 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-[#ff6b35] disabled:cursor-default disabled:opacity-30 md:size-10 md:text-2xl"
          >
            {">"}
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="mx-auto max-w-[1400px] overflow-hidden px-[15px] md:px-0"
      >
        <div className="flex snap-y snap-mandatory flex-col items-center justify-start gap-3 pb-5 md:flex-row md:snap-x md:items-start md:justify-center md:gap-5 md:pb-10">
          {SLIDES.map((slide, index) => {
            const active = index === activeIndex;
            return (
              <article
                key={slide.title}
                ref={(node) => {
                  cardsRef.current[index] = node;
                }}
                onMouseEnter={() => isHoverCapable() && activate(index, true)}
                onClick={() => activate(index, true)}
                onTouchStart={(event) => {
                  touchStartRef.current = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY,
                  };
                }}
                onTouchEnd={(event) => {
                  const dx = event.changedTouches[0].clientX - touchStartRef.current.x;
                  const dy = event.changedTouches[0].clientY - touchStartRef.current.y;
                  if (Math.abs(isMobileViewport() ? dy : dx) > 60) {
                    go((isMobileViewport() ? dy : dx) > 0 ? -1 : 1);
                  }
                }}
                className={`group relative w-full cursor-pointer snap-start overflow-hidden rounded-2xl transition-[flex-basis,transform] duration-[550ms] md:h-[26rem] md:w-auto md:shrink-0 ${
                  active
                    ? "min-h-[300px] shadow-[0_8px_25px_rgba(0,0,0,0.3)] md:-translate-y-1.5 md:shadow-[0_18px_55px_rgba(0,0,0,0.45)]"
                    : "min-h-20"
                }`}
                style={{
                  flexBasis: isMobile ? "100%" : active ? "30rem" : "5rem",
                  transitionTimingFunction: TRANSITION_BEZIER,
                }}
              >
                <img
                  src={slide.bg}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-300 [filter:brightness(0.75)_saturate(75%)] group-hover:scale-105 group-hover:[filter:brightness(0.9)_saturate(100%)]"
                />

                <div
                  className={`absolute inset-0 z-[2] flex bg-[linear-gradient(transparent_40%,rgba(0,0,0,0.85)_100%)] ${
                    active
                      ? "flex-row items-start gap-4 p-6 md:items-center md:gap-[1.1rem] md:px-8 md:py-5"
                      : "items-center justify-start gap-4 p-4 md:flex-col md:justify-center md:gap-3 md:p-0"
                  }`}
                >
                  {active ? (
                    <img
                      src={slide.thumb}
                      alt=""
                      className="h-[267px] w-[200px] rounded-md object-cover shadow-[0_4px_10px_rgba(0,0,0,0.4)] md:h-[269px] md:w-[133px] md:rounded-[0.45rem]"
                    />
                  ) : null}

                  <div>
                    <h3
                      className={`font-bold text-white ${
                        active
                          ? "mb-4 mt-8 text-[1.8rem] md:mb-0 md:mt-0 md:text-[2.4rem]"
                          : "mr-auto text-[1.2rem] md:text-[1.35rem]"
                      }`}
                      style={
                        active || isMobile
                          ? undefined
                          : { writingMode: "vertical-rl", transform: "rotate(180deg)" }
                      }
                    >
                      {slide.title}
                    </h3>

                    {active ? (
                      <>
                        <p className="mb-4 max-w-full text-[0.95rem] leading-[1.4] text-[#ddd] md:max-w-64 md:text-base">
                          {slide.description}
                        </p>
                        <button
                          type="button"
                          className="w-full rounded-full bg-[#ff6b35] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#ff824f] md:w-auto md:px-[1.3rem] md:py-[0.55rem]"
                        >
                          Details
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="hidden justify-center gap-2 py-5 md:flex">
        {SLIDES.map((slide, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => activate(index, true)}
              className={`h-[13px] w-[13px] rounded-full transition ${
                active
                  ? "scale-110 bg-[#ff6b35]"
                  : "bg-white/35 hover:bg-white/50"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
