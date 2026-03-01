import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { ShieldOutlined, TrackChangesOutlined, FactCheckOutlined, GroupsOutlined } from '@mui/icons-material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: 'Trust & Transparency',
        desc: 'Clear documentation and honest practices',
        icon: ShieldOutlined,
    },
    {
        title: 'Planning & Structure',
        desc: 'Thoughtfully designed developments',
        icon: TrackChangesOutlined,
    },
    {
        title: 'Verified Documentation',
        desc: 'Complete legal clarity',
        icon: FactCheckOutlined,
    },
    {
        title: 'Long-term Partnership',
        desc: 'Support beyond the purchase',
        icon: GroupsOutlined,
    },
];

export default function AboutUs() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const revealBox = sectionRef.current?.querySelector('.about-image-reveal');
            const revealImage = sectionRef.current?.querySelector('.about-image-reveal img');

            if (!revealBox || !revealImage) return;

            const imageTl = gsap.timeline({
                scrollTrigger: {
                    trigger: revealBox,
                    start: 'top 82%',
                    toggleActions: 'restart none none reset',
                },
            });

            imageTl
                .set(revealBox, { autoAlpha: 1 })
                .fromTo(
                    revealBox,
                    { xPercent: -100 },
                    { xPercent: 0, duration: 1.35, ease: 'power3.out' }
                )
                .fromTo(
                    revealImage,
                    { xPercent: 100, scale: 1.18 },
                    { xPercent: 0, scale: 1, duration: 1.35, ease: 'power3.out' },
                    '<'
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-light py-20 md:py-28">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#0f8a80]/10 blur-[110px]" />
                <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#0b4f7f]/8 blur-[130px]" />
            </div>

            <div className="web-giant-container relative z-10">
                <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
                    <div className="lg:col-span-6">
                        <div className="relative">
                            <div className="about-image-reveal invisible relative h-[360px] overflow-hidden rounded-2xl border border-black/10 md:h-[520px] lg:h-[620px]">
                                <img
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                                    alt="Property Documentation"
                                    className="h-full w-full origin-left object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-6 left-6 right-6 z-20 rounded-xl border border-black/20 bg-white p-5 shadow-[0_16px_34px_rgba(8,16,26,0.16)] md:left-8 md:right-auto md:w-[76%]">
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#5c6570]">Verified & Protected</p>
                                <p className="mt-2 text-base font-semibold text-[#1d232b] md:text-xl">
                                    Transparent documents and a trusted handover process.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 text-[#1a2129]">
                        <span className="block section-sub-title text-[#B89535]">
                            ABOUT US
                        </span>
                        <h2
                            className="mt-5 section-title text-[#1D1F22]">
                            Building Trust Through Transparent Property Solutions
                        </h2>
                        <p className="mt-6 max-w-2xl card-description-big text-[#1D1F22]">
                            Next Home Properties is a trust-first real estate brand built for people who think long-term.
                            We focus on clarity, documentation, and responsible guidance to help you make smart property decisions.
                        </p>

                        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {features.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="flex items-start gap-3 rounded-lg border border-black/10 bg-white/55 p-3">
                                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#e8eceb] text-[#0f5954]">
                                            <Icon fontSize="small" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-[#1f2730]">{item.title}</p>
                                            <p className="text-base font-medium text-[#4b5560]">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            href="#"
                            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#1f2630] bg-[#1f2630] px-8 py-3.5 text-sm xl:text-base font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#121820] hover:border-[#121820]"
                        >
                            <span>Learn More About Us</span>
                            <span className="inline-flex h-5 w-5 items-center justify-center text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                                &rarr;
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
