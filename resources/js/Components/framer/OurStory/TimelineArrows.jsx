import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ArrowButton = ({ direction, onClick, disabled }) => {
    const Icon = direction === "left" ? ChevronLeft : ChevronRight;

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-300",
                disabled
                    ? "border-white/10 text-white/20 cursor-not-allowed"
                    : "border-white/30 text-white/70 hover:border-white/60 hover:text-white hover:bg-white/10"
            )}
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
        >
            <Icon className="w-5 h-5" />
        </motion.button>
    );
};

export default function TimelineArrows({ onPrev, onNext, canPrev, canNext }) {
    return (
        <div className="flex items-center gap-2">
            <ArrowButton direction="left" onClick={onPrev} disabled={!canPrev} />
            <ArrowButton direction="right" onClick={onNext} disabled={!canNext} />
        </div>
    );
}
