import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TimelineDots({ items, activeIndex, onDotClick }) {
  return (
    <div className="flex items-center w-full mt-2 px-1">
      {items.map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <motion.button
              onClick={() => onDotClick(index)}
              className="relative z-10 flex-shrink-0"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  isActive
                    ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                    : "bg-white/30 hover:bg-white/50"
                )}
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
            {index < items.length - 1 && (
              <div className="flex-1 h-[1px] bg-white/10 mx-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}
