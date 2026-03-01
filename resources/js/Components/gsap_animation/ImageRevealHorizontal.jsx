import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
    {
        bg: "#b6916d",
        src: "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?auto=format&fit=crop&w=1200&q=80",
        alt: "City block with architecture",
    },
    {
        bg: "#bcb8ad",
        src: "https://images.unsplash.com/photo-1505201372024-aedc618d47c3?auto=format&fit=crop&w=1200&q=80",
        alt: "Urban street scene",
    },
    {
        bg: "#b69187",
        src: "https://images.unsplash.com/photo-1531727991582-cfd25ce79613?auto=format&fit=crop&w=1200&q=80",
        alt: "Scenic city view",
    },
    {
        bg: "#3c564f",
        src: "https://images.unsplash.com/photo-1580215935060-a5adc57c5157?auto=format&fit=crop&w=1200&q=80",
        alt: "Neighborhood exterior",
    },
];

export default function ImageRevealHorizontal() {
    const rootRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const revealContainers = gsap.utils.toArray(".js-reveal");

            revealContainers.forEach((container) => {
                const image = container.querySelector("img");

                if (!image) return;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        toggleActions: "restart none none reset",
                    },
                });

                tl.set(container, { autoAlpha: 1 });
                tl.from(container, {
                    xPercent: -100,
                    duration: 1.5,
                    ease: "power2.out",
                });
                tl.from(
                    image,
                    {
                        xPercent: 100,
                        scale: 1.3,
                        duration: 1.5,
                        ease: "power2.out",
                    },
                    "<"
                );
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef}>
            {sections.map((section, idx) => (
                <section
                    key={section.src}
                    className="relative flex h-screen w-full items-center justify-center"
                    style={{ backgroundColor: section.bg }}
                >
                    <div className="js-reveal invisible relative h-[80%] w-[80%] max-w-[500px] overflow-hidden">
                        <img
                            src={section.src}
                            alt={section.alt}
                            className="h-full w-full origin-left object-cover"
                        />
                    </div>

                    {idx === sections.length - 1 && (
                        <p className="absolute bottom-3 text-sm text-white">
                            <a
                                href="https://thisisadvantage.com"
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-2"
                            >
                                Made by Advantage
                            </a>
                        </p>
                    )}
                </section>
            ))}
        </div>
    );
}
