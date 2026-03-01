import React, { useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EnquiryForm from './EnquiryForm'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
    const ctaRef = useRef(null)

    useEffect(() => {
        if (!ctaRef.current) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.cta-left',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: 'top 80%',
                    },
                }
            )

            gsap.fromTo(
                '.cta-form',
                { opacity: 0, y: 42 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.82,
                    ease: 'power3.out',
                    delay: 0.08,
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: 'top 76%',
                    },
                }
            )
        }, ctaRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ctaRef} className="relative isolate overflow-hidden py-24 sm:py-28">
            <div
                className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage:
                        'linear-gradient(90deg, rgba(9,15,24,0.86) 0%, rgba(9,15,24,0.66) 52%, rgba(9,15,24,0.48) 100%), linear-gradient(0deg, rgba(4,8,14,0.42), rgba(4,8,14,0.42)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2200&q=80)',
                }}
            />

            <div className="web-giant-container relative z-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.35fr_540px] lg:gap-12">
                    <div className="cta-left max-w-3xl">
                        <h2 className="mb-4 text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="mb-7 text-lg leading-relaxed text-white/90">
                            Get in touch with our team to discuss your training options. We are here to help you take
                            the next step in your career.
                        </p>
                        <a href="tel:+61200000000" className="inline-flex items-center gap-2 text-3xl font-semibold text-[#f5c326]">
                            <Phone className="h-5 w-5" />
                            (02) 0000 0000
                        </a>
                    </div>

                    <div className="cta-form w-full lg:justify-self-end">
                        <EnquiryForm variant="standalone" />
                    </div>
                </div>
            </div>
        </section>
    )
}
