import React, { useState, useEffect, useRef } from "react";
import { waypointsData } from "./waypointsData";
import WaypointCard from "./WaypointCard";
import ExpeditionMap from "./ExpeditionMap";

export default function ScrollytellingSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const totalStops = waypointsData.length;
    const activeWaypoint = waypointsData[activeIndex] ?? waypointsData[0];
    const progress = ((activeIndex + 1) / totalStops) * 100;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index, 10);
                        setActiveIndex(index);
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: "-20% 0px -20% 0px"
            }
        );

        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen pt-32 pb-24"
            style={{
                backgroundColor: '#fdf3d7',
                fontFamily: "'Cormorant Garamond', serif"
            }}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(160,93,52,0.15),transparent_40%),radial-gradient(circle_at_85%_60%,rgba(209,168,120,0.22),transparent_35%)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
                    <div className="self-start space-y-5 flex flex-col sticky top-24 md:top-28 h-[calc(100vh-6rem)] md:h-[calc(100vh-7rem)] lg:h-[calc(100vh-8rem)]">
                        <div className="flex-1 min-h-[260px] md:min-h-[320px] lg:min-h-0">
                            <div className="h-full rounded-2xl overflow-hidden shadow-2xl">
                                <ExpeditionMap activeWaypointIndex={activeIndex} />
                            </div>
                        </div>
                        <div
                            className="rounded-2xl border p-6 md:p-8 shadow-xl backdrop-blur-sm shrink-0"
                            style={{ borderColor: "#d1a878", backgroundColor: "rgba(253,243,215,0.9)" }}
                        >
                            <p className="text-sm md:text-base tracking-[0.24em] uppercase mb-3" style={{ color: "#8a5b37" }}>
                                Scrollytelling
                            </p>
                            <h1 className="text-4xl md:text-4xl xl:text-6xl font-bold leading-tight mb-4" style={{ color: "#a05d34" }}>
                                The Lewis and Clark Expedition
                            </h1>
                            <p className="text-lg md:text-xl xl:text-2xl max-w-2xl leading-snug" style={{ color: "#4a4a4a" }}>
                                Follow the historic journey across uncharted American territories from 1804 to 1806.
                            </p>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-end justify-between gap-4">
                                    <p className="text-base md:text-lg" style={{ color: "#4a4a4a" }}>
                                        Stop {activeIndex + 1} of {totalStops}
                                    </p>
                                    <p className="text-base md:text-lg font-semibold" style={{ color: "#8a5b37" }}>
                                        {Math.round(progress)}%
                                    </p>
                                </div>
                                <div className="h-2 rounded-full bg-[#ead7b6] overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${progress}%`,
                                            background: "linear-gradient(90deg, #a05d34 0%, #d1a878 100%)"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute left-5 top-0 bottom-0 w-px bg-[#d9b98e]/80" />

                        {waypointsData.map((waypoint, index) => {
                            const isActive = activeIndex === index;
                            const isPast = index < activeIndex;

                            return (
                                <div
                                    key={index}
                                    ref={(el) => (cardRefs.current[index] = el)}
                                    data-index={index}
                                    className="relative min-h-[68vh] pl-0 lg:pl-14"
                                >
                                    <div className="hidden lg:flex absolute left-0 top-28 w-10 justify-center">
                                        <div
                                            className="h-5 w-5 rounded-full border-2 transition-all duration-300"
                                            style={{
                                                borderColor: isActive ? "#8a4d2a" : "#d1a878",
                                                backgroundColor: isActive || isPast ? "#a05d34" : "#fdf3d7",
                                                boxShadow: isActive ? "0 0 0 6px rgba(160,93,52,0.16)" : "none"
                                            }}
                                        />
                                    </div>

                                    <div className="pt-4 lg:pt-6">
                                        <WaypointCard
                                            waypoint={waypoint}
                                            isActive={isActive}
                                        />
                                    </div>


                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="h-[28vh]" />
        </div>
    );
}
