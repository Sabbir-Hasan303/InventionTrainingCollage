import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function AboutVideoSection() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <section className="relative h-[80vh] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)',
                }}
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 h-full flex items-center justify-center">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVideoPlaying(true)}
                    className="group"
                >
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                        <Play className="w-8 h-8 md:w-12 md:h-12 ml-2" fill="white" />
                    </div>
                    <div className="mt-6 text-sm tracking-widest uppercase">Watch Our Story</div>
                </motion.button>
            </div>

            {isVideoPlaying && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
                    onClick={() => setIsVideoPlaying(false)}
                >
                    <div className="relative w-full max-w-6xl aspect-video">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
