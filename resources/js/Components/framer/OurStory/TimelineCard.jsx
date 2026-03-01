import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TimelineCard({ item, isActive, onClick, index }) {
    return (
        <motion.div
            className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] cursor-pointer select-none"
            onClick={onClick}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Year label */}
            <div className="mb-3">
                <span
                    className={cn(
                        "text-xl md:text-2xl font-light tracking-wider transition-colors duration-500",
                        isActive ? "text-amber-400" : "text-white/70"
                    )}
                >
                    {item.year}
                </span>
            </div>

            {/* Dot on timeline */}
            <div className="relative mb-5">
                <div
                    className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-500 relative z-10",
                        isActive
                            ? "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                            : "bg-white/40"
                    )}
                />
                {/* Horizontal line extending from dot */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/15 -translate-y-1/2 -z-0" />
            </div>

            {/* Glass card */}
            <motion.div
                className={cn(
                    "rounded-xl p-5 md:p-6 min-h-[160px] transition-all duration-500 border",
                    isActive
                        ? "bg-white/10 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                        : "bg-white/[0.04] backdrop-blur-md border-white/[0.08] hover:bg-white/[0.07]"
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <p
                    className={cn(
                        "text-sm md:text-[15px] leading-relaxed transition-colors duration-500",
                        isActive ? "text-white/95" : "text-white/55"
                    )}
                >
                    {item.description}
                </p>
            </motion.div>
        </motion.div>
    );
}

