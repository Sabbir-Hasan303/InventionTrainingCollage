import React from 'react';
import { Link } from '@inertiajs/react';
import { Building2, Grid2x2, MapPin, Ruler } from 'lucide-react';

export default function ProjectDetailHero({ project, statusLabels, statusClass, transactionLabels }) {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0">
                <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,14,25,0.86)_15%,rgba(10,17,31,0.58)_50%,rgba(10,16,28,0.8)_100%)]" />
            </div>

            <div className="relative w-full web-giant-container px-4 pb-24 pt-40 sm:px-6 lg:px-10 lg:pb-28">
                <div className="max-w-4xl">
                    <nav aria-label="Breadcrumb">
                        <ol className="pl-0 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/70">
                            <li>
                                <Link href="/" className="transition-colors hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link href="/projects" className="transition-colors hover:text-white">
                                    Projects
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-white">{project.title}</li>
                        </ol>
                    </nav>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
                            {transactionLabels[project.transaction]}
                        </span>
                        {project.featured && (
                            <span className="rounded-full bg-[#7de5dd] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#0f3f38]">
                                Featured
                            </span>
                        )}
                    </div>

                    <h1 className="mt-5 text-balance text-[2.5rem] font-light leading-[1.05] text-[#f4f2e8] sm:text-[3.1rem] lg:text-[4rem]">
                        {project.title}
                    </h1>
                    <p className="mt-4 max-w-3xl text-base text-white/85 sm:text-lg">{project.subtitle}</p>
                </div>

                {/* <div className="mt-9 grid gap-3 rounded-2xl border border-white/20 bg-white/[0.1] p-3 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-4">
                    <article className="rounded-xl border border-white/15 bg-black/15 p-3">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Price</p>
                        <p className="mt-1 text-lg font-light text-white">{project.priceLabel}</p>
                    </article>
                    <article className="rounded-xl border border-white/15 bg-black/15 p-3">
                        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/60">
                            <Building2 className="h-3.5 w-3.5" />
                            Property Type
                        </p>
                        <p className="mt-1 text-lg font-light text-white">{project.type}</p>
                    </article>
                    <article className="rounded-xl border border-white/15 bg-black/15 p-3">
                        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/60">
                            <Ruler className="h-3.5 w-3.5" />
                            Size
                        </p>
                        <p className="mt-1 text-lg font-light text-white">{project.sizeSqft} ft2</p>
                    </article>
                    <article className="rounded-xl border border-white/15 bg-black/15 p-3">
                        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/60">
                            <Grid2x2 className="h-3.5 w-3.5" />
                            Availability
                        </p>
                        <p className="mt-1 text-lg font-light text-white">
                            {project.availablePlots} / {project.totalPlots} plots
                        </p>
                    </article>
                </div> */}

                <p className="inline-flex items-center gap-2 text-base text-white/85">
                    <MapPin className="h-4 w-4 text-[#7de5dd]" />
                    {project.location}
                </p>
            </div>
        </section>
    );
}
