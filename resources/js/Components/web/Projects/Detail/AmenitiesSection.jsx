import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import {
    Shield, Zap, Droplets, Trees, Building2, Sun, Wifi, Car,
    Dumbbell, Coffee, MapPin, Star
} from "lucide-react";

gsap.registerPlugin(Flip);

const CATEGORIES = [
    {
        label: "Interior",
        color: "#2FB7AF",
        amenities: ["Clubhouse Zone", "Gym & Wellness", "Co-working Lounge", "Rooftop Terrace"],
        icons: [Building2, Dumbbell, Coffee, Sun],
    },
    {
        label: "Outdoor",
        color: "#4FBDD2",
        amenities: ["Riverside Promenade", "Jogging Loop", "Landscaped Gardens", "Children's Play Area"],
        icons: [Trees, MapPin, Trees, Star],
    },
    {
        label: "Utilities",
        color: "#E5B73A",
        amenities: ["Water Reservoir", "Solar Power Grid", "High-Speed Fiber", "24/7 Power Backup"],
        icons: [Droplets, Sun, Wifi, Zap],
    },
    {
        label: "Security",
        color: "#F46874",
        amenities: ["Security Gate", "Smart Street Lights", "CCTV Surveillance", "Gated Community"],
        icons: [Shield, Star, Shield, Car],
    },
];

const DECK_THEMES = [
    {
        border: "rgba(83, 225, 255, 0.55)",
        chipBg: "rgba(83, 225, 255, 0.16)",
        chipText: "#96efff",
        iconBg: "rgba(83, 225, 255, 0.12)",
        iconBorder: "rgba(83, 225, 255, 0.32)",
        iconColor: "#8cecff",
        glow: "radial-gradient(110% 100% at 0% 0%, rgba(83, 225, 255, 0.26) 0%, rgba(8, 12, 20, 0) 58%)",
    },
    {
        border: "rgba(255, 161, 84, 0.5)",
        chipBg: "rgba(255, 161, 84, 0.16)",
        chipText: "#ffd0a7",
        iconBg: "rgba(255, 161, 84, 0.12)",
        iconBorder: "rgba(255, 161, 84, 0.34)",
        iconColor: "#ffcf9d",
        glow: "radial-gradient(110% 100% at 0% 0%, rgba(255, 161, 84, 0.26) 0%, rgba(8, 12, 20, 0) 58%)",
    },
    {
        border: "rgba(154, 132, 255, 0.5)",
        chipBg: "rgba(154, 132, 255, 0.17)",
        chipText: "#cebeff",
        iconBg: "rgba(154, 132, 255, 0.12)",
        iconBorder: "rgba(154, 132, 255, 0.34)",
        iconColor: "#d1c4ff",
        glow: "radial-gradient(110% 100% at 0% 0%, rgba(154, 132, 255, 0.24) 0%, rgba(8, 12, 20, 0) 58%)",
    },
    {
        border: "rgba(104, 255, 176, 0.46)",
        chipBg: "rgba(104, 255, 176, 0.14)",
        chipText: "#baffdf",
        iconBg: "rgba(104, 255, 176, 0.11)",
        iconBorder: "rgba(104, 255, 176, 0.34)",
        iconColor: "#b8ffdc",
        glow: "radial-gradient(110% 100% at 0% 0%, rgba(104, 255, 176, 0.2) 0%, rgba(8, 12, 20, 0) 58%)",
    },
];

// Build flip card deck so the visible front card starts at Interior
// and each "last -> front" flip advances category order consistently.
const buildCards = (categories) =>
    [categories[0], ...categories.slice(1).reverse()].map((cat, index) => ({
        id: `card-${index}`,
        label: cat.label,
        color: cat.color,
        amenities: cat.amenities,
        icons: cat.icons,
        theme: DECK_THEMES[index % DECK_THEMES.length],
    }));

