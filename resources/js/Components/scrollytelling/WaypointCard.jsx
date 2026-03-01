import React from "react";
import { motion } from "framer-motion";

export default function WaypointCard({ waypoint, isActive }) {
    return (
        <motion.div
            // initial={{ opacity: 0, x: 100 }}
            // animate={{
            //     opacity: isActive ? 1 : 0.3,
            //     x: isActive ? 0 : 100,
            //     scale: isActive ? 1 : 0.95
            // }}
            // transition={{ duration: 0.6, ease: "easeOut" }}
            className="sticky top-28 mb-[60vh]"
        >
            <div
                className="w-full max-w-md ml-auto bg-[#fdf3d7] rounded-lg overflow-hidden shadow-xl border-2"
                style={{
                    borderColor: '#d1a878',
                    fontFamily: "'Cormorant Garamond', serif"
                }}
            >
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={waypoint.photo}
                        alt={waypoint.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <p
                            className="text-white text-sm font-semibold tracking-wide mb-1"
                            style={{ color: '#d1a878' }}
                        >
                            {waypoint.year}
                        </p>
                    </div>
                </div>

                <div className="p-6">
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{ color: '#a05d34' }}
                    >
                        {waypoint.title}
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: '#4a4a4a' }}
                    >
                        {waypoint.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
