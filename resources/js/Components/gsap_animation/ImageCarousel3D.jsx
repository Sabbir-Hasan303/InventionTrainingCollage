import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460317442991-0ec2aa24e565?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
];

export default function ImageCarousel3D() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const scrollerEl = document.querySelector("#main-scroll-container");
        const scrollerForST = scrollerEl || window;

        const onScrollUpdate = () => ScrollTrigger.update();

        if (scrollerEl) {
            ScrollTrigger.scrollerProxy(scrollerEl, {
                scrollTop(value) {
                    if (arguments.length) {
                        scrollerEl.scrollTop = value;
                    }

                    return scrollerEl.scrollTop;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    };
                },
                pinType: "transform",
            });

            scrollerEl.addEventListener("scroll", onScrollUpdate);
            ScrollTrigger.addEventListener("refresh", onScrollUpdate);
        }

        const ctx = gsap.context(() => {
            const carousel = section.querySelector("#half3dCylinder");
            const faces = gsap.utils.toArray(".carousel__face", section);

            if (!carousel || faces.length === 0) return;

            const faceCount = faces.length;
            const theta = 360 / faceCount;
            const radius = 450;

            gsap.set(faces, {
                transformOrigin: `50% 50% ${-radius}px`,
                z: radius,
                rotateY: (index) => index * theta,
            });

            gsap.to(carousel, {
                rotateY: -360,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    scroller: scrollerForST === window ? window : scrollerForST,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });
        }, section);

        return () => {
            ctx.revert();

            if (scrollerEl) {
                scrollerEl.removeEventListener("scroll", onScrollUpdate);
                ScrollTrigger.removeEventListener("refresh", onScrollUpdate);
            }
        };
    }, []);

    return (
        <section
            id="half3d-section"
            ref={sectionRef}
            className="relative flex h-screen flex-col items-center overflow-hidden bg-[#111] py-16 text-white"
            style={{
                "--card-width": "300px",
                "--card-height": "400px",
                "--carousel-radius": "450px",
            }}
        >
            <div className="relative mt-[50px] flex h-[var(--card-height)] w-full items-center justify-center [perspective:1000px]">
                <div
                    id="half3dCylinder"
                    className="absolute h-[var(--card-height)] w-[var(--card-width)] [transform:translateZ(calc(var(--carousel-radius)*-1))] [transform-style:preserve-3d]"
                >
                    {images.map((image, index) => (
                        <div
                            key={image}
                            className="carousel__face absolute left-0 top-0 h-[var(--card-height)] w-[var(--card-width)] rounded-[12px] border-2 border-white/10 bg-cover bg-center [backface-visibility:hidden]"
                            style={{ backgroundImage: `url('${image}')` }}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
