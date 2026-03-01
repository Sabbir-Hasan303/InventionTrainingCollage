import React, { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle, TrendingUp, Security, AccountBalance } from "@mui/icons-material";

const WHY_SLIDES = [
    {
        icon: CheckCircle,
        title: "Verified Titles",
        desc: "Complete legal documentation with clear ownership and pre-verified records.",
        stat: "100% Due Diligence",
        bg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80",
        thumb: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=640&q=80",
        accent: "#2dd4bf",
    },
    {
        icon: TrendingUp,
        title: "High ROI Potential",
        desc: "Strategic project selection in growth corridors with strong appreciation signals.",
        stat: "Prime Growth Zones",
        bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
        thumb: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=640&q=80",
        accent: "#fb923c",
    },
    {
        icon: Security,
        title: "Secure Investment",
        desc: "Transparent process with risk-screened opportunities and structured compliance.",
        stat: "Trusted Process",
        bg: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80",
        thumb: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=640&q=80",
        accent: "#60a5fa",
    },
    {
        icon: AccountBalance,
        title: "Easy Financing",
        desc: "Flexible payment options and partner-bank support to match your budget plan.",
        stat: "Flexible Payment Plans",
        bg: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80",
        thumb: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=640&q=80",
        accent: "#a78bfa",
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

export default function WhyChoose() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const sliderRef = useRef(null);
    const cardsRef = useRef([]);
    const activeIndexRef = useRef(0);
    const touchStartRef = useRef({ x: 0, y: 0 });

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
                if (prev === index) return prev;
                if (shouldScroll) {
                    requestAnimationFrame(() => centerCard(index));
                }
                return index;
            });
        },
        [centerCard],
    );

    const go = useCallback(
        (step) => {
            setActiveIndex((prev) => {
                const next = Math.min(Math.max(prev + step, 0), WHY_SLIDES.length - 1);
                if (next !== prev) {
                    requestAnimationFrame(() => centerCard(next));
                }
                return next;
            });
        },
        [centerCard],
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
        <section className="bg-[#07090d] py-20 text-white md:py-28">
            <div className="web-medium-container">
                <div className="flex w-full flex-col items-start justify-between gap-4 px-5 pb-5 md:flex-row md:items-end md:gap-8 md:px-8 md:pb-10">
                    <div className="max-w-3xl">
                        <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                            Why Next Home
                        </p>
                        <h2 className="mt-4 text-3xl font-light leading-tight text-white md:text-6xl">
                            Your Investment, Secured
                        </h2>
                        <p className="mt-4 text-sm text-white/65 md:text-base">
                            A trust-first real estate approach for both land and apartment buyers.
                        </p>
                    </div>
                </div>

                <div
                    ref={sliderRef}
                    className="overflow-hidden px-4 md:px-8"
                >
                <div className="flex snap-y snap-mandatory flex-col items-center justify-start gap-3 pb-4 md:flex-row md:snap-x md:items-start md:justify-start md:gap-5 md:pb-10">
                        {WHY_SLIDES.map((slide, index) => {
                            const active = index === activeIndex;
                            const Icon = slide.icon;

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
                                    className={`group relative w-full cursor-pointer snap-start overflow-hidden rounded-2xl transition-[flex-basis,transform] duration-[550ms] md:h-[38rem] md:w-auto md:shrink-0 ${active
                                            ? "min-h-[320px] shadow-[0_10px_35px_rgba(0,0,0,0.35)] md:-translate-y-1 md:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                                            : "min-h-28"
                                        }`}
                                    style={{
                                        flexBasis: isMobile
                                            ? "100%"
                                            : active
                                                ? "min(55rem, calc(100vw - 25rem))"
                                                : "7rem",
                                        transitionTimingFunction: TRANSITION_BEZIER,
                                    }}
                                >
                                    <img
                                        src={slide.bg}
                                        alt={slide.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-300 [filter:brightness(0.65)_saturate(80%)] group-hover:scale-105 group-hover:[filter:brightness(0.78)_saturate(100%)]"
                                    />

                                    <div
                                        className={`absolute inset-0 z-[2] flex bg-[linear-gradient(transparent_40%,rgba(0,0,0,0.85)_100%)] ${active
                                                ? "items-end p-5 md:items-center md:gap-5 md:p-7"
                                                : "items-end justify-start px-4 py-3 md:flex-col md:items-center md:justify-center md:gap-0 md:px-0 md:py-0"
                                            }`}
                                    >
                                        {active ? (
                                            <>
                                                <div className="hidden shrink-0 rounded-xl bg-white/10 p-2 backdrop-blur-sm md:block">
                                                    <img
                                                        src={slide.thumb}
                                                        alt=""
                                                        className="h-44 w-[7.5rem] rounded-lg object-cover shadow-[0_6px_18px_rgba(0,0,0,0.45)] lg:h-52 lg:w-36"
                                                    />
                                                </div>
                                                <div className="min-w-0 w-full">
                                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                                                        <Icon sx={{ fontSize: 17, color: slide.accent }} />
                                                        <span className="font-medium tracking-wide">{slide.stat}</span>
                                                    </div>
                                                    <h3 className="text-[1.45rem] font-semibold leading-tight text-white md:text-[2rem]">
                                                        {slide.title}
                                                    </h3>
                                                    <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/80 md:text-base">
                                                        {slide.desc}
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <h3
                                                    className="font-semibold text-white/95 md:text-[1.28rem] md:[text-shadow:0_2px_8px_rgba(0,0,0,0.65)]"
                                                    style={
                                                        isMobile
                                                            ? undefined
                                                            : { writingMode: "vertical-rl", transform: "rotate(180deg)" }
                                                    }
                                                >
                                                    {slide.title}
                                                </h3>
                                                {!isMobile ? (
                                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 p-1 backdrop-blur-sm">
                                                        <Icon sx={{ fontSize: 15, color: slide.accent }} />
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
