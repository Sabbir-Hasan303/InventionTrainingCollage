import React from 'react'
import { courses } from '@/Data/courses'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRight, BookOpen, Clock3, Layers3 } from 'lucide-react'

export default function AllCourses() {
    return (
        <section className="bg-light relative overflow-hidden py-20 sm:py-24">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#d7b55a]/12 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#4ecdc4]/10 blur-3xl" />
            </div>

            <div className="web-giant-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end"
                >
                    <div className="max-w-2xl">
                        <span className="mb-5 inline-flex rounded-full border border-[#d7b55a]/55 bg-[#d7b55a]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6b1f]">
                            Nationally Recognised Training
                        </span>
                        <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1d1f22] sm:text-4xl lg:text-5xl">
                            Explore All Courses
                        </h2>
                        <p className="text-sm leading-relaxed text-[#41464c] sm:text-base">
                            Choose from practical, job-focused qualifications designed to help you start, switch, or
                            advance your career with confidence.
                        </p>
                    </div>

                    <Link
                        href="/courses"
                        className="group inline-flex items-center gap-2 rounded-2xl border border-[#1d1f22]/20 bg-white/75 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#1d1f22] transition-all duration-300 hover:border-[#1d1f22]/40 hover:bg-white"
                    >
                        View All Programs
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course, i) => (
                        <motion.article
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: i * 0.07, duration: 0.6, ease: 'easeOut' }}
                        >
                            <Link
                                href={`/course/${course.id}`}
                                className="group block overflow-hidden rounded-[1.5rem] border border-[#1d1f22]/12 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(0,0,0,0.12)]"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                    <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                                        {course.categoryLabel}
                                    </span>
                                    <span className="absolute bottom-4 left-4 rounded-full bg-[#d7b55a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1d1f22]">
                                        {course.code}
                                    </span>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <h3 className="mb-3 text-[1.35rem] font-bold leading-tight text-[#1d1f22] transition-colors duration-300 group-hover:text-[#7d6320]">
                                        {course.title}
                                    </h3>

                                    <div className="mb-5 flex flex-wrap gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d1f22]/6 px-2.5 py-1 text-[11px] font-medium text-[#3f454b]">
                                            <BookOpen className="h-3.5 w-3.5 text-[#6f757d]" />
                                            {course.level}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d1f22]/6 px-2.5 py-1 text-[11px] font-medium text-[#3f454b]">
                                            <Layers3 className="h-3.5 w-3.5 text-[#6f757d]" />
                                            {course.totalUnits} Units
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d1f22]/6 px-2.5 py-1 text-[11px] font-medium text-[#3f454b]">
                                            <Clock3 className="h-3.5 w-3.5 text-[#6f757d]" />
                                            {course.duration}
                                        </span>
                                    </div>

                                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6b1f]">
                                        Course Details
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
