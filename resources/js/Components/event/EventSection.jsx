import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, MapPin, ArrowRight } from "lucide-react";

export default function EventSection({ children }) {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-6 lg:space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                        >
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-300 font-medium">Discover Amazing Events</span>
                        </motion.div>

                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4"
                                style={{ fontFamily: "'Noto Sans', sans-serif" }}
                            >
                                Experience
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Unforgettable
                                </span>
                                <br />
                                Moments
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl"
                                style={{ fontFamily: "'Noto Serif', serif" }}
                            >
                                Explore curated events, festivals, and gatherings that bring people together.
                                Swipe through stunning visuals and find your next adventure.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button className="group px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                Browse Events
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-6 py-3 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                Learn More
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-wrap gap-6 pt-4"
                        >
                            <div className="flex items-center gap-2 text-gray-400">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <span className="text-sm">Multiple Events</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="w-5 h-5 text-purple-400" />
                                <span className="text-sm">Global Locations</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Sparkles className="w-5 h-5 text-pink-400" />
                                <span className="text-sm">Curated Experiences</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Event card component */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="flex items-center justify-center lg:justify-end"
                    >
                        <div className="relative w-full">
                            {/* Glow effect behind card */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[40px] blur-3xl scale-110" />

                            {/* Card container with adjusted styling */}
                            <div className="relative">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    );
}
