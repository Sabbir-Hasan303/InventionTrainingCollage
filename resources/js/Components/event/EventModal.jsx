import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";

export default function EventModal({ event, isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && event && (
                <motion.div
                    className="absolute inset-0 z-40 flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Top bar with back button */}
                    <motion.div
                        className="px-6 py-4 z-10 relative"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <button
                            onClick={onClose}
                            className="flex items-center gap-3 text-white font-bold text-lg bg-transparent border-0 cursor-pointer"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Events
                        </button>
                    </motion.div>

                    {/* Full-screen background image/video */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.05 }}
                        exit={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {event.video ? (
                            <video
                                src={event.video}
                                poster={event.poster}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${event.image})` }}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
                    </motion.div>

                    {/* Bottom content panel */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-white z-10"
                        style={{ height: "50%" }}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <motion.div
                            className="h-full overflow-auto"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                        >
                            <div className="px-6 pt-6 pb-3 border-b border-gray-200">
                                <h1 className="text-[24px] text-black font-bold mb-1 leading-tight">
                                    {event.title}
                                </h1>
                                <address className="text-[14px] font-semibold not-italic flex items-center gap-2 mb-1 text-black/60">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {event.place}
                                </address>
                                <time className="text-[14px] font-semibold text-black/50">
                                    {event.date}
                                </time>
                            </div>
                            <div
                                className="px-6 py-5 text-[15px] leading-relaxed text-gray-700"
                                style={{ fontFamily: "'Noto Serif', serif" }}
                            >
                                {event.text.split("\n\n").map((p, i) => (
                                    <p key={i} className="mb-4 last:mb-0">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
