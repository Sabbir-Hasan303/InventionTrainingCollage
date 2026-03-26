import React, { useEffect, useRef } from 'react'
import { Head } from '@inertiajs/react'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WebLayout from '@/Layouts/WebLayout'
import EnquiryForm from '@/Components/web/EnquiryForm'

gsap.registerPlugin(ScrollTrigger)

const contactItems = [
    {
        icon: Phone,
        title: 'Call Us',
        value: '+0492 050 353',
        note: 'Monday to Friday, 9:00 AM - 5:00 PM',
        href: 'tel:+0492050353',
    },
    {
        icon: Mail,
        title: 'Email',
        value: 'info@inventiontraining.edu.au',
        note: 'We usually respond within one business day',
        href: 'mailto:info@inventiontraining.edu.au',
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        value: '1/40 Raymond Street, Bankstown NSW 2200',
        note: 'Invention Training College Pty Ltd | RTO Code: 46008',
        href: 'https://maps.google.com/?q=1/40+Raymond+Street+Bankstown+NSW+2200',
    },
]

const enquiryHighlights = [
    'Course suitability and entry requirements',
    'Delivery and assessment arrangements',
    'Fees, payment terms, and available support services',
]

export default function Contact() {
    const pageRef = useRef(null)

    useEffect(() => {
        if (!pageRef.current) return undefined

        const ctx = gsap.context(() => {
            gsap.utils.toArray('[data-contact-reveal]').forEach((item) => {
                gsap.fromTo(
                    item,
                    { autoAlpha: 0, y: 36 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.85,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 84%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            gsap.utils.toArray('[data-contact-parallax]').forEach((item) => {
                gsap.fromTo(
                    item,
                    { yPercent: -8, scale: 1.06 },
                    {
                        yPercent: 10,
                        scale: 1.12,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                )
            })

            ScrollTrigger.refresh()
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <WebLayout>
            <Head title="Contact Us" />

            <div ref={pageRef}>
                <section className="relative isolate min-h-[72vh] overflow-hidden pt-28 sm:pt-32">
                    <img
                        data-contact-parallax
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
                        alt="Students discussing learning pathways"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,12,20,0.9)_18%,rgba(8,12,20,0.56)_56%,rgba(8,12,20,0.8)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_14%,rgba(215,181,90,0.26),transparent_40%)]" />

                    <div className="web-giant-container relative z-10 flex min-h-[72vh] items-end pb-14 sm:pb-20">
                        <div data-contact-reveal className="max-w-4xl">
                            <span className="mb-5 inline-flex rounded-full border border-[#d7b55a]/55 bg-[#d7b55a]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                                Contact Us
                            </span>
                            <h1 className="mb-4 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                                Let&apos;s Plan Your Training Pathway
                            </h1>
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/85 sm:text-base">
                                Invention Training College Pty Ltd | RTO Code: 46008
                            </p>
                            <p className="max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
                                Contact our team to discuss course options, enrolment requirements, delivery modes, and
                                student support services. We are here to help you choose the right qualification for
                                your goals.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative z-30 bg-light py-14 sm:py-16">
                    <div className="web-giant-container">
                        <div className="mb-10 grid grid-cols-1 divide-y divide-[#1d1f22]/12 border-y border-[#1d1f22]/12 md:grid-cols-3 md:divide-x md:divide-y-0">
                            {contactItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                                        data-contact-reveal
                                        className="group px-2 py-5 transition-colors duration-300 hover:bg-[#1d1f22]/[0.025] md:px-5"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1d1f22] text-white transition-colors duration-300 group-hover:bg-[#d7b55a] group-hover:text-[#1d1f22]">
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <h2 className="mb-0.5 text-xl font-bold text-[#1d1f22]">{item.title}</h2>
                                                <p className="mb-1.5 text-sm font-semibold text-[#32363d]">{item.value}</p>
                                                <p className="text-xs text-[#636973]">{item.note}</p>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_520px] lg:items-stretch">
                            <div className="flex h-full flex-col justify-center">
                                <div data-contact-reveal className="pb-6">
                                    <div className="mb-6 flex items-center gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#d7b55a] text-[#1d1f22]">
                                            <Clock3 className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6b1f]">
                                                Office Hours
                                            </p>
                                            <p className="text-sm text-[#3e4550]">Monday to Friday, 9:00 AM - 5:00 PM</p>
                                        </div>
                                    </div>

                                    <h2 className="mb-4 text-3xl font-bold leading-tight text-[#111827] sm:text-[2.1rem]">
                                        Speak with Our Team
                                    </h2>
                                    <p className="mb-4 text-sm leading-relaxed text-[#3f4650] sm:text-base">
                                        We provide information on course suitability, entry requirements, delivery and
                                        assessment arrangements, fees, and support services prior to enrolment.
                                    </p>
                                    <p className="text-sm leading-relaxed text-[#4c5562] sm:text-base">
                                        Detailed student information is available in the Student Handbook and on individual
                                        course pages.
                                    </p>
                                </div>

                                <div data-contact-reveal className="border-t border-[#1d1f22]/12 pt-5">
                                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a6b1f]">
                                        Before You Enquire
                                    </p>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {enquiryHighlights.map((item) => (
                                            <div key={item} className="flex items-start gap-2.5">
                                                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#d7b55a]" />
                                                <p className="text-sm leading-relaxed text-[#343942]">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div data-contact-reveal className="relative z-40 h-full">
                                <EnquiryForm variant="standalone" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative z-10 overflow-hidden bg-[#11161f] py-14 sm:py-16">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(78,205,196,0.14),transparent_42%)]" />
                    <div className="web-giant-container relative z-10">
                        <div data-contact-reveal className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                                    Find Us
                                </p>
                                <h2 className="text-3xl font-bold text-white sm:text-[2.1rem]">
                                    1/40 Raymond Street, Bankstown NSW 2200
                                </h2>
                            </div>
                        </div>

                        <div data-contact-reveal className="overflow-hidden rounded-[1.35rem] border border-white/15 shadow-[0_24px_52px_rgba(0,0,0,0.3)]">
                            <iframe
                                title="Invention Training College Location"
                                src="https://maps.google.com/maps?q=1/40%20Raymond%20Street%20Bankstown%20NSW%202200&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                className="h-[380px] w-full sm:h-[460px]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </WebLayout>
    )
}

