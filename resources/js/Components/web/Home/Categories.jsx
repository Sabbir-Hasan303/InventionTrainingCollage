import React from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, Baby, Heart, Shield } from 'lucide-react'
import { categories } from '@/Data/courses'

export default function Categories() {
    const iconMap = {
        'community-care': Heart,
        'education-childcare': Baby,
        security: Shield,
    }

    return (
        <section className="bg-light relative overflow-hidden py-20 sm:py-24">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#d7b55a]/10 blur-3xl" />
                <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#4ecdc4]/10 blur-3xl" />
            </div>

            <div className="web-giant-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
                >
                    <span className="mb-5 inline-flex rounded-full border border-[#d7b55a]/50 bg-[#d7b55a]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7de9f]">
                        Learning Pathways
                    </span>
                    <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1d1f22] sm:text-4xl lg:text-5xl">
                        Choose Your Career Category
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#3f4348] sm:text-base">
                        Explore nationally recognised training across high-demand sectors. Select a category to view
                        qualification pathways and course options.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {categories.map((cat, i) => {
                        const Icon = iconMap[cat.id] || Heart
                        const courseCount = cat.courses?.length || 0

                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ delay: i * 0.1, duration: 0.65, ease: 'easeOut' }}
                            >
                                <Link
                                    href={`/category/${cat.id}`}
                                    className="group relative block h-[25rem] overflow-hidden rounded-[1.6rem] border border-white/15 bg-black/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                                >
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/85" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(215,181,90,0.22),transparent_40%)] opacity-80" />

                                    <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
                                        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
                                            <Icon className="h-3.5 w-3.5 text-[#f4d289]" />
                                            {cat.title}
                                        </div>
                                        <div className="rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                                            {courseCount} Course{courseCount === 1 ? '' : 's'}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                                        <h3 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-[1.7rem]">
                                            {cat.title}
                                        </h3>
                                        <p className="mb-5 max-w-[38ch] text-sm leading-relaxed text-white/90 sm:text-[0.95rem]">
                                            {cat.description}
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f6d994]">
                                            View Category
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
