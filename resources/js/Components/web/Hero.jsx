import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@inertiajs/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef(null);
    const videoRef = useRef(null);
    const contentRef = useRef(null);
    const indicatorRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const hero = heroRef.current;
        const video = videoRef.current;
        const content = contentRef.current;
        const indicator = indicatorRef.current;

        if (!hero || !video || !content) return;

        // Intro animation (on page load)
        const introTl = gsap.timeline();

        introTl
            .fromTo(
                video,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
            )
            .fromTo(
                content,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out'
                },
                '-=0.8'
            );

        let indicatorTween = null;
        if (indicator) {
            indicatorTween = gsap.fromTo(
                indicator,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    ease: 'power1.inOut',
                    delay: 1.5,
                    repeat: -1,
                    yoyo: true
                }
            );
        }

        // Scroll-based parallax - subtle effect
        const scrollTl = gsap.timeline();

        scrollTl
            .to(video, {
                scale: 1.08,
                ease: 'none'
            });

        const heroScrollTrigger = ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            animation: scrollTl,
            markers: false
        });

        return () => {
            heroScrollTrigger?.kill();
            scrollTl.kill();
            introTl.kill();
            indicatorTween?.kill();
            gsap.killTweensOf([video, content, indicator]);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
            {/* Background video */}
            <div ref={videoRef} className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://neom.scene7.com/is/content/neom/16X9_PROGRESS_VNR_15SEC" type="video/mp4" />
                </video>
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content - Bottom Left Position */}
            <div
                ref={contentRef}
                className="absolute bottom-0 left-0 z-10 p-8 md:p-12 lg:p-16 max-w-3xl"
                style={{ pointerEvents: 'auto' }}
            >
                <div className="space-y-6">
                    {/* Heading */}
                    <div>
                        <h1 className="hero-title text-white mb-3">
                            A NEW ERA OF INNOVATION
                        </h1>
                        <p className="max-w-2xl hero-description text-white/90">
                            Build your future with Bangladesh&apos;s most trusted real estate partner.
                        </p>
                    </div>

                    {/* CTA Button - Transparent Style */}
                    <div>
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="flex items-center gap-3 px-8 py-4 border-2 border-white/60 text-white hover:border-white hover:bg-white/5 rounded-full transition-all duration-300 group"
                        >
                            <PlayArrow className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm md:text-base font-light tracking-wider uppercase">
                                Watch Full Video
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Bottom Center */}
            <div
                ref={indicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white/50 text-xs tracking-widest uppercase font-light">Scroll</span>
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center items-start">
                        <div className="w-1 h-2 bg-white/60 rounded-full mt-2" />
                    </div>
                </div>
            </div>

            {/* Video Modal - Optional Full Screen Video */}
            {isPlaying && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsPlaying(false);
                        }
                    }}
                >
                    <div className="relative w-full max-w-4xl">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsPlaying(false);
                            }}
                            className="absolute -top-10 right-0 text-white text-4xl font-light hover:text-[#4ECDC4] transition-colors z-10 leading-none"
                            type="button"
                        >
                            ✕
                        </button>
                        <video
                            autoPlay
                            controls
                            className="w-full rounded-lg"
                        >
                            <source src="https://neom.scene7.com/is/content/neom/16X9_PROGRESS_VNR_15SEC" type="video/mp4" />
                        </video>
                    </div>
                </div>
            )}
        </section>
    );
}
