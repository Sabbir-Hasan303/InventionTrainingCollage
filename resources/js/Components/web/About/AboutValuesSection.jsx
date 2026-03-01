import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Heart, Lightbulb, MapPin, Shield, TrendingUp } from 'lucide-react';

const VALUES_TIMELINE = [
    {
        label: 'Integrity',
        description: 'Transparent communication, clear documentation, and honest commitments at every step of the property journey.',
        icon: Shield,
    },
    {
        label: 'Innovation',
        description: 'Smart planning, modern layouts, and future-ready infrastructure to create more livable communities.',
        icon: Lightbulb,
    },
    {
        label: 'Customer First',
        description: 'Every decision starts with customer needs, so families feel confident, informed, and supported.',
        icon: Heart,
    },
    {
        label: 'Excellence',
        description: 'Consistent standards in design, development, and delivery to ensure reliable long-term quality.',
        icon: Award,
    },
    {
        label: 'Growth',
        description: 'Building lasting value for homeowners and investors through strategic location and sustainable development.',
        icon: TrendingUp,
    },
    {
        label: 'Community',
        description: 'Developing neighborhoods that encourage safety, connection, and a better quality of life.',
        icon: MapPin,
    },
];

const getCardWidth = () => {
    if (typeof window === 'undefined') return 300;
    if (window.innerWidth < 640) return 260;
    if (window.innerWidth < 768) return 280;
    return 300;
};

const CARD_GAP = 24;

const ArrowButton = ({ direction, onClick, disabled }) => {
    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                disabled
                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                    : 'border-white/30 text-white/70 hover:border-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={!disabled ? { scale: 1.08 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
        >
            <Icon className="w-5 h-5" />
        </motion.button>
    );
};

