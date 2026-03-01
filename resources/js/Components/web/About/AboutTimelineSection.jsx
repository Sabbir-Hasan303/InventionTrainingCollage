import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Building2, Landmark, Leaf, Rocket, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
    {
        year: '2015',
        title: 'Foundation',
        description: 'Next Home Properties was established with a vision to transform land development in Bangladesh.',
    },
    {
        year: '2017',
        title: 'First Project',
        description: 'Launched our flagship project - Pushpodhara Eco-City, setting new standards for sustainable living.',
    },
    {
        year: '2019',
        title: 'Expansion',
        description: 'Expanded operations across multiple districts, bringing quality land development to more communities.',
    },
    {
        year: '2021',
        title: 'Innovation',
        description: 'Introduced smart land management systems and digital plot tracking for transparent transactions.',
    },
    {
        year: '2023',
        title: 'Recognition',
        description: 'Received national awards for excellence in real estate development and customer satisfaction.',
    },
    {
        year: '2024',
        title: 'Future Vision',
        description: 'Committed to developing 50+ eco-friendly projects by 2030, focusing on sustainable communities.',
    },
];

const CARD_ICONS = [Landmark, Building2, Rocket, Leaf, Award, ShieldCheck];

export default function AboutTimelineSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timelineItems = gsap.utils.toArray('.timeline-item');
            timelineItems.forEach((item, index) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: 'url(https://img.freepik.com/free-photo/land-plot-with-nature-landscape-location-pin_23-2149937924.jpg?t=st=1771528003~exp=1771531603~hmac=b567c1e7173632e965cab0a2beb083593e8713cb37e01ffe5e109cd2b8bc042f&w=1480)',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#10242D]/70 via-[#0B151A]/60 to-[#0E191F]/75" />

            <div className="relative z-10 web-medium-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="section-sub-title text-[#B7C7D0]">Our Journey</span>
                    <h2 className="section-title text-[#F3F0E6]">Our Story</h2>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden lg:block" />

                    <div className="space-y-16 lg:space-y-24">
                        {TIMELINE.map((item, index) => {
                            const Icon = CARD_ICONS[index % CARD_ICONS.length];
                            return (
                            <div
                                key={item.year}
                                className={`timeline-item flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-left lg:pl-12' : 'lg:text-left lg:pr-12'}`}>
                                    <div className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(28,36,25,0.88)_0%,rgba(17,31,25,0.9)_48%,rgba(19,28,22,0.88)_100%)] backdrop-blur-sm p-8 md:p-9 rounded-[10px] shadow-[0_14px_40px_rgba(0,0,0,0.34)]">
                                        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,_rgba(198,160,88,0.26)_0%,_rgba(198,160,88,0.08)_42%,_transparent_68%)] pointer-events-none" />
                                        <div className="absolute -right-10 -top-8 w-[280px] h-[280px] rounded-full bg-[rgba(0,0,0,0.26)] pointer-events-none" />
                                        <div className="absolute -left-28 -bottom-28 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(99,138,77,0.26)_0%,_rgba(99,138,77,0.06)_52%,_transparent_74%)] pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="section-sub-title text-[#A2AFBE]">{item.year}</div>
                                                <div className="w-10 h-10 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-[#F2EEE3] flex items-center justify-center">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <h3 className="card-title-big mb-4 text-[#F2EEE3]">
                                                {item.title}
                                            </h3>
                                            <p className="card-description-sm text-white/90">{item.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-[#05080A]/90 border-2 border-[#F2EEE3]/35 text-[#EDE7D9] flex items-center justify-center text-sm font-light">
                                        {item.year.slice(2)}
                                    </div>
                                </div>

                                <div className="hidden lg:block lg:w-1/2" />
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
