import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "../../../css/gallery.css";

export default function GsapGallery() {
    const rootRef = useRef(null);
    const boxesRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let currentImg = null;
            let currentImgProps = { x: 0, y: 0 };
            let isZooming = false;
            let column = -1;

            const boxes = [];

            // CREATE BOXES
            for (let i = 0; i < 12; i++) {
                if (i % 4 === 0) column++;

                const box = document.createElement("div");
                box.className = `photoBox pb-col${column}`;
                boxesRef.current.appendChild(box);
                boxes.push(box);

                gsap.set(box, {
                    backgroundImage: `url(https://assets.codepen.io/721952/${i}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    x: [60, 280, 500][column],
                    width: 400,
                    height: 640,
                    borderRadius: 20,
                    scale: 0.5,
                    zIndex: 1
                });

                box.tl = gsap
                    .timeline({ paused: true, repeat: -1 })
                    .fromTo(
                        box,
                        { y: [-575, 800, 800][column], rotation: -0.05 },
                        {
                            y: [800, -575, -575][column],
                            rotation: 0.05,
                            duration: [40, 35, 26][column],
                            ease: "none"
                        }
                    )
                    .progress((i % 4) / 4);
            }

            // HELPERS
            const pauseBoxes = target => {
                const col = target.classList.contains("pb-col1")
                    ? "pb-col1"
                    : target.classList.contains("pb-col2")
                        ? "pb-col2"
                        : "pb-col0";

                boxes.forEach(b => {
                    if (b.classList.contains(col)) {
                        gsap.to(b.tl, { timeScale: 0, ease: "sine" });
                    }
                });
            };

            const playBoxes = () => {
                boxes.forEach(b => {
                    b.tl.play();
                    gsap.to(b.tl, { timeScale: 1, duration: 0.4, ease: "sine.in" });
                });
            };

            // INITIAL SETUP
            gsap
                .timeline({ onStart: playBoxes })
                .set(rootRef.current, { perspective: 800 })
                .set(".photoBox", { opacity: 1, cursor: "pointer" })
                .set(boxesRef.current, {
                    left: "75%",
                    xPercent: -50,
                    width: 1200,
                    rotationX: 14,
                    rotationY: -15,
                    rotationZ: 10
                })
                .fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.2);

            // EVENTS
            boxes.forEach(box => {
                box.addEventListener("mouseenter", () => {
                    if (currentImg) return;
                    pauseBoxes(box);

                    gsap.to(box, {
                        scale: 0.62,
                        zIndex: 100,
                        duration: 0.25,
                        ease: "power3.out"
                    });
                });

                box.addEventListener("mouseleave", () => {
                    if (currentImg) return;
                    playBoxes();

                    gsap.to(box, {
                        scale: 0.5,
                        zIndex: 1,
                        duration: 0.3,
                        ease: "expo.out"
                    });
                });

                box.addEventListener("click", () => {
                    if (isZooming) return;
                    isZooming = true;
                    gsap.delayedCall(0.8, () => (isZooming = false));

                    if (currentImg === box) {
                        // CLOSE LIGHTBOX → RESTORE GRID + PERSPECTIVE
                        gsap.timeline({ defaults: { duration: 0.6, ease: "expo.inOut" } })
                            .to(box, {
                                width: 400,
                                height: 640,
                                borderRadius: 20,
                                x: currentImgProps.x,
                                y: currentImgProps.y,
                                scale: 0.5,
                                zIndex: 1
                            }, 0)
                            .to(boxesRef.current, {
                                left: "75%",
                                xPercent: -50,
                                width: 1200,
                                rotationX: 14,
                                rotationY: -15,
                                rotationZ: 10,
                                scale: 1
                            }, 0);

                        currentImg = null;
                        playBoxes();
                    } else {
                        pauseBoxes(box);

                        currentImg = box;
                        currentImgProps.x = gsap.getProperty(box, "x");
                        currentImgProps.y = gsap.getProperty(box, "y");

                        gsap.timeline({ defaults: { duration: 0.6, ease: "expo.inOut" } })
                            .set(box, { zIndex: 100 })
                            .to(box, {
                                width: "100%",
                                height: "100%",
                                borderRadius: 0,
                                x: 0,
                                y: 0,
                                scale: 1
                            })
                            .to(boxesRef.current, {
                                left: "50%",
                                width: "100%",
                                rotationX: 0,
                                rotationY: 0,
                                rotationZ: 0
                            }, 0);
                    }
                });
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="main" ref={rootRef}>
            {/* <div className="flex flex-col xl:flex-row justify-between gap-10 h-full px-10">
                <div className="flex flex-col gap-6 py-[150px] pl-[107px]">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">Our Creative Gallery</h1>
                    <p className="text-base md:text-lg leading-relaxed text-white w-1/2">
                        Explore a curated selection of visuals crafted to inspire. Hover to
                        preview motion, click to dive deep, and experience the gallery in an
                        immersive 3D perspective.
                    </p>
                </div>
                <div className="w-full h-full">
                    <div className="mainBoxes" ref={boxesRef} />
                </div>
            </div> */}
            <div className="mainBoxes" ref={boxesRef} />
        </div>
    );
}



