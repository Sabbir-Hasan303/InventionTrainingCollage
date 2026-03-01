import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import "../../../css/slider.css";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const slides = [
    {
        id: 1,
        title: "Luminous Vista",
        image: "https://zajno-storage0.s3.us-west-1.amazonaws.com/dev/codepen/tle/luminous.jpg",
    },
    {
        id: 2,
        title: "Celestial Symphony",
        image: "https://zajno-storage0.s3.us-west-1.amazonaws.com/dev/codepen/tle/celestial.jpg",
    },
];

// Original clip-path patterns from the initial design
const showClipPath = "polygon(0% 0%, 6.25% 0%, 6.25% 100%, 6.25% 100%, 6.25% 100%, 6.25% 0%, 12.5% 0%, 12.5% 100%, 12.5% 100%, 12.5% 0%, 18.75% 0%, 18.75% 100%, 18.75% 100%, 18.75% 0%, 25% 0%, 25% 100%, 25% 100%, 25% 0%, 31.25% 0%, 31.25% 100%, 31.25% 100%, 31.25% 0%, 37.5% 0%, 37.5% 100%, 37.5% 100%, 37.5% 0%, 43.75% 0%, 43.75% 100%, 43.75% 100%, 43.75% 0%, 50% 0%, 50% 100%, 50% 100%, 50% 0%, 56.25% 0%, 56.25% 100%, 56.25% 100%, 56.25% 0%, 62.5% 0%, 62.5% 100%, 62.5% 100%, 62.5% 0%, 68.75% 0%, 68.75% 100%, 68.75% 100%, 68.75% 0%, 75% 0%, 75% 100%, 75% 100%, 75% 0%, 81.25% 0%, 81.25% 100%, 81.25% 100%, 81.25% 0%, 87.5% 0%, 87.5% 100%, 87.5% 100%, 87.5% 0%, 93.75% 0%, 93.75% 100%, 93.75% 100%, 93.75% 0%, 100% 0%, 100% 100%, 0% 100%)";
const hideClipPath = "polygon(6.25% 0%, 6.25% 0%, 6.25% 100%, 6.25% 100%, 12.5% 100%, 12.5% 0%, 12.5% 0%, 12.5% 100%, 18.75% 100%, 18.75% 0%, 18.75% 0%, 18.75% 100%, 25% 100%, 25% 0%, 25% 0%, 25% 100%, 31.25% 100%, 31.25% 0%, 31.25% 0%, 31.25% 100%, 37.5% 100%, 37.5% 0%, 37.5% 0%, 37.5% 100%, 43.75% 100%, 43.75% 0%, 43.75% 0%, 43.75% 100%, 50% 100%, 50% 0%, 50% 0%, 50% 100%, 56.25% 100%, 56.25% 0%, 56.25% 0%, 56.25% 100%, 62.5% 100%, 62.5% 0%, 62.5% 0%, 62.5% 100%, 68.75% 100%, 68.75% 0%, 68.75% 0%, 68.75% 100%, 75% 100%, 75% 0%, 75% 0%, 75% 100%, 81.25% 100%, 81.25% 0%, 81.25% 0%, 81.25% 100%, 87.5% 100%, 87.5% 0%, 87.5% 0%, 87.5% 100%, 93.75% 100%, 93.75% 0%, 93.75% 0%, 93.75% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 6.25% 100%)";

