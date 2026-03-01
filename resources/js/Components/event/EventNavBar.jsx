import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function EventNavBar({ isModalOpen }) {
    return (
        <motion.nav
            className="flex justify-between items-center px-[35px] pt-2"
            animate={{
                opacity: isModalOpen ? 0 : 1,
                y: isModalOpen ? -20 : 0,
            }}
            transition={{ duration: 0.3 }}
        >
            <button className="flex items-center gap-3 font-bold text-[17px] text-black bg-transparent border-0 cursor-pointer p-0">
                <ArrowLeft className="w-5 h-5" />
                Events
            </button>
        </motion.nav>
    );
}
