import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

export default function AboutMissionVisionSection() {
    return (
        <section className="relative py-24 md:py-32 px-5 md:px-8 bg-light overflow-hidden">
            <div className="absolute -top-28 -left-16 w-72 h-72 rounded-full bg-[#E9E1D0]/40" />
            <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#E8DCC7]/35" />

            <div className="relative web-small-container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                    className="text-center mb-14 md:mb-20"
                >
                    <p className="section-sub-title text-[#8E7A56] mb-3">Our Foundation</p>
                    <h2 className="section-title text-[#1D1F22]">Mission &amp; Vision</h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative bg-white/70 backdrop-blur-sm rounded-[26px] border border-[#E6E0D4] p-8 md:p-10 shadow-[0_18px_40px_rgba(44,37,23,0.08)]"
                    >
                        <div className="flex items-center gap-4 mb-7">
                            <div className="w-14 h-14 rounded-2xl bg-[#1F3A5A] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(31,58,90,0.28)]">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="card-title-big text-[#1D1F22]">Our Mission</h3>
                        </div>
                        <p className="card-description-big text-[#323232]">
                            To revolutionize land development in Bangladesh by creating sustainable, well-planned communities
                            that offer quality living spaces at accessible prices. We are committed to transparency,
                            innovation, and delivering exceptional value to every family that trusts us with their dreams.
                        </p>
                        <p className="text-[#666258] leading-relaxed mt-5">
                            Through careful planning, ethical practices, and customer-centric approach, we aim to make
                            property ownership accessible to middle-class families while maintaining the highest standards of
                            quality and sustainability.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative bg-white/70 backdrop-blur-sm rounded-[26px] border border-[#E6E0D4] p-8 md:p-10 shadow-[0_18px_40px_rgba(44,37,23,0.08)]"
                    >
                        <div className="flex items-center gap-4 mb-7">
                            <div className="w-14 h-14 rounded-2xl bg-[#7D5B2B] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(125,91,43,0.25)]">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h3 className="text-[18px] md:text-[25px] font-semibold leading-[11.56px] tracking-[1.98px] text-[#1D1F22] uppercase">Our Vision</h3>
                        </div>
                        <p className="text-lg text-[#323232] leading-relaxed">
                            To become Bangladesh&apos;s most trusted real estate developer, recognized for creating eco-friendly,
                            well-connected communities that enhance quality of life and preserve natural beauty for future
                            generations.
                        </p>
                        <p className="text-[#666258] leading-relaxed mt-5">
                            We envision a future where every family has access to quality land and housing, where communities
                            thrive in harmony with nature, and where our developments serve as benchmarks for sustainable urban
                            planning across the nation.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
