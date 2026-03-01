import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

export default function EventHeader({ event, direction }) {
    return (
        <div className="relative h-[70px] mx-[35px] my-4">
            <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                    key={event.id + "-" + event.title}
                    custom={direction}
                    initial={(d) => ({ opacity: 0, y: d >= 0 ? 60 : -60 })}
                    animate={{ opacity: 1, y: 0 }}
                    exit={(d) => ({ opacity: 0, y: d >= 0 ? -60 : 60 })}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                >
                    <div className="flex justify-between items-end mb-0">
                        <h1
                            className="text-[26px] text-black font-bold leading-tight flex-1 whitespace-nowrap overflow-hidden text-ellipsis pr-4"
                        >
                            {event.title}
                        </h1>
                        <time className="text-[14px] text-black font-semibold whitespace-nowrap">
                            {event.date}
                        </time>
                    </div>
                    <address className="text-[14px] text-black font-semibold not-italic flex items-center gap-2 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.place}
                    </address>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
