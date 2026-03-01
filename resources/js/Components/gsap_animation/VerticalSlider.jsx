import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import "./VerticalSlider.css";

gsap.registerPlugin(Draggable);

const colors = ["#426F42", "#262626", "#36648B", "#683A5E", "#683A5E", "#36648B"];
const toolTipLabels = [
    "Slider Control",
    "Powered by GSAP",
    "Side animation",
    "Random dog",
    "Sliders are useful",
    "Follow on Twitter",
];

export default function VerticalSlider() {
    const sectionRef = useRef(null);
    const rootRef = useRef(null);
    const masterWrapRef = useRef(null);
    const panelWrapRef = useRef(null);
    const dotsWrapRef = useRef(null);
    const toolTipsWrapRef = useRef(null);
    const slidesRef = useRef([]);
    const dotsRef = useRef([]);
    const toolTipsRef = useRef([]);

    const activeSlideRef = useRef(0);
    const offsetsRef = useRef([]);
    const ihRef = useRef(typeof window !== "undefined" ? window.innerHeight : 0);
    const dragRef = useRef(null);
    const dotAnimRef = useRef(null);
    const toolTipAnimsRef = useRef([]);
    const slideAnimRef = useRef(null);

    useLayoutEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            const slides = slidesRef.current.filter(Boolean);
            const dots = dotsRef.current.filter(Boolean);
            const toolTips = toolTipsRef.current.filter(Boolean);
            const container = panelWrapRef.current;
            const masterWrap = masterWrapRef.current;
            const dur = 0.6;

            // Set slide colors and tooltip timelines
            toolTipAnimsRef.current = toolTips.map((tip, i) => {
                gsap.set(slides[i], { backgroundColor: colors[i] });
                const tl = gsap.timeline({ paused: true, reversed: true });
                tl.to(tip, { duration: 0.25, opacity: 1, ease: "none" });
                return tl;
            });

            // Icon animations for slide 1
            const mouseAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
            const handAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
            const cursorAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
            const arrowAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            mouseAnim.fromTo(
                "#mouseRings circle",
                { attr: { r: 12 } },
                { duration: 0.8, stagger: 0.25, attr: { r: 40 } }
            );
            mouseAnim.fromTo(
                "#mouseRings circle",
                { opacity: 0 },
                { duration: 0.4, stagger: 0.25, opacity: 1 },
                0
            );
            mouseAnim.fromTo(
                "#mouseRings circle",
                { opacity: 1 },
                { duration: 0.4, stagger: 0.25, opacity: 0 },
                0.4
            );

            handAnim.to("#hand", { duration: 0.75, y: -16, rotation: 5, transformOrigin: "right bottom" });
            handAnim.to("#hand", { duration: 0.5, y: 15, ease: "power3.inOut" });
            handAnim.to("#hand", { duration: 1, y: 0, rotation: 0 });

            gsap.set("#cursor", { rotation: 240, transformOrigin: "center center", x: -25 });
            cursorAnim.to("#cursor", { duration: 0.25, y: -24 });
            cursorAnim.to("#iconCircles circle", { duration: 0.5, stagger: 0.15, attr: { r: 6 } }, "expand");
            cursorAnim.to("#cursor", { duration: 1.1, y: 50 }, "expand");
            cursorAnim.to("#cursor", { duration: 0.75, y: 0 }, "contract");
            cursorAnim.to("#iconCircles circle", { duration: 0.5, attr: { r: 4 } }, "contract");

            arrowAnim.to("#caret", {
                duration: 0.5,
                attr: { points: "30 40, 50 65, 70 40" },
                repeat: 3,
                yoyo: true,
                ease: "power2.inOut",
                repeatDelay: 0.25,
            });

            // Position nav dots and tooltips
            gsap.set(dotsWrapRef.current, { yPercent: -50 });
            gsap.set(toolTipsWrapRef.current, { yPercent: -50 });

            // Side screen animation with nav dots
            const dotAnim = gsap.timeline({ paused: true });
            dotAnim.to(
                dots,
                {
                    stagger: { each: 1, yoyo: true, repeat: 1 },
                    scale: 2.1,
                    rotation: 0.1,
                    ease: "none",
                },
                0.5
            );
            dotAnim.time(1);
            dotAnimRef.current = dotAnim;

            const tweenDot = () => {
                if (!dotAnimRef.current) return;
                gsap.set(dotAnimRef.current, {
                    time: Math.abs(gsap.getProperty(container, "y") / ihRef.current) + 1,
                });
            };

            const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

            const syncToScroll = () => {
                if (!sectionRef.current) return;
                const sectionTop = sectionRef.current.offsetTop;
                const sectionHeight = sectionRef.current.offsetHeight;
                const scrollSpan = Math.max(sectionHeight - window.innerHeight, 1);
                const scrollY = window.scrollY;
                const progress = clamp((scrollY - sectionTop) / scrollSpan, 0, 1);

                const totalTravel = (slides.length - 1) * ihRef.current;
                const y = -progress * totalTravel;
                gsap.set(container, { y });
                tweenDot();

                const nearestIndex = Math.round(progress * (slides.length - 1));
                activeSlideRef.current = clamp(nearestIndex, 0, slides.length - 1);
            };

            const scrollToSlide = (index) => {
                if (!sectionRef.current) return;
                const sectionTop = sectionRef.current.offsetTop;
                const sectionHeight = sectionRef.current.offsetHeight;
                const scrollSpan = Math.max(sectionHeight - window.innerHeight, 1);
                const progress = slides.length === 1 ? 0 : index / (slides.length - 1);
                const targetScroll = sectionTop + progress * scrollSpan;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
            };

            const slideAnim = ({ source, direction, index, deltaY, endY }) => {
                const slidesCount = slides.length;
                let activeSlide = activeSlideRef.current;
                const oldSlide = activeSlide;

                if (source === "dragger") {
                    const dragIndex = offsetsRef.current.indexOf(endY);
                    activeSlide = dragIndex === -1 ? activeSlide : dragIndex;
                } else {
                    if (gsap.isTweening(container)) return;
                    if (source === "arrow") {
                        activeSlide += direction === "down" ? 1 : -1;
                    } else if (source === "dot") {
                        activeSlide = index;
                    } else if (source === "wheel") {
                        activeSlide += deltaY > 0 ? 1 : -1;
                    }
                }

                activeSlide = activeSlide < 0 ? 0 : activeSlide;
                activeSlide = activeSlide > slidesCount - 1 ? slidesCount - 1 : activeSlide;

                if (oldSlide === activeSlide) return;
                activeSlideRef.current = activeSlide;

                if (source !== "scroll") {
                    scrollToSlide(activeSlide);
                }
            };

            slideAnimRef.current = slideAnim;

            const newSize = () => {
                offsetsRef.current = [];
                ihRef.current = window.innerHeight;
                gsap.set(panelWrapRef.current, { height: slides.length * ihRef.current });
                gsap.set(slides, { height: ihRef.current });
                for (let i = 0; i < slides.length; i++) {
                    offsetsRef.current.push(-slides[i].offsetTop);
                }
                syncToScroll();
                if (dragRef.current) {
                    dragRef.current.vars.snap = offsetsRef.current;
                    dragRef.current.update(true);
                }
            };

            const onScroll = () => {
                syncToScroll();
            };

            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", newSize);

            dragRef.current = Draggable.create(container, {
                type: "y",
                edgeResistance: 1,
                onDragEnd: function () {
                    slideAnim({ source: "dragger", endY: this.endY });
                },
                onDrag: tweenDot,
                onThrowUpdate: tweenDot,
                snap: offsetsRef.current,
                inertia: false,
                zIndexBoost: false,
                allowNativeTouchScrolling: false,
                bounds: masterWrap,
            })[0];
            dragRef.current.id = "dragger";

            newSize();
            gsap.set(rootRef.current, { opacity: 1 });

            return () => {
                window.removeEventListener("scroll", onScroll);
                window.removeEventListener("resize", newSize);
                if (dragRef.current) dragRef.current.kill();
            };
        }, rootRef);

        return () => ctx.revert();
    }, []);

    const handleDotHover = (index) => {
        const tl = toolTipAnimsRef.current[index];
        if (!tl) return;
        tl.reversed() ? tl.play() : tl.reverse();
    };

    const handleDotClick = (index) => {
        if (!slideAnimRef.current) return;
        slideAnimRef.current({ source: "dot", index });
    };

    const handleArrowClick = (direction) => {
        if (!slideAnimRef.current) return;
        slideAnimRef.current({ source: "arrow", direction });
    };

    return (
        <section ref={sectionRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen">
                <div
                    ref={rootRef}
                    className="relative h-screen w-full overflow-hidden text-white opacity-0"
                    style={{ fontFamily: '"Roboto", sans-serif' }}
                >
                    <div id="masterWrap" ref={masterWrapRef} className="absolute h-full w-full overflow-hidden">
                        <div id="panelWrap" ref={panelWrapRef} className="h-full w-full">
                            <section ref={(el) => (slidesRef.current[0] = el)} className="relative flex w-full flex-col items-center justify-center font-bold">
                                <h3 className="text-[1.5em]">Controls</h3>
                                <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">
                                    You can control the slider in 4 ways.
                                </p>
                                <div className="mt-[30px] w-[300px] min-[700px]:w-[600px]">
                                    <div className="float-left w-[150px] text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" className="my-[6px] h-[50px] w-[50px] overflow-visible">
                                            <path
                                                d="M54.53,41.57a12.22,12.22,0,0,1,1.54,5.9c0,3.54-1.76,6.62-4.57,7.52v4.22H70.9A49.15,49.15,0,0,0,63.77,39C60.28,33.65,56,30.18,51.5,29.52v9.12A6.66,6.66,0,0,1,54.53,41.57Z"
                                                fill="#fff"
                                            />
                                            <path
                                                d="M28.67,62.82c-.06.94-.08,1.86-.08,2.87,0,8.73,2.49,16.07,6.4,21.18s9.2,8,15,8,11.08-2.87,15-8,6.41-12.45,6.41-21.18c0-1,0-1.94-.08-2.89ZM53,88h0a1,1,0,0,1-1-1,1,1,0,0,1,1-1c7.43-.11,13.6-7.6,13.6-17v-.45a1,1,0,0,1,2.06,0v.48C68.62,79.14,61.86,87.75,53,88Z"
                                                fill="#fff"
                                            />
                                            <path
                                                d="M43.64,47.47a12.19,12.19,0,0,1,1.52-5.86,6.64,6.64,0,0,1,3-2.94V29.54c-4.44.72-8.73,4.2-12.18,9.49a48.9,48.9,0,0,0-7.09,20.18H48.15V55C45.38,54,43.62,51,43.64,47.47Z"
                                                fill="#fff"
                                            />
                                            <path
                                                d="M42.3,14.7c1.86,1,4.21,1.16,6,1.72a5.37,5.37,0,0,1,2.08,1,2,2,0,0,1,.68,1.64c0,1.08-.56,2.89-2.18,5.54A1,1,0,0,0,49.27,26l.52.14a1,1,0,0,0,.88-.49c1.7-2.81,2.46-4.88,2.48-6.61a4.2,4.2,0,0,0-2.25-3.8c-1.86-1-4.23-1.26-6.06-1.79a5.74,5.74,0,0,1-2.1-.94,1.7,1.7,0,0,1-.65-1.45,9.45,9.45,0,0,1,1.65-4.37,1,1,0,0,0-1.76-1A11.1,11.1,0,0,0,40,11.08,4,4,0,0,0,42.3,14.7Z"
                                                fill="#fff"
                                            />
                                            <g id="mouseRings" stroke="white" strokeWidth="2" fill="none">
                                                <circle cx="50" cy="47" r="12" />
                                                <circle cx="50" cy="47" r="12" />
                                                <circle cx="50" cy="47" r="12" />
                                                <circle cx="50" cy="47" r="12" />
                                            </g>
                                        </svg>
                                        <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">Mousewheel</p>
                                    </div>
                                    <div className="float-left w-[150px] text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="#fff" className="my-[6px] h-[50px] w-[50px] overflow-visible">
                                            <path d="M71.35,4.5H28.65C23.86,4.5,20,8,20,12.35V72.84c0,4.31,3.91,7.85,8.7,7.85h6.47a20.93,20.93,0,0,1-2.86-8.48c-.07-.7-.16-1.37-.26-2H26.09a1.71,1.71,0,0,1-1.79-1.62V12.69a1.71,1.71,0,0,1,1.79-1.61H73.91a1.71,1.71,0,0,1,1.79,1.61V68.57a1.71,1.71,0,0,1-1.79,1.62h-3c0,1.35-.15,2.87-.31,4.58a13.55,13.55,0,0,1-1.15,4.33,16,16,0,0,1-.83,1.59h2.73c4.79,0,8.7-3.54,8.7-7.85V12.35C80.05,8,76.14,4.5,71.35,4.5ZM54.26,8.36H45.11V7.3h9.15Z" />
                                            <path
                                                id="hand"
                                                d="M69.31,74.77c.15-1.59.24-3,.29-4.29.21-5.35-.39-8-1.53-8.75a2.07,2.07,0,0,0-1.23-.38,4.33,4.33,0,0,0-2.38.95s.92-5.51-3.85-5.95c-2,.15-2.78,1-3.11,1.77a2.74,2.74,0,0,0-.21.71,3.06,3.06,0,0,1,0,.39,2.26,2.26,0,0,1,0-.39c0-1.21-.19-4.8-4-4.8l-.7,0a2.62,2.62,0,0,0-2.5,1.71,16.13,16.13,0,0,0-.85,3.08,6.13,6.13,0,0,1-1.4-4.29l-.1-16.43a2.3,2.3,0,0,0-.2-.94,3.16,3.16,0,0,0-2.67-1.76c-.94,0-2,.56-2.75,2.19C40.9,43.76,41,67.49,41,67.49s-2.85-.19-4-7a6.63,6.63,0,0,0-2.85-4.38A4.42,4.42,0,0,0,32,55.17c-.57,0-1,.32-1.38,1.11a2.33,2.33,0,0,0-.11.28c-.81,2.18,1.54,6.6,2.61,13.92.09.61.17,1.24.24,1.9a19.6,19.6,0,0,0,2.68,7.94,19.24,19.24,0,0,0,1.24,1.85C40,85.78,39.79,89,40.35,95.5l21.79-.06s-.88-2.35,2.79-10.56A25.78,25.78,0,0,1,67.07,81l.38-.63a14,14,0,0,0,.79-1.48A13,13,0,0,0,69.31,74.77Z"
                                            />
                                        </svg>
                                        <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">Drag &amp; Throw</p>
                                    </div>
                                    <div className="float-left w-[150px] text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="#fff" className="my-[6px] h-[50px] w-[50px] overflow-visible">
                                            <path
                                                id="cursor"
                                                d="M48,23.53,45.94,42.64c-.22,2-.58,5.35-.81,7.38L43.06,69.13c-.22,2,.91,2.65,2.51,1.4L60.7,58.65l5.84-4.57L81.67,42.21c1.6-1.27,1.14-3.28-1-4.48L71,32.35l9.26-16.69a1.87,1.87,0,0,0-.56-2.57L73.78,9.83a1.87,1.87,0,0,0-2.47.88L62,27.4,52.35,22C50.19,20.81,48.23,21.49,48,23.53Z"
                                            />
                                            <g id="iconCircles">
                                                <circle cx="90" cy="15" r="4" />
                                                <circle cx="90" cy="35" r="4" />
                                                <circle cx="90" cy="55" r="4" />
                                                <circle cx="90" cy="75" r="4" />
                                                <circle cx="90" cy="95" r="4" />
                                            </g>
                                        </svg>
                                        <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">Nav Dots</p>
                                    </div>
                                    <div className="float-left w-[150px] text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="my-[6px] h-[50px] w-[50px] overflow-visible">
                                            <g strokeLinejoin="round" strokeLinecap="round" stroke="white" strokeWidth="5" fill="none">
                                                <circle r="40" cx="50" cy="50" />
                                                <polyline id="caret" points="30 60, 50 35, 70 60"></polyline>
                                            </g>
                                        </svg>
                                        <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">Arrows</p>
                                    </div>
                                </div>
                            </section>

                            <section ref={(el) => (slidesRef.current[1] = el)} className="relative flex w-full flex-col items-center justify-center font-bold">
                                <img
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/314556/greensock-logo.svg"
                                    alt="GreenSock Logo"
                                    width="360"
                                    className="max-[480px]:max-w-[200px]"
                                />
                                <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">
                                    This slider demo is powered by GSAP along with the Draggable and Inertia plugins.
                                </p>
                            </section>

                            <section ref={(el) => (slidesRef.current[2] = el)} className="relative flex w-full flex-col items-center justify-center font-bold">
                                <img
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/314556/clock.png"
                                    width="75"
                                    alt="clock"
                                    className="max-[480px]:max-w-[200px]"
                                />
                                <h3 className="text-[1.5em]">Side Dot Animation</h3>
                                <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">
                                    See that animation on the right with the navigation dots? Its time is based on the
                                    position of the draggable element. Keep an eye on it as you drag the slides.
                                </p>
                            </section>

                            <section ref={(el) => (slidesRef.current[3] = el)} className="relative flex w-full flex-col items-center justify-center font-bold">
                                <img
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/314556/sittingDog.svg"
                                    alt="Dog"
                                    width="120"
                                    className="max-[480px]:max-w-[200px]"
                                />
                                <h3 className="text-[1.5em]">Random dog</h3>
                                <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">Why? Because dogs are cool.</p>
                            </section>

                            <section id="section6" ref={(el) => (slidesRef.current[4] = el)} className="relative flex w-full flex-col items-center justify-center font-bold">
                                <img
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/314556/handTablet.svg"
                                    width="220"
                                    alt="Mobile Tablet"
                                    className="max-[480px]:max-w-[200px]"
                                />
                                <h3 className="text-[1.5em]">Handy for many things</h3>
                                <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">
                                    We all need a full-screen slider from time to time.
                                </p>
                            </section>

                            <section ref={(el) => (slidesRef.current[5] = el)} className="relative flex w-full flex-col items-center justify-center font-bold">
                                <img
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/314556/craigmasternew.png"
                                    width="100"
                                    alt="Craigs Avatar"
                                    className="max-[480px]:max-w-[200px]"
                                />
                                <h3 className="text-[1.5em]">Like this demo?</h3>
                                <p className="max-w-[400px] text-center font-normal max-[480px]:max-w-[180px]">Follow me on Twitter.</p>
                                <a
                                    href="https://twitter.com/Craig_PointC"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 inline-block rounded-full border-2 border-white px-4 py-4 text-white no-underline hover:bg-white hover:text-black"
                                >
                                    Follow @Craig_PointC
                                </a>
                            </section>
                        </div>
                    </div>

                    <div ref={dotsWrapRef} className="absolute right-4 top-1/2 z-[100] -translate-y-1/2">
                        {toolTipLabels.map((_, i) => (
                            <div
                                key={i}
                                ref={(el) => (dotsRef.current[i] = el)}
                                className="relative m-3 h-3 w-3 cursor-pointer rounded-full bg-white"
                                onClick={() => handleDotClick(i)}
                                onMouseEnter={() => handleDotHover(i)}
                                onMouseLeave={() => handleDotHover(i)}
                                role="button"
                                aria-label={`Go to slide ${i + 1}`}
                                tabIndex={0}
                            />
                        ))}
                    </div>

                    <div ref={toolTipsWrapRef} className="vs-tooltips absolute right-[50px] top-1/2 z-[1000] -translate-y-1/2">
                        {toolTipLabels.map((label, i) => (
                            <div key={i} ref={(el) => (toolTipsRef.current[i] = el)} className="my-3 h-[12px] text-right leading-[12px] opacity-0">
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
