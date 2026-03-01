import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 100, suffix: '+', label: 'Projects', desc: 'Completed successfully', color: '#4ECDC4' },
    { value: 98, suffix: '%', label: 'Satisfaction', desc: 'Customer satisfaction', color: '#FF6B6B' },
    { value: 500, suffix: '+', label: 'Employees', desc: 'Happy team', color: '#F2C94C' },
    { value: 20, suffix: '+', label: 'Years', desc: 'Experience in the industry', color: '#57D1E0' },
];

export default function Starts() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);
    const numberRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                cardsRef.current,
                { y: 45, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        once: true,
                    },
                }
            );

            stats.forEach((stat, idx) => {
                const numberEl = numberRefs.current[idx];
                if (!numberEl) return;

                const counter = { value: 0 };
                gsap.to(counter, {
                    value: stat.value,
                    duration: 1.6,
                    delay: 0.1 + idx * 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        once: true,
                    },
                    onUpdate: () => {
                        numberEl.textContent = Math.round(counter.value).toString();
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-dark py-24 md:py-32">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#4ECDC4]/15 blur-[110px]" />
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#FF6B6B]/12 blur-[120px]" />
                <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#F2C94C]/10 blur-[130px]" />
            </div>

            <div className="web-giant-container relative z-10">
                <div ref={headingRef} className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
                    <p className="section-sub-title text-white/45">Our Achievements</p>
                    <h2 className="mt-5 section-title text-white">Trusted by Thousands</h2>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
                    {stats.map((stat, idx) => (
                        <article
                            key={stat.label}
                            ref={(el) => { cardsRef.current[idx] = el; }}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm md:p-8"
                        >
                            <div className="mb-3 text-6xl font-extrabold leading-none md:text-7xl" style={{ color: stat.color }}>
                                <span ref={(el) => { numberRefs.current[idx] = el; }}>0</span>
                                <span>{stat.suffix}</span>
                            </div>
                            <h3 className="text-2xl font-light tracking-[0.08em] text-[#6CE4DE]">{stat.label}</h3>
                            <p className="mt-2 text-lg text-white/55">{stat.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