const ValueTimelineCard = ({ item, isActive, index, onClick }) => {
    const Icon = item.icon;

    return (
        <motion.div
            className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] min-h-[390px] sm:min-h-[410px] md:min-h-[435px] cursor-pointer select-none"
            onClick={onClick}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <div className="mb-3 flex items-center justify-between gap-3">
                <span
                    className={`card-title-sm mb-5 transition-colors duration-500 ${
                        isActive ? 'text-amber-400' : 'text-white/75'
                    }`}
                >
                    {item.label}
                </span>
                <div
                    className={`w-8 h-8 rounded-md border flex items-center justify-center transition-colors duration-500 ${
                        isActive ? 'border-amber-400/60 text-amber-300' : 'border-white/20 text-white/55'
                    }`}
                >
                    <Icon className="w-4 h-4" />
                </div>
            </div>

            <div className="relative mb-5">
                <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 relative z-10 ${
                        isActive ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]' : 'bg-white/40'
                    }`}
                />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/15 -translate-y-1/2 -z-0" />
            </div>

            <motion.div
                className={`rounded-xl p-5 md:p-6 border h-[260px] sm:h-[280px] md:h-[300px] flex items-center overflow-hidden [transform:translateZ(0)] [backface-visibility:hidden] transition-[height,background-color,border-color,box-shadow] duration-500 ${
                    isActive
                        ? 'h-[285px] sm:h-[305px] md:h-[330px] bg-[#ffeec8] text-slate-900 border-white/40 shadow-[0_10px_36px_rgba(0,0,0,0.35)]'
                        : 'bg-white/[0.04] backdrop-blur-md border-white/[0.08] hover:bg-white/[0.08]'
                }`}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                <p className={`card-description-big transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-white'}`}>
                    {item.description}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default function AboutValuesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const x = useMotionValue(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [cardWidth, setCardWidth] = useState(getCardWidth);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
            setCardWidth(getCardWidth());
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const totalScrollWidth = VALUES_TIMELINE.length * (cardWidth + CARD_GAP) - CARD_GAP;
    const maxDrag = 0;
    const minDrag = -(totalScrollWidth - containerWidth + 40);

    const scrollToIndex = useCallback(
        (index) => {
            const targetX = -(index * (cardWidth + CARD_GAP));
            const clampedX = Math.max(Math.min(targetX, maxDrag), minDrag);
            animate(x, clampedX, {
                type: 'spring',
                stiffness: 200,
                damping: 30,
                mass: 0.8,
            });
            setActiveIndex(index);
        },
        [x, cardWidth, maxDrag, minDrag]
    );

    const handleDragEnd = (_, info) => {
        setTimeout(() => setIsDragging(false), 50);
        const currentX = x.get();
        const velocity = info.velocity.x;

        let newIndex = Math.round(-currentX / (cardWidth + CARD_GAP));
        if (velocity < -300) newIndex = Math.min(newIndex + 1, VALUES_TIMELINE.length - 1);
        if (velocity > 300) newIndex = Math.max(newIndex - 1, 0);
        newIndex = Math.max(0, Math.min(newIndex, VALUES_TIMELINE.length - 1));
        scrollToIndex(newIndex);
    };

    useEffect(() => {
        const targetX = -(activeIndex * (cardWidth + CARD_GAP));
        const clampedX = Math.max(Math.min(targetX, maxDrag), minDrag);
        x.set(clampedX);
    }, [activeIndex, cardWidth, minDrag, maxDrag, x]);

    return (
        <section id="values" className="relative w-full min-h-[520px] md:min-h-[760px] overflow-hidden py-24 md:py-32">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1920&q=80')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c1220]/75 via-[#0c1220]/65 to-[#0c1220]/75" />

            <div className="relative z-10 web-medium-container px-5 sm:px-8 md:px-12 py-10 md:py-14">
                <div className="flex items-start justify-between mb-10 md:mb-14">
                    <div>
                        <motion.p
                            className="section-sub-title text-white/60 mb-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            What Drives Us
                        </motion.p>
                        <motion.h2
                            className="text-white section-title"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            Our Core Values
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex items-center gap-2"
                    >
                        <ArrowButton direction="left" onClick={() => activeIndex > 0 && scrollToIndex(activeIndex - 1)} disabled={activeIndex === 0} />
                        <ArrowButton
                            direction="right"
                            onClick={() => activeIndex < VALUES_TIMELINE.length - 1 && scrollToIndex(activeIndex + 1)}
                            disabled={activeIndex === VALUES_TIMELINE.length - 1}
                        />
                    </motion.div>
                </div>

                <div ref={containerRef} className="overflow-x-hidden overflow-y-visible">
                    <motion.div
                        className="flex items-start gap-6 cursor-grab active:cursor-grabbing"
                        style={{ x }}
                        drag="x"
                        dragConstraints={{ left: minDrag, right: maxDrag }}
                        dragElastic={0.1}
                        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                    >
                        {VALUES_TIMELINE.map((item, index) => (
                            <ValueTimelineCard
                                key={item.label}
                                item={item}
                                index={index}
                                isActive={index === activeIndex}
                                onClick={() => {
                                    if (!isDragging) scrollToIndex(index);
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* <div className="mt-8 md:mt-10 max-w-md">
                    <div className="flex items-center w-full mt-2 px-1">
                        {VALUES_TIMELINE.map((_, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div key={index} className="flex items-center flex-1 last:flex-none">
                                    <motion.button
                                        onClick={() => scrollToIndex(index)}
                                        className="relative z-10 flex-shrink-0"
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                                isActive ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                        />
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400/30"
                                                initial={{ scale: 1 }}
                                                animate={{ scale: 2.5, opacity: 0 }}
                                                transition={{ duration: 1.2, repeat: Infinity }}
                                            />
                                        )}
                                    </motion.button>
                                    {index < VALUES_TIMELINE.length - 1 && <div className="flex-1 h-[1px] bg-white/10 mx-1" />}
                                </div>
                            );
                        })}
                    </div>
                </div> */}
            </div>
        </section>
    );
}
