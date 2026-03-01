import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Heart, Users } from 'lucide-react';

const PILLARS = [
    {
        icon: Building2,
        title: 'OUR PROJECTS',
        description:
            'Explore thoughtfully planned land and housing projects designed for long-term value, modern living, and community growth.',
        link: '#name',
    },
    {
        icon: Users,
        title: 'OUR TEAM',
        description:
            'Meet the experienced professionals behind Next Home Properties, committed to transparency and on-time project delivery.',
        link: '#leadership',
    },
    {
        icon: Heart,
        title: 'OUR COMMITMENT',
        description:
            'From site selection to handover, we prioritize trust, quality, and customer care to help families build a secure future.',
        link: '#values',
    },
];

export default function AboutPillarsSection() {
    const sliderRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const handleScroll = () => {
        if (!sliderRef.current) return;
        const firstCard = sliderRef.current.querySelector('[data-pillar-card]');
        if (!firstCard) return;

        const cardWidth = firstCard.getBoundingClientRect().width;
        const styles = window.getComputedStyle(sliderRef.current);
        const gap = parseFloat(styles.columnGap || styles.gap || '0');
        const step = cardWidth + gap;
        const index = Math.round(sliderRef.current.scrollLeft / step);
        setActiveSlide(Math.max(0, Math.min(index, PILLARS.length - 1)));
    };

    return (
        <section className="relative py-20 md:py-28 px-5 md:px-8 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                }}
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/70" /> */}

            <div className="relative z-10 web-small-container">
                <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex lg:grid lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {PILLARS.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.12 }}
                            className="group relative shrink-0 w-[86%] sm:w-[64%] md:w-[48%] lg:w-auto snap-start"
                            data-pillar-card
                        >
                            <div className="h-full min-h-[410px] md:min-h-[450px] bg-[#2a303c]/45 backdrop-blur-[5px] px-8 py-10 flex flex-col transition-all duration-300 group-hover:bg-[#2a303c]/55">
                                <div className="mb-9">
                                    <div className="text-white/95">
                                        {pillar.icon === 'tm' ? (
                                            <div className="w-14 h-14 rounded-full border-[3px] border-white/95 flex items-center justify-center text-[35px] leading-none font-light tracking-tight">
                                                <span className="-mt-[2px]">™</span>
                                            </div>
                                        ) : (
                                            <pillar.icon className="w-12 h-12 stroke-[1.8]" />
                                        )}
                                    </div>
                                </div>
                                <p className="card-title-sm mb-5 text-white">
                                    {pillar.title}
                                </p>
                                <p className="card-description-sm text-white/90 max-w-[28ch]">
                                    {pillar.description}
                                </p>
                                <a
                                    href={pillar.link}
                                    className="mt-auto inline-flex items-center justify-center gap-4 border border-white/30 rounded-full h-11 px-8 w-fit text-sm font-semibold tracking-[0.08em] uppercase text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                                >
                                    Find out more
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="lg:hidden mt-6 flex items-center justify-center gap-2">
                    {PILLARS.map((_, index) => (
                        <span
                            key={index}
                            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                                activeSlide === index ? 'bg-white' : 'bg-white/35'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