export default function ScreenSlider() {
    const sectionRef = useRef(null);
    const sliderContainerRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || !sliderContainerRef.current) return;

        const ctx = gsap.context(() => {
            CustomEase.create("titleEase", "0.17,0.17,0.49,1.00");

            const sliderImgs = gsap.utils.toArray(".slider-img");

            // Create a timeline that controls the entire animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${(slides.length - 1) * 100}%`,
                    pin: true,
                    scrub: 0.5,
                },
            });

            // Initialize all images
            gsap.set(sliderImgs[0], {
                opacity: 1,
                clipPath: showClipPath,
                transform: "scale(1.1) translateX(-4%)",
                zIndex: 20,
            });

            for (let i = 1; i < sliderImgs.length; i++) {
                gsap.set(sliderImgs[i], {
                    opacity: 1,
                    clipPath: showClipPath,
                    transform: "scale(1.1) translateX(-4%)",
                    zIndex: 10,
                });
            }

            // Animate transitions between slides using original effect
            for (let i = 1; i < sliderImgs.length; i++) {
                // Hide current image with transition
                tl.to(
                    sliderImgs[i - 1],
                    {
                        clipPath: hideClipPath,
                        transform: "scale(1.1) translateX(4%)",
                        duration: 1.5,
                        ease: "power2.inOut",
                    },
                    i === 1 ? 0 : `+=${0.5}`
                );

                // Show next image with transition
                tl.to(
                    sliderImgs[i],
                    {
                        clipPath: showClipPath,
                        transform: "scale(1.1) translateX(-4%)",
                        duration: 1.5,
                        ease: "power2.inOut",
                    },
                    "<"
                );

                // Update z-index after animation
                tl.to(
                    sliderImgs[i - 1],
                    { zIndex: 10, duration: 0 },
                    "<0.75"
                );

                tl.to(
                    sliderImgs[i],
                    { zIndex: 20, duration: 0 },
                    "<"
                );
            }

            // Animate title positions
            for (let i = 1; i < slides.length; i++) {
                tl.to(
                    ".slider-title__item",
                    {
                        y: `-=${100 / slides.length}em`,
                        duration: 1,
                        ease: "titleEase",
                    },
                    i === 1 ? 0 : `+=${0.2}`
                );

                tl.to(
                    ".slider-numeric__item",
                    {
                        y: `-=${100 / slides.length}em`,
                        duration: 1,
                        ease: "titleEase",
                    },
                    `<`
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-[#0c0d10]"
        >
            {/* Slider Container */}
            <div
                ref={sliderContainerRef}
                className="relative w-full h-full"
            >
                {/* Background Images */}
                <div className="absolute inset-0 w-full h-full">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className="slider-img absolute inset-0 w-full h-full"
                            style={{
                                opacity: index === 0 ? 1 : 0,
                                zIndex: slides.length - index,
                            }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,8,10,0.9),rgba(8,8,10,0.2)_50%,rgba(8,8,10,0.85))] mix-blend-multiply" />

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="text-xs font-semibold uppercase tracking-[0.4em] text-[rgba(247,242,237,0.7)] mb-8">
                        NextHome Properties
                    </div>

                    <div className="h-[1.1em] overflow-hidden font-['Playfair_Display'] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-center mb-8">
                        <div className="flex flex-col gap-0">
                            {slides.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="slider-title__item h-[1.1em] whitespace-nowrap"
                                >
                                    {slide.title}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-[clamp(0.95rem,1.4vw,1.2rem)] text-[rgba(247,242,237,0.75)] max-w-[50ch] text-center">
                        Scroll to explore the atmosphere and mood of each scene.
                    </p>
                </div>

                {/* Bottom Counter */}
                <div className="absolute bottom-[6vh] left-[4vw] right-[4vw] z-20 flex items-center justify-between text-[0.95rem] uppercase tracking-[0.08em] text-[rgba(247,242,237,0.75)]">
                    <div className="inline-flex items-center gap-[0.6rem]">
                        <span className="inline-block h-px w-[34px] bg-[rgba(247,242,237,0.6)]" />
                        Scroll
                    </div>
                    <div className="inline-flex items-baseline gap-[0.6rem] text-base text-[rgba(247,242,237,0.85)]">
                        <div className="h-[1.2em] overflow-hidden">
                            {slides.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="slider-numeric__item h-[1.2em]"
                                >
                                    {String(slide.id).padStart(2, "0")}
                                </div>
                            ))}
                        </div>
                        <span className="text-[0.9rem] text-[rgba(247,242,237,0.6)]">
                            / {String(slides.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
