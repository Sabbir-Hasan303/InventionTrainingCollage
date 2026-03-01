import React, { useEffect, useRef } from 'react'
import { Head, Link } from '@inertiajs/react'
import {
    ArrowRight,
    BookOpenCheck,
    CheckCircle2,
    Compass,
    FileText,
    MapPin,
    ShieldCheck,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WebLayout from '@/Layouts/WebLayout'

gsap.registerPlugin(ScrollTrigger)

const commitments = [
    'Complying with the Standards for RTOs 2015',
    'Ensuring training and assessment strategies meet training package requirements',
    'Maintaining current and relevant industry engagement',
    'Providing accurate and transparent information to students prior to enrolment',
    'Implementing fair and equitable enrolment, assessment, and complaints processes',
    'Continuously improving training and assessment practices',
]

const studentChecklist = [
    'Course information and entry requirements',
    'Delivery and assessment arrangements',
    'Fees and payment terms',
    'Student support services',
    'Complaints and appeals procedures',
]

export default function About() {
    const pageRef = useRef(null)
    const standardsRef = useRef(null)
    const standardsBgRef = useRef(null)
    const standardsImageRef = useRef(null)
    const standardsContentRef = useRef(null)

    useEffect(() => {
        if (!pageRef.current) return undefined

        const mm = gsap.matchMedia()
        const ctx = gsap.context(() => {
            gsap.utils.toArray('[data-reveal]').forEach((el) => {
                gsap.fromTo(
                    el,
                    { autoAlpha: 0, y: 36 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 84%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            const points = gsap.utils.toArray('[data-point]')
            if (points.length > 0) {
                gsap.fromTo(
                    points,
                    { autoAlpha: 0, x: -30 },
                    {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '[data-points-wrap]',
                            start: 'top 78%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            }

            gsap.utils.toArray('[data-parallax]').forEach((el) => {
                gsap.fromTo(
                    el,
                    { yPercent: -12, scale: 1.08 },
                    {
                        yPercent: 12,
                        scale: 1.14,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                )
            })

            if (standardsRef.current && standardsBgRef.current && standardsImageRef.current) {
                mm.add('(min-width: 1024px)', () => {
                    ScrollTrigger.create({
                        trigger: standardsRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        pin: standardsBgRef.current,
                        pinSpacing: false,
                        anticipatePin: 1,
                    })

                    gsap.fromTo(
                        standardsImageRef.current,
                        { yPercent: -10, scale: 1.08 },
                        {
                            yPercent: 12,
                            scale: 1.15,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: standardsRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            },
                        }
                    )
                })

                mm.add('(max-width: 1023px)', () => {
                    ScrollTrigger.create({
                        trigger: standardsRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        pin: standardsBgRef.current,
                        pinSpacing: false,
                        anticipatePin: 1,
                    })

                    gsap.fromTo(
                        standardsImageRef.current,
                        { yPercent: -6, scale: 1.04 },
                        {
                            yPercent: 8,
                            scale: 1.1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: standardsRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            },
                        }
                    )
                })

                gsap.fromTo(
                    standardsContentRef.current,
                    { opacity: 0, y: 36 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: standardsRef.current,
                            start: 'top 76%',
                        },
                    }
                )
            }

            ScrollTrigger.refresh()
        }, pageRef)

        return () => {
            mm.revert()
            ctx.revert()
        }
    }, [])

    return (
        <WebLayout>
            <Head title="About Us" />

            <div ref={pageRef}>
                <section className="relative min-h-[88vh] overflow-hidden bg-[#0f1217] pt-24 sm:pt-28 lg:pt-32">
                    <img
                        data-parallax
                        src="assets/images/AboutHero.jpg"
                        alt="Training and classroom environment"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(10,12,16,0.88)_18%,rgba(10,12,16,0.55)_54%,rgba(10,12,16,0.8)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(215,181,90,0.22),transparent_42%)]" />

                    <div className="web-giant-container relative z-10 flex min-h-[88vh] items-end pb-16 sm:pb-20">
                        <div data-reveal className="max-w-4xl">
                            <p className="mb-4 inline-flex rounded-full border border-[#d7b55a]/55 bg-[#d7b55a]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                                Nationally Recognised Training
                            </p>
                            <h1 className="mb-4 text-4xl font-bold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
                                Practical Education for Real Career Outcomes
                            </h1>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/85 sm:text-base">
                                Invention Training College Pty Ltd | RTO Code: 46008
                            </p>
                            <p className="max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
                                We deliver and assess nationally recognised qualifications designed to build job-ready
                                capability. Our training and assessment services align with endorsed training packages
                                and accredited courses within the Australian Qualifications Framework (AQF).
                            </p>
                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#d7b55a] px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#1d1f22] transition hover:bg-[#e3c477]"
                                >
                                    Explore Courses
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:border-white/60 hover:bg-white/10"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-light py-14 sm:py-16">
                    <div className="web-giant-container">
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                            <div data-reveal>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6b1f]">
                                    Who We Are
                                </p>
                                <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1d1f22] sm:text-[2.2rem]">
                                    A Nationally Recognised Training Provider
                                </h2>
                                <p className="mb-4 text-sm leading-relaxed text-[#4b5058] sm:text-base">
                                    Invention Training College Pty Ltd is a Registered Training Organisation (RTO 46008)
                                    approved to deliver and assess nationally recognised qualifications in accordance
                                    with the Standards for Registered Training Organisations (RTOs) 2015.
                                </p>
                                <p className="text-sm leading-relaxed text-[#4b5058] sm:text-base">
                                    All qualifications and statements of attainment issued by Invention Training College
                                    Pty Ltd are nationally recognised within the Australian Qualifications Framework
                                    (AQF).
                                </p>
                            </div>

                            <div data-reveal className="relative h-[360px] sm:h-[440px]">
                                <div className="absolute left-0 top-0 h-[76%] w-[76%] overflow-hidden rounded-[1.4rem] shadow-[0_22px_44px_rgba(0,0,0,0.2)]">
                                    <img
                                        data-parallax
                                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80"
                                        alt="Compliance and quality documentation"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 h-[62%] w-[62%] overflow-hidden rounded-[1.2rem] border-4 border-[#f9f8f6] shadow-[0_18px_36px_rgba(0,0,0,0.22)]">
                                    <img
                                        data-parallax
                                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80"
                                        alt="Students in collaborative learning"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden bg-[#141820] py-16 sm:py-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(78,205,196,0.18),transparent_40%)]" />
                    <div className="web-giant-container relative z-10">
                        <div data-reveal className="mb-10 max-w-3xl">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                                What We Do
                            </p>
                            <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-[2.2rem]">
                                Training, Assessment, and Continuous Quality
                            </h2>
                            <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                                Our training programs are designed to provide students with the skills and knowledge
                                required to meet industry standards and workplace expectations. Training and assessment
                                are conducted by qualified and industry-experienced trainers and assessors.
                            </p>
                        </div>

                        <div data-points-wrap className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {commitments.map((item, index) => (
                                <div
                                    key={item}
                                    data-point
                                    className="flex items-start gap-4 border-b border-white/14 pb-4 text-white/85"
                                >
                                    <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d7b55a]/70 text-[11px] font-semibold text-[#f7dda0]">
                                        {index + 1}
                                    </span>
                                    <p className="text-sm leading-relaxed sm:text-base">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={standardsRef} className="relative isolate overflow-hidden py-20 sm:py-24">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div ref={standardsBgRef} className="relative h-full w-full">
                            <img
                                ref={standardsImageRef}
                                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=2200&q=80"
                                alt="Students and trainer in education setting"
                                className="h-full w-full object-cover will-change-transform"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,16,22,0.84)_16%,rgba(14,16,22,0.35)_58%,rgba(14,16,22,0.8)_100%)]" />
                        </div>
                    </div>

                    <div className="web-giant-container relative z-10 flex min-h-[420px] items-center">
                        <div ref={standardsContentRef} className="max-w-3xl">
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                                National Standards
                            </p>
                            <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-[2.3rem]">
                                Delivered in Accordance with the Standards for RTOs 2015
                            </h2>
                            <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                                We regularly review our policies, procedures, and training resources to ensure ongoing
                                compliance and quality outcomes.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-light py-14 sm:py-16">
                    <div className="web-giant-container">
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
                            <div data-reveal>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6b1f]">
                                    Training and Assessment
                                </p>
                                <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1d1f22] sm:text-[2.2rem]">
                                    Flexible Delivery with Competency-Focused Assessment
                                </h2>
                                <p className="mb-4 text-sm leading-relaxed text-[#4b5058] sm:text-base">
                                    Training delivery methods may include face-to-face, workplace-based, blended, or
                                    online learning, depending on the qualification and cohort requirements.
                                </p>
                                <p className="mb-4 text-sm leading-relaxed text-[#4b5058] sm:text-base">
                                    Assessment methods are designed to ensure competency is demonstrated in accordance
                                    with the principles of assessment and rules of evidence.
                                </p>
                                <p className="text-sm leading-relaxed text-[#4b5058] sm:text-base">
                                    Where required, students must complete structured workplace learning and meet all
                                    assessment requirements before a qualification or statement of attainment is issued.
                                </p>
                            </div>

                            <div data-reveal className="space-y-4">
                                <div className="border-l-2 border-[#d7b55a] pl-4">
                                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6b1f]">
                                        Student Information
                                    </p>
                                    <h3 className="text-2xl font-bold text-[#1d1f22]">Before Enrolment</h3>
                                </div>

                                {studentChecklist.map((item) => (
                                    <div key={item} className="flex items-start gap-3 py-1.5">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8a6b1f]" />
                                        <p className="text-sm leading-relaxed text-[#2f343b] sm:text-base">{item}</p>
                                    </div>
                                ))}

                                <p className="pt-2 text-sm leading-relaxed text-[#4b5058] sm:text-base">
                                    Detailed information is available in the Student Handbook and on individual course
                                    pages.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#12161d] py-14 sm:py-16">
                    <div className="web-giant-container">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_auto] lg:items-end">
                            <div data-reveal>
                                <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                                    <MapPin className="h-4 w-4" />
                                    Location
                                </p>
                                <h2 className="mb-3 text-3xl font-bold leading-tight text-white sm:text-[2.15rem]">
                                    Invention Training College Pty Ltd
                                </h2>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-base">
                                    RTO Code: 46008
                                </p>
                                <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                                    1/40 Raymond Street
                                    <br />
                                    Bankstown NSW 2200
                                </p>
                            </div>

                            <div data-reveal className="flex flex-wrap items-center gap-3">
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#d7b55a] px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#1d1f22] transition hover:bg-[#e3c477]"
                                >
                                    <Compass className="h-4 w-4" />
                                    Explore Courses
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:border-white/55 hover:bg-white/10"
                                >
                                    <FileText className="h-4 w-4" />
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div data-reveal className="mt-10 border-t border-white/12 pt-6">
                            <p className="inline-flex items-center gap-2 text-sm text-white/70">
                                <ShieldCheck className="h-4 w-4 text-[#f7dda0]" />
                                Invention Training College Pty Ltd delivers and assesses nationally recognised
                                qualifications in accordance with the Standards for Registered Training Organisations
                                (RTOs) 2015.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </WebLayout>
    )
}
