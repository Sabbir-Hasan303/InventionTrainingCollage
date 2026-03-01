import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, Download, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

export default function ProjectDetailSidebar({ project, transactionLabels, className = '', sticky = true }) {
    const whatsappNumber = (project.agent?.phone || '').replace(/\D/g, '');

    return (
        <aside className={`${sticky ? 'xl:sticky xl:top-28' : ''} ${className}`}>
            <div className="space-y-4 rounded-[26px] border border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#f5f4ef_100%)] p-2 shadow-[0_20px_45px_rgba(15,23,42,0.1)]">
                <div className="rounded-2xl border border-[#0f3f38]/20 bg-[#0f3f38]/[0.07] p-4">
                    {/* <p className="text-[11px] uppercase tracking-[0.16em] text-[#0f3f38]/85">Project Snapshot</p>
                    <h3 className="mt-2 text-[1.6rem] font-light leading-tight text-[#132029]">{project.title}</h3>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#1d252d]/70">
                        <MapPin className="h-4 w-4 text-[#2FA89D]" />
                        {project.location}
                    </p> */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="rounded-xl border border-black/10 bg-white/80 px-2 py-3">
                            <p className="text-[10px] uppercase tracking-[0.14em] text-[#1d252d]/50">Price</p>
                            <p className="mt-1 text-sm font-medium text-[#1d252d]">{project.priceLabel}</p>
                        </div>
                        <div className="rounded-xl border border-black/10 bg-white/80 px-2 py-3">
                            <p className="text-[10px] uppercase tracking-[0.14em] text-[#1d252d]/50">Type</p>
                            <p className="mt-1 text-sm font-medium text-[#1d252d]">{project.type}</p>
                        </div>
                    </div>
                    <div className="mt-2 rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-[#1d252d]/70">
                        <span className="font-medium text-[#1d252d]">{project.availablePlots}</span> plots available from{' '}
                        <span className="font-medium text-[#1d252d]">{project.totalPlots}</span> total (
                        {transactionLabels[project.transaction]})
                    </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-4">
                    <form className="space-y-3">
                        <input
                            type="text"
                            placeholder="Name"
                            className="h-11 w-full rounded-xl border border-black/10 bg-transparent px-3 text-sm text-[#1d252d] placeholder:text-[#5a7080]/90"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="h-11 w-full rounded-xl border border-black/10 bg-transparent px-3 text-sm text-[#1d252d] placeholder:text-[#5a7080]/90"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="h-11 w-full rounded-xl border border-black/10 bg-transparent px-3 text-sm text-[#1d252d] placeholder:text-[#5a7080]/90"
                        />
                        <textarea
                            rows={4}
                            defaultValue={`Hello,\nI'm interested in [ ${project.title} ]`}
                            className="w-full resize-y rounded-xl border border-black/10 bg-transparent px-3 py-3 text-sm text-[#1d252d] placeholder:text-[#5a7080]/90"
                        />
                        <button
                            type="button"
                            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#0d3c38] text-base font-semibold text-white transition-colors hover:bg-[#0b312e]"
                        >
                            Send
                        </button>
                        <a
                            href={`tel:${project.agent?.phone || ''}`}
                            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#0d3c38] text-base font-medium text-[#1d252d] transition-colors hover:bg-[#f7f5ef]"
                        >
                            <Phone className="h-4 w-4" />
                            Call
                        </a>
                    </form>
                </div>

                <Link
                    href="/contact"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111317] px-4 py-3 text-xs tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 hover:bg-black"
                >
                    BOOK A SITE VISIT
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <a
                    href={project.brochureUrl}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-xs tracking-[0.15em] text-[#1d252d] transition-colors hover:bg-[#f3f1ea]"
                >
                    <Download className="h-3.5 w-3.5" />
                    DOWNLOAD BROCHURE
                </a>

                <div className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="mt-3 flex items-center gap-3">
                        <img
                            src={project.agent.avatar}
                            alt={project.agent.name}
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-[#2FA89D]/30"
                        />
                        <div>
                            <p className="text-base text-[#11161d]">{project.agent.name}</p>
                            <p className="text-sm text-[#11161d]/60">{project.agent.role}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 text-sm text-[#1d252d]/80">
                        <p className="inline-flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#2FA89D]" />
                            {project.agent.phone}
                        </p>
                        <p className="inline-flex items-center gap-2 break-all">
                            <Mail className="h-4 w-4 text-[#2FA89D]" />
                            {project.agent.email}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
