import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutHeroSection() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

    return (
        <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden bg-black">
            <motion.div style={{ scale }} className="absolute inset-0 origin-center">
                <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                    <source
                        src="https://neom.scene7.com/is/content/neom/20250702_NEOM%20EXPLAINER_3840x2160_TAHA_CLEAN_V27_30SEC"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/20" />
            </motion.div>

            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="absolute bottom-0 left-0 z-10 max-w-4xl px-6 pb-16 sm:px-8 md:px-12 md:pb-20 lg:px-16"
            >
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                    >
                        <span className="hero-sub-title text-gray-300">About Us</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.35 }}
                        className="hero-title text-white max-w-[600px]"
                    >
                        Building Dreams, Creating Futures
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.5 }}
                        className="max-w-2xl hero-description text-white/85"
                    >
                        We are committed to developing sustainable communities that enhance quality of life and create
                        lasting value for generations to come.
                    </motion.p>
                </div>
            </motion.div>

            <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs tracking-[0.22em] uppercase text-white/60"
                >
                    Scroll to explore
                </motion.div>
            </div>
        </section>
    );
}
