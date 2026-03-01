import React from 'react'
import { Link } from '@inertiajs/react'
import { ArrowRight, Clock3, Wrench } from 'lucide-react'
import WebLayout from '@/Layouts/WebLayout'

export default function ComingSoon({
    title = 'Details Coming Soon',
    subtitle = 'This page is currently under development. Full content and functionality will be available soon.',
}) {
    return (
        <WebLayout>
            <section className="relative isolate overflow-hidden bg-dark py-28 sm:py-32">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#d7b55a]/16 blur-3xl" />
                    <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#4ecdc4]/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.08),transparent_60%)]" />
                </div>

                <div className="web-giant-container relative z-10">
                    <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/15 bg-white/[0.03] p-7 text-center shadow-[0_28px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10">
                        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[#d7b55a]/55 bg-[#d7b55a]/14 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7dda0]">
                            <Wrench className="h-3.5 w-3.5" />
                            Page In Progress
                        </div>

                        <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
                        <p className="mx-auto mb-7 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{subtitle}</p>

                        <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white/75 sm:text-sm">
                            <Clock3 className="h-4 w-4 text-[#f2cc78]" />
                            We are preparing this section for launch
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-2xl bg-[#d7b55a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#1d1f22] transition-all duration-300 hover:scale-[1.02] hover:bg-[#e6c777]"
                            >
                                Go To Home <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="rounded-2xl border border-white/28 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-white/55 hover:bg-white/10"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}
