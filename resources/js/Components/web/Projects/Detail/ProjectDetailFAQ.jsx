import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProjectDetailFAQ({ project }) {
    const faqs = Array.isArray(project?.faq) ? project.faq : [];
    const [openIndex, setOpenIndex] = useState(0);

    if (!faqs.length) return null;

    return (
        <section className="my-16 sm:my-20">
            <div className='web-medium-container'>
                <div className="relative overflow-hidden rounded-[30px] border border-black/10 bg-[linear-gradient(165deg,#fbfaf6_0%,#ffffff_45%,#f2f6fb_100%)] px-4 py-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10">
                    <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#6e5d2e]/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#17324d]/10 blur-3xl" />

                    <div className="relative">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#6e5d2e]">FAQ</p>
                        <h2 className="mt-2 text-balance text-[1.95rem] font-light leading-tight text-[#11161d] sm:text-[2.2rem]">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1d252d]/70 sm:text-[0.95rem]">
                            Quick answers to help you evaluate the project with clarity before your site visit.
                        </p>
                    </div>

                    <div className="relative mt-7 space-y-3">
                        {faqs.map((item, index) => {
                            const isOpen = openIndex === index;
                            const panelId = `project-faq-panel-${index}`;
                            const triggerId = `project-faq-trigger-${index}`;

                            return (
                                <article
                                    key={`${item.q}-${index}`}
                                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                                        isOpen
                                            ? 'border-[#17324d]/20 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.1)]'
                                            : 'border-black/10 bg-white/75 hover:border-black/15 hover:bg-white'
                                    }`}
                                >
                                    <h3>
                                        <button
                                            id={triggerId}
                                            type="button"
                                            onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
                                            className="group flex w-full items-start gap-3 px-4 py-4 text-left sm:px-5 sm:py-5"
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                        >
                                            <span
                                                className={`mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full text-[10px] tracking-[0.12em] transition-colors ${
                                                    isOpen ? 'bg-[#17324d] text-white' : 'bg-[#f3f4f6] text-[#11161d]/70'
                                                }`}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="flex-1 text-[1.02rem] leading-relaxed text-[#11161d] sm:text-[1.08rem]">
                                                {item.q}
                                            </span>
                                            <span
                                                className={`inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-all duration-300 ${
                                                    isOpen
                                                        ? 'rotate-180 border-[#17324d] bg-[#17324d] text-white'
                                                        : 'border-black/10 bg-[#f6f7f9] text-[#1d252d]/70 group-hover:bg-[#eceff3]'
                                                }`}
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </span>
                                        </button>
                                    </h3>

                                    <div
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={triggerId}
                                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="border-t border-black/10 px-4 pb-5 pt-4 text-[0.95rem] leading-7 text-[#1d252d]/80 sm:px-5">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