export default function AmenitiesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cards, setCards] = useState(buildCards(CATEGORIES));
    const sliderRef = useRef(null);
    const pendingStateRef = useRef(null);
    const animatingRef = useRef(false);
    const nextIdRef = useRef(CATEGORIES.length + 1);
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    // Entrance animation
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } });
            gsap.fromTo(rightRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const moveCard = () => {
        if (!sliderRef.current || animatingRef.current) return;
        const items = sliderRef.current.querySelectorAll(".flip-card-item");
        pendingStateRef.current = Flip.getState(items);

        setActiveIndex(prev => (prev + 1) % CATEGORIES.length);
        setCards(previous => {
            const last = previous[previous.length - 1];
            if (!last) return previous;
            return [{ ...last, id: `card-${nextIdRef.current++}` }, ...previous.slice(0, -1)];
        });
    };

    useLayoutEffect(() => {
        if (!pendingStateRef.current || !sliderRef.current) return;
        animatingRef.current = true;
        const state = pendingStateRef.current;
        pendingStateRef.current = null;

        Flip.from(state, {
            targets: sliderRef.current.querySelectorAll(".flip-card-item"),
            absolute: true,
            ease: "sine.inOut",
            duration: 0.55,
            onEnter: elements => gsap.from(elements, { duration: 0.35, yPercent: 18, opacity: 0, ease: "expo.out" }),
            onLeave: elements => gsap.to(elements, { duration: 0.3, yPercent: 6, xPercent: -5, transformOrigin: "bottom left", opacity: 0, ease: "expo.out" }),
            onComplete: () => { animatingRef.current = false; },
            onInterrupt: () => { animatingRef.current = false; },
        });
    }, [cards]);

    const active = CATEGORIES[activeIndex];

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden my-12"
        // style={{ background: "linear-gradient(160deg, #f8f6f1 0%, #ffffff 50%, #f5f3ee 100%)" }}
        >
            <div className="relative">

                {/* Header */}
                <div className="mb-14">
                    <h2 className="text-4xl sm:text-5xl font-light leading-tight text-gray-900">
                        Amenities &{" "}
                        <span className="italic text-gray-400">Features</span>
                    </h2>
                    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                {/* Main layout */}
                <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-center">

                    {/* LEFT — Flip card stack */}
                    <div ref={leftRef} className="flex flex-col items-center gap-8 lg:w-[42%]">
                        {/* Card stack */}
                        <div
                            className="relative cursor-pointer select-none"
                            style={{ height: "380px", width: "260px" }}
                            onClick={moveCard}
                            title="Click to cycle amenity categories"
                        >
                            <div ref={sliderRef} className="relative h-full w-full" style={{ perspective: "800px" }}>
                                {cards.map((card, index) => {
                                    const CardIcon = card.icons?.[0] || Building2;

                                    return (
                                        <article
                                            key={card.id}
                                            className="flip-card-item absolute h-[380px] w-[260px] overflow-hidden rounded-[1.4rem] border px-4 pb-4 pt-3 text-white"
                                            style={{
                                                left: `${index * -18}px`,
                                                top: `${index * 18}px`,
                                                borderColor: card.theme.border,
                                                backgroundImage: `${card.theme.glow}, linear-gradient(155deg, #070b14 0%, #0c1426 56%, #090f1d 100%)`,
                                                boxShadow: index === 0 ? "0 30px 64px rgba(5, 10, 22, 0.42)" : "0 16px 34px rgba(5, 10, 22, 0.28)",
                                                zIndex: cards.length - index,
                                            }}
                                            draggable={false}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <span
                                                    className="inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.13em]"
                                                    style={{
                                                        backgroundColor: card.theme.chipBg,
                                                        color: card.theme.chipText,
                                                        borderColor: card.theme.border,
                                                    }}
                                                >
                                                    {card.label} Details
                                                </span>

                                                <span
                                                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                                                    style={{
                                                        backgroundColor: card.theme.iconBg,
                                                        borderColor: card.theme.iconBorder,
                                                    }}
                                                >
                                                    <CardIcon className="h-4 w-4" style={{ color: card.theme.iconColor }} />
                                                </span>
                                            </div>

                                            <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-white/50">
                                                {card.amenities.length} amenities
                                            </p>

                                            <ul className="mt-5 space-y-2.5">
                                                {card.amenities.slice(0, 4).map((amenity) => (
                                                    <li key={`${card.id}-${amenity}`} className="flex items-center gap-2 text-[0.92rem] text-white/85">
                                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                                                        <span className="truncate">{amenity}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <p className="absolute bottom-3 right-4 text-[0.68rem] uppercase tracking-[0.2em] text-white/40">
                                                Tap to flip
                                            </p>
                                        </article>
                                    );
                                })}
                            </div>

                            {/* Click hint */}
                            <div
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white/90 whitespace-nowrap"
                                style={{ background: active.color }}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                Click to explore
                            </div>
                        </div>

                        {/* Category tabs */}
                        <div className="mt-16 flex flex-wrap justify-center gap-2">
                            {CATEGORIES.map((cat, i) => (
                                <button
                                    key={cat.label}
                                    onClick={() => {
                                        if (i === activeIndex || animatingRef.current) return;
                                        const diff = (i - activeIndex + CATEGORIES.length) % CATEGORIES.length;
                                        let current = activeIndex;
                                        // step through
                                        const step = () => {
                                            if (current === i) return;
                                            current = (current + 1) % CATEGORIES.length;
                                            moveCard();
                                            if (current !== i) setTimeout(step, 400);
                                        };
                                        step();
                                    }}
                                    className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                                    style={{
                                        background: i === activeIndex ? cat.color : "transparent",
                                        color: i === activeIndex ? "#fff" : "#9ca3af",
                                        border: `1.5px solid ${i === activeIndex ? cat.color : "#e5e7eb"}`,
                                    }}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Amenities list */}
                    <div ref={rightRef} className="flex-1 w-full">
                        {/* Active category header */}
                        <div className="mb-8 flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0"
                                style={{ background: `linear-gradient(135deg, ${active.color}, ${active.color}aa)` }}
                            >
                                {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-0.5">Category</div>
                                <h3
                                    className="text-2xl font-semibold"
                                    style={{ color: active.color }}
                                >
                                    {active.label} Details
                                </h3>
                            </div>
                        </div>

                        {/* Amenity items */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {active.amenities.map((amenity, i) => {
                                const Icon = active.icons[i];
                                return (
                                    <div
                                        key={amenity}
                                        className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                                        style={{
                                            background: "#fff",
                                            border: "1px solid #f0efea",
                                            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                                        }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                                            style={{ background: `${active.color}18` }}
                                        >
                                            <Icon size={16} style={{ color: active.color }} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{amenity}</span>
                                        {/* Hover accent */}
                                        <div
                                            className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ background: active.color }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
