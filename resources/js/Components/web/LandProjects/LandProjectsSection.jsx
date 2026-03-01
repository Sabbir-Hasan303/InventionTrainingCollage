import React, { useMemo, useRef, useState, useEffect } from 'react';
import LandProjectCard from './LandProjectCard';
import LandProjectsMap from './LandProjectsMap';
import { LAND_PROJECTS } from './landProjectsData';

const PIN_TOP = 112;

export default function LandProjectsSection() {
    const projects = useMemo(() => LAND_PROJECTS, []);
    const [activeIndex, setActiveIndex] = useState(0);
    const cardRefs = useRef([]);
    const sectionRef = useRef(null);
    const leftTrackRef = useRef(null);
    const leftPanelRef = useRef(null);

    const [pinMode, setPinMode] = useState('static');
    const [fixedRect, setFixedRect] = useState({ left: 0, width: 0 });
    const [panelHeight, setPanelHeight] = useState(0);

    const totalStops = projects.length;
    const progress = ((activeIndex + 1) / totalStops) * 100;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index, 10);
                        if (!Number.isNaN(index)) {
                            setActiveIndex(index);
                        }
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: '-20% 0px -20% 0px',
            }
        );

        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const updatePinnedPanel = () => {
            const sectionEl = sectionRef.current;
            const leftTrackEl = leftTrackRef.current;
            const leftPanelEl = leftPanelRef.current;

            if (!sectionEl || !leftTrackEl || !leftPanelEl) return;

            const trackRect = leftTrackEl.getBoundingClientRect();
            const measuredHeight = leftPanelEl.offsetHeight;
            const roundedLeft = Math.round(trackRect.left);
            const roundedWidth = Math.round(trackRect.width);
            const nextHeight = Math.round(measuredHeight);

            setFixedRect((prev) => {
                if (prev.left === roundedLeft && prev.width === roundedWidth) return prev;
                return { left: roundedLeft, width: roundedWidth };
            });

            setPanelHeight((prev) => (prev === nextHeight ? prev : nextHeight));

            const sectionRect = sectionEl.getBoundingClientRect();
            const sectionTopDoc = window.scrollY + sectionRect.top;
            const sectionBottomDoc = sectionTopDoc + sectionEl.offsetHeight;
            const scrollY = window.scrollY;

            let nextMode = 'fixed';
            if (scrollY + PIN_TOP <= sectionTopDoc) {
                nextMode = 'static';
            } else if (scrollY + PIN_TOP + measuredHeight >= sectionBottomDoc) {
                nextMode = 'bottom';
            }

            setPinMode((prev) => (prev === nextMode ? prev : nextMode));
        };

        updatePinnedPanel();
        window.addEventListener('scroll', updatePinnedPanel, { passive: true });
        window.addEventListener('resize', updatePinnedPanel);

        return () => {
            window.removeEventListener('scroll', updatePinnedPanel);
            window.removeEventListener('resize', updatePinnedPanel);
        };
    }, []);

    const panelStyle =
        pinMode === 'fixed'
            ? {
                position: 'fixed',
                top: `${PIN_TOP}px`,
                left: `${fixedRect.left}px`,
                width: `${fixedRect.width}px`,
                zIndex: 20,
            }
            : pinMode === 'bottom'
                ? {
                    position: 'absolute',
                    left: '0px',
                    bottom: '0px',
                    width: '100%',
                }
                : {
                    position: 'relative',
                    width: '100%',
                };

    return (
        <section ref={sectionRef} className="relative min-h-screen pt-32 pb-24 bg-light-dark">
            {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(15,138,128,0.12),transparent_40%),radial-gradient(circle_at_85%_60%,rgba(184,149,53,0.16),transparent_36%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(12,20,36,0.96)_0%,rgba(18,29,49,0.86)_44%,rgba(10,18,31,0.92)_100%)]" /> */}

            <div className="web-medium-container px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
                    <div
                        ref={leftTrackRef}
                        className="relative"
                        style={{ minHeight: panelHeight > 0 ? `${panelHeight}px` : undefined }}
                    >
                        <div ref={leftPanelRef} className="space-y-5" style={panelStyle}>
                            <div className="rounded-2xl border border-white/20 bg-white/[0.08] p-6 md:p-8 shadow-xl backdrop-blur-sm shrink-0 text-white">
                                <p className="section-sub-title mb-3 text-[#d8b36d]">
                                    Land Projects
                                </p>
                                <h2 className="section-title mb-3">
                                    Signature Development Journey
                                </h2>
                                <p className="max-w-2xl hero-description text-white/75">
                                    Scroll to explore each project milestone while the map follows in real time.
                                </p>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-end justify-between gap-4">
                                        <p className="text-sm md:text-base text-white/75">
                                            Project {activeIndex + 1} of {totalStops}
                                        </p>
                                        <p className="text-sm md:text-base font-semibold text-[#d8b36d]">
                                            {Math.round(progress)}%
                                        </p>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${progress}%`,
                                                background: 'linear-gradient(90deg, #d8b36d 0%, #f2c572 100%)',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="h-[320px] md:h-[380px] lg:h-[48vh] min-h-[280px]">
                                <div className="h-full rounded-2xl overflow-hidden shadow-2xl">
                                    <LandProjectsMap projects={projects} activeIndex={activeIndex} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-30 lg:z-auto">
                        <div className="hidden lg:block absolute left-5 top-0 bottom-0 w-px bg-white/25" />

                        {projects.map((project, index) => {
                            const isActive = activeIndex === index;
                            const isPast = index < activeIndex;

                            return (
                                <div
                                    key={project.id}
                                    ref={(el) => (cardRefs.current[index] = el)}
                                    data-index={index}
                                    className="relative min-h-[68vh] pl-0 lg:pl-14"
                                >
                                    <div className="hidden lg:flex absolute left-0 top-28 w-10 justify-center">
                                        <div
                                            className="h-5 w-5 rounded-full border-2 transition-all duration-300"
                                            style={{
                                                borderColor: isActive ? '#f2c572' : '#ffffff66',
                                                backgroundColor: isActive || isPast ? '#d8b36d' : '#253148',
                                                boxShadow: isActive ? '0 0 0 6px rgba(216,179,109,0.2)' : 'none',
                                            }}
                                        />
                                    </div>

                                    <div className="pt-4 lg:pt-6">
                                        <LandProjectCard
                                            project={project}
                                            isActive={isActive}
                                            isPast={isPast}
                                            onClick={() => setActiveIndex(index)}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </section>
    );
}
