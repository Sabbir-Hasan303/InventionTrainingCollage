import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from '@inertiajs/react'
import { ArrowRight, GraduationCap } from 'lucide-react'

const bgPhotos = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2200&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2200&q=80',
]

export default function Hero() {
    const heroRef = useRef(null)

    useEffect(() => {
        if (!heroRef.current) return

        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray('.hero-slide')
            gsap.set(slides, { opacity: 0, scale: 1.2 })

            const sliderTl = gsap.timeline({ repeat: -1, repeatDelay: 0.1 })

            slides.forEach((slide) => {
                sliderTl
                    .to(slide, {
                        opacity: 1,
                        scale: 1.08,
                        duration: 1.05,
                        ease: 'power2.out',
                    })
                    .to(
                        slide,
                        {
                            scale: 1,
                            duration: 4.4,
                            ease: 'none',
                        },
                        '<'
                    )
                    .to(
                        slide,
                        {
                            opacity: 0,
                            duration: 0.95,
                            ease: 'power1.inOut',
                        },
                        '>-0.6'
                    )
            })

            gsap.fromTo(
                '.hero-content-wrap',
                { y: 28, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
            )

            gsap.fromTo(
                '.hero-overlay',
                { opacity: 0.5 },
                { opacity: 0.78, duration: 1.6, ease: 'power2.out' }
            )
        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden bg-[#111216] pt-24">
            <div className="absolute inset-0">
                {bgPhotos.map((photo) => (
                    <div
                        key={photo}
                        className="hero-slide absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${photo})` }}
                    />
                ))}
            </div>

            <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-[#090a0d]/90 via-[#090a0d]/58 to-[#090a0d]/78" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(215,181,90,0.22),transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(94,196,184,0.18),transparent_46%)]" />

            <div className="web-giant-container relative z-10">
                <div className="hero-content-wrap max-w-3xl">
                    <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d7b55a]/45 bg-[#d7b55a]/14 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-[#f9df9c]">
                        <GraduationCap className="h-3.5 w-3.5" /> RTO 46008 | Nationally Recognised
                    </span>

                    <h1 className="mb-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                        Start a Meaningful Career with
                        <span className="text-[#f5d078]"> Practical Training</span>
                    </h1>

                    <p className="mb-10 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                        Invention Training College delivers nationally recognised programs in community services, aged care,
                        disability support, childcare, and security with a clear pathway to employment.
                    </p>

                    <div className="mb-10 flex flex-wrap gap-4">
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 rounded-full bg-[#d7b55a] px-8 py-3.5 text-sm font-bold text-[#1d1f22] transition-all duration-300 hover:scale-[1.03] hover:bg-[#e6c777]"
                        >
                            Explore Courses <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/contact"
                            className="rounded-full border border-white/35 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/70 hover:bg-white/10"
                        >
                            Enquire Now
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em] text-white/80 sm:text-xs">
                        <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2">Industry-Connected Trainers</span>
                        <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2">Flexible Learning Options</span>
                        <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2">Nationally Recognised Qualifications</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
