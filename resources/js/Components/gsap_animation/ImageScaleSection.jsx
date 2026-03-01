import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function ImageScaleSection() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const imageWrapperRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || !imageRef.current || !imageWrapperRef.current) return;

        // Only animate on desktop screens (md breakpoint = 426px)
        const isDesktop = window.innerWidth >= 426;

        if (!isDesktop) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=1500",
                    pin: true,
                    scrub: true,
                },
            });

            tl.to(
                    "h2",
                    {
                        duration: 60,
                        color: "#91a052",
                    },
                    0
                )
                .to(
                    imageWrapperRef.current,
                    {
                        xPercent: 50,
                        duration: 20,
                    },
                    0
                )
                .to(
                    imageRef.current,
                    {
                        xPercent: -40,
                        duration: 20,
                    },
                    0
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen overflow-hidden"
        >
                    {/* Divider */}
                    <div className="absolute hidden md:block left-1/2 top-0 h-full w-px -translate-x-px bg-[#ebebeb]" />

                    {/* Container */}
                    <div className="relative mx-auto h-full w-full">
                        <div className="relative flex h-full flex-col md:flex-row">
                            {/* Left Content */}
                            <div className="grid w-full md:w-1/2 p-6 md:p-16 md:pt-32 justify-center">
                                <span className="text-lg md:text-2xl lg:text-3xl font-light">Our solutions use</span>

                                <h2 className="mb-8 md:mb-16 text-6xl md:text-8xl leading-[1.1] tracking-[-0.05em] md:tracking-[-0.2rem]">
                                    <span>9</span>% <br />
                                    less water
                                </h2>

                                <p className="max-w-[50ch] text-sm md:text-base text-[#82837f]">
                                    Over 600 gallons of water is wasted every minute by using
                                    outdated methods. Our improved technology reduce both water
                                    waste and land needed to grow.
                                </p>
                            </div>

                            {/* Right Image */}
                            <div
                                ref={imageWrapperRef}
                                className="relative md:absolute md:left-0 md:top-0 w-full md:w-full h-64 md:h-full z-[2] origin-right overflow-hidden"
                            >
                                <img
                                    ref={imageRef}
                                    src="https://assets.codepen.io/2479807/field.jpeg"
                                    alt="Field"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
    );
}
