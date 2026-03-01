import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle, GraduationCap, MapPin, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
    {
        icon: Star,
        title: 'Quality Education',
        desc: 'Training aligned with Standards for RTOs 2015 and current training package requirements.',
    },
    {
        icon: GraduationCap,
        title: 'Qualified Trainers',
        desc: 'Industry-experienced trainers and assessors delivering practical, job-relevant learning.',
    },
    {
        icon: CheckCircle,
        title: 'Nationally Recognised',
        desc: 'Qualifications recognised across Australia within the Australian Qualifications Framework.',
    },
    {
        icon: MapPin,
        title: 'Sydney Campus',
        desc: 'Conveniently located at 1/40 Raymond Street, Bankstown NSW 2200.',
    },
]

export default function WhyChoose() {
    const whyRef = useRef(null)

    useEffect(() => {
        if (!whyRef.current) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.why-headline',
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: whyRef.current,
                        start: 'top 82%',
                    },
                }
            )

            gsap.fromTo(
                '.why-card',
                { opacity: 0, y: 48 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: whyRef.current,
                        start: 'top 74%',
                    },
                }
            )
        }, whyRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={whyRef} className="relative overflow-hidden bg-[#16181c] py-20 sm:py-24">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#d7b55a]/14 blur-3xl" />
                <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#4ecdc4]/10 blur-3xl" />
            </div>

            <div className="web-giant-container relative z-10">
                <div className="why-headline mb-12 text-center sm:mb-14">
                    <span className="mb-5 inline-flex rounded-full border border-[#d7b55a]/50 bg-[#d7b55a]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f6dd9f]">
                        Why Invention Training
                    </span>
                    <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                        Built for Practical Outcomes,
                        <span className="block text-[#f4d186]">Backed by Quality Standards</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                        We focus on relevant skills, compliant delivery, and real learner support so students can
                        transition confidently into industry.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {highlights.map((item) => (
                        <article
                            key={item.title}
                            className="why-card group relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.04] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d7b55a]/45 hover:bg-white/[0.065]"
                        >
                            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[2rem] bg-[#d7b55a]/10 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#d7b55a]/35 bg-[#d7b55a]/14">
                                <item.icon className="h-5 w-5 text-[#f2cf80]" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-white/70">{item.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
