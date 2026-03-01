import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { number: 150, suffix: '+', label: 'Projects Completed' },
    { number: 5000, suffix: '+', label: 'Happy Families' },
    { number: 12, suffix: '+', label: 'Years Experience' },
    { number: 98, suffix: '%', label: 'Client Satisfaction' },
];

export default function AboutStatsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const stats = gsap.utils.toArray('.stat-number');
            stats.forEach((stat) => {
                const target = parseInt(stat.getAttribute('data-target') || '0', 10);
                gsap.to(stat, {
                    textContent: target,
                    duration: 2,
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 85%',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-6 bg-[#161719]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl lg:text-6xl font-light mb-3">
                                <span className="stat-number" data-target={stat.number}>
                                    0
                                </span>
                                <span>{stat.suffix}</span>
                            </div>
                            <div className="text-sm text-gray-400 tracking-wider uppercase">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
