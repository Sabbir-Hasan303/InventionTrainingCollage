import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        value: 100,
        suffix: '+',
        label: 'Projects',
        desc: 'Completed successfully',
        color: '#2FB7AF',
        accent: 'rgba(47,183,175,0.12)',
    },
    {
        value: 98,
        suffix: '%',
        label: 'Satisfaction',
        desc: 'Client satisfaction rate',
        color: '#F46874',
        accent: 'rgba(244,104,116,0.12)',
    },
    {
        value: 500,
        suffix: '+',
        label: 'Employees',
        desc: 'Expert team members',
        color: '#E5B73A',
        accent: 'rgba(229,183,58,0.12)',
    },
    {
        value: 20,
        suffix: '+',
        label: 'Years',
        desc: 'Industry experience',
        color: '#4FBDD2',
        accent: 'rgba(79,189,210,0.12)',
    },
];

export default function Starts2() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const numberRefs = useRef([]);
    const imageRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
                        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
                    }
                );
            }

            // Image panel
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { x: -40, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: imageRef.current, start: 'top 78%', once: true },
                    }
                );
            }

            // Cards stagger
            gsap.fromTo(
                cardsRef.current.filter(Boolean),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
                }
            );

            // Animated counters
            stats.forEach((stat, idx) => {
                const el = numberRefs.current[idx];
                if (!el) return;
                const counter = { value: 0 };
                gsap.to(counter, {
                    value: stat.value,
                    duration: 1.8,
                    delay: 0.2 + idx * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
                    onUpdate: () => { el.textContent = Math.round(counter.value).toString(); },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-24 md:py-32 bg-[#070d17]"
            // style={{ background: 'linear-gradient(135deg, #06080d 0%, #0d1420 50%, #07090f 100%)' }}
        >
            {/* Ambient glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #2FB7AF 0%, transparent 70%)', filter: 'blur(80px)' }} />
                <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #E5B73A 0%, transparent 70%)', filter: 'blur(80px)' }} />
                <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 opacity-10" style={{ background: 'radial-gradient(circle, #4FBDD2 0%, transparent 70%)', filter: 'blur(60px)' }} />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative web-medium-container px-5 sm:px-8">

                {/* Header */}
                <div ref={headerRef} className="mx-auto mb-16 max-w-2xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2FB7AF]/30 bg-[#2FB7AF]/10 px-4 py-1.5 section-sub-title">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#2FB7AF]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2FB7AF]">Our Achievements</span>
                    </div>
                    <h2 className="mt-2 section-title text-white">
                        Trusted by{' '}
                        <span className="italic" style={{ color: '#E5B73A' }}>Thousands</span>
                    </h2>
                    <p className="mt-4 card-description-big text-white/50">
                        Two decades of delivering premium real estate solutions across Bangladesh.
                    </p>
                </div>

                {/* Main layout */}
                <div className="flex flex-col gap-12 lg:flex-row">

                    {/* Image panel */}
                    <div
                        ref={imageRef}
                        className="relative overflow-hidden rounded-3xl lg:w-[38%] xl:w-[36%]"
                        style={{ minHeight: '480px' }}
                    >
                        <img
                            src="https://cdn.confident-group.com/wp-content/uploads/2021/08/25155017/blog-banner-mob.jpg"
                            alt="Premium Living"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,8,13,0.92) 0%, rgba(6,8,13,0.4) 50%, rgba(6,8,13,0.15) 100%)' }} />

                        {/* Corner folder cutout */}
                        <div className="pointer-events-none absolute left-0 top-0 z-20 w-[206px]">
                            <div className="h-[58px] rounded-br-[24px] bg-[#070d17]" />
                            <div
                                className="absolute right-[-28px] top-0 h-[28px] w-[28px] bg-[#070d17]"
                                style={{
                                    clipPath: 'path("M0 0 Q0,28 28,28 L0,28 Z")',
                                    transform: 'scaleY(-1)',
                                }}
                            />
                            <div
                                className="absolute bottom-[-28px] left-0 h-[28px] w-[28px] bg-[#070d17]"
                                style={{
                                    clipPath: 'path("M0 0 Q0,28 28,28 L0,28 Z")',
                                    transform: 'scaleY(-1)',
                                }}
                            />
                        </div>

                        {/* Bottom content */}
                        <div className="absolute bottom-0 left-0 right-0 p-7">
                            {/* Decorative line */}
                            <div className="mb-5 h-px w-12" style={{ background: 'linear-gradient(to right, #E5B73A, transparent)' }} />
                            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#9ac5ff]/30 bg-[#0b1222]/70 px-3 py-1.5 section-sub-title text-[#9ac5ff] backdrop-blur-sm">
                                <span className="h-1 w-1 rounded-full bg-[#9ac5ff]" /> Premium Living
                            </span>
                            <h3 className="card-title-sm mb-5 text-white">
                                Designed for Comfort,<br />Built for Value
                            </h3>
                            <p className="mt-3 card-description-sm text-white/65">
                                Modern communities with smart planning, better connectivity, and long-term investment potential.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 card-description-sm text-white/50">
                                {['Prime Locations', 'Legal Security', 'Future Growth'].map((item, i) => (
                                    <React.Fragment key={item}>
                                        {i > 0 && <span className="text-white/20">|</span>}
                                        <span className="text-white/70">{item}</span>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stat cards grid */}
                    <div className="grid flex-1 gap-5 sm:grid-cols-2">
                        {stats.map((stat, idx) => (
                            <article
                                key={stat.label}
                                ref={(el) => { cardsRef.current[idx] = el; }}
                                className="group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8 border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                                {/* Glow blob in corner */}
                                <div
                                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    style={{ background: `radial-gradient(circle, ${stat.color} 0%, transparent 70%)`, filter: 'blur(30px)' }}
                                />

                                {/* Top row */}
                                <div className="flex items-start justify-between">
                                    <span className="card-title-sm text-white/40">
                                        {stat.label}
                                    </span>
                                    <span
                                        className="h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-150"
                                        style={{ background: stat.color, boxShadow: `0 0 8px ${stat.color}` }}
                                    />
                                </div>

                                {/* Divider */}
                                <div className="my-5 h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

                                {/* Number */}
                                <div className="mt-auto">
                                    <div className="flex items-end gap-0.5">
                                        <span
                                            ref={(el) => { numberRefs.current[idx] = el; }}
                                            className="hero-title"
                                            style={{ color: stat.color, textShadow: `0 0 40px ${stat.color}40` }}
                                        >
                                            0
                                        </span>
                                        <span
                                            className="mb-2 section-title"
                                            style={{ color: '#E5B73A' }}
                                        >
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    <p className="mt-2 card-description-sm text-white/50">{stat.desc}</p>
                                </div>

                                {/* Bottom accent bar */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                                    style={{ background: `linear-gradient(to right, ${stat.color}, transparent)` }}
                                />
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
