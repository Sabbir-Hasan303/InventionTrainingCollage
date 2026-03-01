import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function AboutCtaSection() {
    return (
        <section className="relative overflow-hidden px-6 py-28 md:py-32">
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80)',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-slate-900/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(251,191,36,0.22),transparent_46%),radial-gradient(circle_at_85%_72%,rgba(255,255,255,0.1),transparent_40%)]" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="rounded-3xl border border-white/20 bg-white/[0.06] px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:px-10 md:py-12"
                >
                    <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-300/10 px-4 py-1 section-sub-title text-amber-200">
                        <Sparkles className="h-3.5 w-3.5" />
                        NextHome Properties
                    </p>
                    <h2 className="mb-6 section-title">
                        Ready to Build Your Future?
                    </h2>
                    <p className="mx-auto mb-10 max-w-3xl card-description-big text-gray-200">
                        Explore our projects and discover the perfect plot for your dream home. Our team is here to
                        guide you every step of the way.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="#">
                            <Button
                                variant="contained"
                                className="bg-gradient-to-r from-[#2f9fff] to-[#1473d6] px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(20,115,214,0.45)] transition hover:-translate-y-0.5 hover:from-[#52b0ff] hover:to-[#2f9fff]"
                                style={{ borderRadius: 999 }}
                            >
                                View Projects
                                <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="#">
                            <Button
                                variant="outlined"
                                className="border-[#2f9fff]/80 bg-[#0c1725]/40 px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#6cc0ff] transition hover:-translate-y-0.5 hover:border-[#5ab8ff] hover:bg-[#12253b]/65 hover:text-[#8bd0ff]"
                                style={{ borderRadius: 999 }}
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
