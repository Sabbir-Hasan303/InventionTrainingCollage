import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
];

export default function AboutGallerySection() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm tracking-[0.3em] uppercase text-gray-400">Visualize</span>
                    <h2 className="text-4xl md:text-5xl font-light mt-4">Our Projects in Action</h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {IMAGES.map((img, index) => (
                        <motion.div
                            key={img}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group relative aspect-square overflow-hidden"
                        >
                            <img
                                src={img}
                                alt={`Project ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
