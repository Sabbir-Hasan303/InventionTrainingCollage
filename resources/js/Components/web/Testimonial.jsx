import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
    {
        quote:
            'From booking to registration, every step was clear and secure. I finally bought land without stress.',
        name: 'Md. Karim Rahman',
        role: 'Plot Owner, Pushpodhara Eco-City',
        accent: 'from-amber-500/25 via-orange-400/10 to-transparent',
    },
    {
        quote:
            'Their team explained legal documents in plain language. That level of transparency is rare in real estate.',
        name: 'Farhana Akter',
        role: 'Investor, New Township Phase 2',
        accent: 'from-amber-500/25 via-orange-400/10 to-transparent',
    },
    {
        quote:
            'Site visits, financing guidance, and after-sales support were all handled professionally and on time.',
        name: 'Abdullah Al Noman',
        role: 'Home Builder, RiverView Enclave',
        accent: 'from-amber-500/25 via-orange-400/10 to-transparent',
    },
    {
        quote:
            'I trust Next Home because they deliver what they promise. The whole experience felt premium and reliable.',
        name: 'Nusrat Jahan',
        role: 'Client, Green Horizon Community',
        accent: 'from-amber-500/25 via-orange-400/10 to-transparent',
    },
];

export default function Testimonial() {
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            const panels = gsap.utils.toArray('.testimonial-layer', sectionRef.current);
            if (!panels.length) return;

            const pinTriggers = panels.map((panel, index) =>
                ScrollTrigger.create({
                    trigger: panel,
                    start: () => (panel.offsetHeight < window.innerHeight ? 'top top' : 'bottom bottom'),
                    pin: true,
                    pinSpacing: index === panels.length - 1,
                    anticipatePin: 1,
                })
            );

            panels.forEach((panel) => {
                const content = panel.querySelector('.testimonial-card');
                if (!content) return;

                gsap.fromTo(
                    content,
                    { autoAlpha: 0, y: 48, scale: 0.96 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: panel,
                            start: 'top 75%',
                            end: 'top 40%',
                            scrub: false,
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            ScrollTrigger.refresh();

            return () => {
                pinTriggers.forEach((trigger) => trigger.kill());
            };
        },
        { scope: sectionRef, revertOnUpdate: true }
    );

    return (
        <section
            ref={sectionRef}
            className="relative overflow-clip bg-dark"
        >
            {testimonials.map((item, index) => (
                <article
                    key={item.name}
                    className="testimonial-layer relative flex h-screen w-full items-center justify-center px-6 py-16 md:px-10"
                >
                    <div className="testimonial-card relative w-full max-w-[1400px] rounded-3xl border border-white/10 bg-gradient-to-br from-[#242424] to-[#161719] p-10 shadow-[0_24px_90px_rgba(0,0,0,0.45)] md:p-16 lg:p-20">
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="mb-8 text-6xl leading-none text-[#4ECDC4]">"</div>
                            <p className="text-2xl font-light leading-relaxed text-white md:text-4xl">
                                {item.quote}
                            </p>
                            <div className="mx-auto mb-8 mt-10 h-1 w-16 bg-[#4ECDC4]" />
                            <h4 className="text-3xl font-light text-white">{item.name}</h4>
                            <p className="mt-2 text-xl text-white/50">{item.role}</p>
                            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/35">
                                {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
}
