import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function AboutCommunitySection() {
    return (
        <section className="w-full bg-light">
            <div className="web-medium-container flex flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-center md:gap-14 md:px-12 md:py-20">
                <div className="w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(15,15,15,0.15)] md:w-[52%]">
                    <img
                        src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80"
                        alt="Neighbors gathering outside a modern home"
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div className="w-full md:w-[48%]">
                    <p className="section-sub-title text-amber-700/90">Connected Communities</p>
                    <h2 className="mt-4 section-title text-slate-900">
                        Building Neighborhoods That Feel Like Home
                    </h2>
                    <p className="mt-5 card-description-big text-slate-700">
                        NextHomeProperties designs residential communities where families can thrive. We combine thoughtful planning,
                        sustainable landscaping, and convenient access to essentials so every home feels connected, safe, and future-ready.
                    </p>
                    <p className="mt-4 card-description-big text-slate-700">
                        From walkable streets to shared green spaces and modern amenities, our developments are built to strengthen local
                        relationships and create long-term value for residents.
                    </p>
                    <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-slate-800">
                        Explore Our Community Impact
                        <ArrowUpRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
