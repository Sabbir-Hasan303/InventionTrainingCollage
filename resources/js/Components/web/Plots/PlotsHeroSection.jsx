import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, ShieldCheck } from 'lucide-react';

const heroStats = [
    { id: 's1', label: 'Verified Listings', value: '100%' },
    { id: 's2', label: 'Prime Locations', value: '30+' },
    { id: 's3', label: 'Quick Support', value: '24/7' },
];

const heroHighlights = [
    { id: 'h1', label: 'Location-first discovery', Icon: MapPin },
    { id: 'h2', label: 'Trusted legal process', Icon: ShieldCheck },
    { id: 'h3', label: 'Smarter plot comparison', Icon: Compass },
];

export default function PlotsHeroSection() {
    return (
        <section className="relative overflow-hidden pt-32 md:pt-36">
            <img
                src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=2200&q=80"
                alt="Premium plot landscape"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0f1720]/65" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(15,63,56,0.52)_0%,rgba(15,23,42,0.45)_45%,rgba(201,152,85,0.2)_100%)]" />

            <div className="web-giant-container relative py-14 md:py-20">
                <div className="max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="hero-sub-title text-white/75"
                    >
                        Signature Land Inventory
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.06 }}
                        className="mt-4 hero-title text-[#fffce1]"
                    >
                        Discover high-value plots
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.12 }}
                        className="mt-5 max-w-3xl hero-description text-white"
                    >
                        Filter by location, purpose, and property type, then compare key plot details in list or grid view.
                    </motion.p>
                </div>

                {/* <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.18 }}
                    className="mt-8 grid gap-3 sm:grid-cols-3"
                >
                    {heroHighlights.map(({ id, label, Icon }) => (
                        <div key={id} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
                            <div className="flex items-center gap-2.5 text-white">
                                <Icon className="h-4 w-4 text-[#f0cc92]" />
                                <p className="text-sm text-white/90">{label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.24 }}
                    className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3"
                >
                    {heroStats.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                            <p className="text-xl font-light text-white md:text-2xl">{item.value}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/72">{item.label}</p>
                        </div>
                    ))}
                </motion.div> */}
            </div>
        </section>
    );
}
