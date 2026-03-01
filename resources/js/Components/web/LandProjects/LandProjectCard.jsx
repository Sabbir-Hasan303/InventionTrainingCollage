import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function LandProjectCard({ project, isActive, isPast, onClick }) {
    return (
        <article onClick={onClick} className="sticky top-28 mb-[60vh] cursor-pointer">
            <div
                className={`w-full max-w-2xl ml-auto overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isActive
                        ? 'bg-dark border-[#d8b36d]/80 shadow-[0_24px_50px_rgba(7,12,24,0.42)]'
                        : isPast
                        ? 'bg-[#1a253a] border-white/30'
                        : 'bg-[#1a253a] border-white/20 hover:border-white/35'
                }`}
            >
                <div className="relative h-64 overflow-hidden">
                    <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1727]/85 via-[#0f1727]/25 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="card-title-sm mb-5 text-[#d8b36d]">{project.yearLabel}</p>
                        <h3 className="card-title-big">{project.title}</h3>
                        <p className="mt-1 card-description-sm text-white/75">{project.locationName}</p>
                    </div>
                </div>

                <div className="p-5 md:p-6 text-white">
                    <p className="max-w-2xl card-description-big text-white/82">{project.summary}</p>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Area</p>
                            <p className="mt-1 text-sm">{project.metrics.area}</p>
                        </div>
                        <div className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Type</p>
                            <p className="mt-1 text-sm">{project.metrics.type}</p>
                        </div>
                        <div className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Handover</p>
                            <p className="mt-1 text-sm">{project.metrics.handover}</p>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                        <a
                            href={project.ctaHref}
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-white/10 transition-colors"
                        >
                            Explore Plot
                            <ArrowUpRight size={13} />
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
