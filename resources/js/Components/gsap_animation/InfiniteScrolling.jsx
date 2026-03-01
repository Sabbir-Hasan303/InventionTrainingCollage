import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

const portraits = [
    "https://assets.codepen.io/16327/portrait-number-01.png",
    "https://assets.codepen.io/16327/portrait-number-02.png",
    "https://assets.codepen.io/16327/portrait-number-03.png",
    "https://assets.codepen.io/16327/portrait-number-04.png",
    "https://assets.codepen.io/16327/portrait-number-05.png",
    "https://assets.codepen.io/16327/portrait-number-06.png",
    "https://assets.codepen.io/16327/portrait-number-07.png",
];

function buildSeamlessLoop(items, spacing, animateFunc) {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;
    const rawSequence = gsap.timeline({ paused: true });
    const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
            if (this._time === this._dur) {
                this._tTime += this._dur - 0.01;
            }
        },
    });

    const length = items.length + overlap * 2;

    for (let i = 0; i < length; i += 1) {
        const index = i % items.length;
        const time = i * spacing;

        rawSequence.add(animateFunc(items[index]), time);

        if (i <= items.length) {
            seamlessLoop.add(`label${i}`, time);
        }
    }

    rawSequence.time(startTime);
    seamlessLoop
        .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none",
        })
        .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none",
            },
        );

    return seamlessLoop;
}

function buildFiniteSequence(items, spacing, animateFunc) {
    const sequence = gsap.timeline({ paused: true });

    for (let i = 0; i < items.length; i += 1) {
        sequence.add(animateFunc(items[i]), i * spacing);
    }

    return sequence;
}

export default function InfiniteScrolling({
    infinite = true,
    scroll = true,
    cards = null,
    showControls = true,
    eyebrow = "",
    title = "",
    description = "",
    cardSizeClass = "w-56",
    cardAspectClass = "aspect-[9/16]",
}) {
    const rootRef = useRef(null);
    const galleryRef = useRef(null);
    const cardsWrapRef = useRef(null);
    const dragProxyRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const cardsRef = useRef([]);
    const sourceCards = Array.isArray(cards) && cards.length ? cards : portraits;
    const cardsData = infinite ? [...sourceCards, ...sourceCards] : sourceCards;
    const hasSectionText = Boolean(eyebrow || title || description);

    useLayoutEffect(() => {
        if (!rootRef.current || !galleryRef.current || !cardsWrapRef.current || !dragProxyRef.current) {
            return undefined;
        }

        const cards = cardsRef.current.filter(Boolean);
        if (!cards.length) return undefined;

        const spacing = 0.1;
        const snapTime = gsap.utils.snap(spacing);
        const scrollEnabled = scroll;

        let cleanupListeners = () => {};

        const ctx = gsap.context(() => {
            gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

            const animateFunc = (element) => {
                const tl = gsap.timeline();
                tl.fromTo(
                    element,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        zIndex: 100,
                        duration: 0.5,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.in",
                        immediateRender: false,
                    },
                ).fromTo(
                    element,
                    { xPercent: 400 },
                    {
                        xPercent: -400,
                        duration: 1,
                        ease: "none",
                        immediateRender: false,
                    },
                    0,
                );

                return tl;
            };

            const timeline = infinite
                ? buildSeamlessLoop(cards, spacing, animateFunc)
                : buildFiniteSequence(cards, spacing, animateFunc);

            const finiteStartOffset = 0.5;
            const finiteEndOffset = Math.max(finiteStartOffset, timeline.duration() - 0.5);
            const clampFiniteOffset = gsap.utils.clamp(finiteStartOffset, finiteEndOffset);
            const playhead = { offset: 0 };
            const wrapTime = gsap.utils.wrap(0, timeline.duration());

            const normalizeOffset = (offset, shouldSnap = false) => {
                let nextOffset = shouldSnap ? snapTime(offset) : offset;

                if (!infinite) {
                    nextOffset = clampFiniteOffset(nextOffset);
                }

                return nextOffset;
            };

            const applyOffset = (offset, shouldSnap = false) => {
                scrub.vars.offset = normalizeOffset(offset, shouldSnap);
                scrub.invalidate().restart();
            };

            const scrub = gsap.to(playhead, {
                offset: 0,
                onUpdate: () => {
                    if (infinite) {
                        timeline.time(wrapTime(playhead.offset));
                        return;
                    }

                    timeline.time(clampFiniteOffset(playhead.offset));
                },
                duration: 0.5,
                ease: "power3",
                paused: true,
            });

            let trigger;
            let iteration = 0;

            const progressToScroll = (progress) =>
                gsap.utils.clamp(
                    trigger.start + 1,
                    trigger.end - 1,
                    (infinite ? gsap.utils.wrap(0, 1, progress) : gsap.utils.clamp(0, 1, progress)) *
                        (trigger.end - trigger.start) +
                        trigger.start,
                );

            const wrap = (iterationDelta, scrollTo) => {
                iteration += iterationDelta;
                trigger.scroll(scrollTo);
                trigger.update();
            };

            const scrollToOffset = (offset, shouldSnap = true) => {
                const nextOffset = normalizeOffset(offset, shouldSnap);

                if (!scrollEnabled || !trigger) {
                    applyOffset(nextOffset, false);
                    return;
                }

                if (infinite) {
                    const progress = (nextOffset - timeline.duration() * iteration) / timeline.duration();
                    const scrollValue = progressToScroll(progress);

                    if (progress >= 1 || progress < 0) {
                        wrap(Math.floor(progress), scrollValue);
                        return;
                    }

                    trigger.scroll(scrollValue);
                    return;
                }

                const finiteProgress =
                    finiteEndOffset === finiteStartOffset
                        ? 0
                        : (nextOffset - finiteStartOffset) / (finiteEndOffset - finiteStartOffset);

                trigger.scroll(progressToScroll(finiteProgress));
            };

            if (scrollEnabled) {
                trigger = ScrollTrigger.create({
                    trigger: rootRef.current,
                    start: "top top",
                    end: "+=3000",
                    pin: galleryRef.current,
                    anticipatePin: 1,
                    onUpdate(self) {
                        if (infinite) {
                            const currentScroll = self.scroll();

                            if (currentScroll > self.end - 1) {
                                wrap(1, self.start + 2);
                            } else if (currentScroll < self.start + 1 && self.direction < 0) {
                                wrap(-1, self.end - 2);
                            } else {
                                applyOffset((iteration + self.progress) * timeline.duration(), false);
                            }
                            return;
                        }

                        const nextOffset =
                            finiteStartOffset + self.progress * (finiteEndOffset - finiteStartOffset);
                        applyOffset(nextOffset, false);
                    },
                });
            }

            // Ensure first frame is visible when entering the section.
            applyOffset(infinite ? 0 : finiteStartOffset, false);

            const onScrollEnd = () => {
                if (!scrollEnabled || !trigger?.isActive) return;
                scrollToOffset(scrub.vars.offset, true);
            };
            const onNext = () => scrollToOffset(scrub.vars.offset + spacing, true);
            const onPrev = () => scrollToOffset(scrub.vars.offset - spacing, true);

            const nextButton = nextRef.current;
            const prevButton = prevRef.current;

            if (scrollEnabled) {
                ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);
            }
            nextButton?.addEventListener("click", onNext);
            prevButton?.addEventListener("click", onPrev);

            const draggable = Draggable.create(dragProxyRef.current, {
                type: "x",
                trigger: cardsWrapRef.current,
                onPress() {
                    this.startOffset = scrub.vars.offset;
                },
                onDrag() {
                    applyOffset(this.startOffset + (this.startX - this.x) * 0.001, false);
                },
                onDragEnd() {
                    scrollToOffset(scrub.vars.offset, true);
                },
            })[0];

            cleanupListeners = () => {
                if (scrollEnabled) {
                    ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
                }
                nextButton?.removeEventListener("click", onNext);
                prevButton?.removeEventListener("click", onPrev);
                draggable?.kill();
            };
        }, rootRef);

        return () => {
            cleanupListeners();
            ctx.revert();
        };
    }, [infinite, scroll]);

    return (
        <section ref={rootRef} className="relative w-full pt-20 pb-24 ">
            <div ref={galleryRef} className="relative h-screen w-full overflow-hidden">
                {hasSectionText ? (
                    <div className="pointer-events-none absolute inset-x-0 top-16 z-[220] mx-auto max-w-5xl px-6 text-center text-white md:top-20">
                        {eyebrow ? (
                            <p className="text-[11px] uppercase tracking-[0.35em] text-white/55">{eyebrow}</p>
                        ) : null}
                        {title ? (
                            <h2 className="mt-4 text-3xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
                                {title}
                            </h2>
                        ) : null}
                        {description ? (
                            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:text-base md:text-lg">
                                {description}
                            </p>
                        ) : null}
                    </div>
                ) : null}

                <ul
                    ref={cardsWrapRef}
                    className={`absolute left-1/2 ${hasSectionText ? "top-[63%] sm:top-[62%] md:top-[61%] lg:top-[60%]" : "top-[40%]"} ${cardAspectClass} ${cardSizeClass} -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing`}
                >
                    {cardsData.map((item, index) => {
                        const isObjectCard = typeof item === "object" && item !== null;
                        const image = isObjectCard ? item.image : item;
                        const cardTitle = isObjectCard ? item.title : "";
                        const cardSubtitle = isObjectCard ? item.subtitle : "";

                        return (
                            <li
                                key={`${image}-${index}`}
                                ref={(el) => {
                                    cardsRef.current[index] = el;
                                }}
                                className="absolute left-0 top-0 m-0 h-full w-full list-none overflow-hidden rounded-[0.8rem] bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${image})` }}
                            >
                                {isObjectCard && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                                )}
                                {isObjectCard && (cardTitle || cardSubtitle) && (
                                    <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                                        {cardSubtitle ? <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">{cardSubtitle}</p> : null}
                                        {cardTitle ? <p className="mt-1 text-sm font-medium leading-tight">{cardTitle}</p> : null}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {showControls ? (
                    <div className="absolute bottom-[25px] left-1/2 flex -translate-x-1/2 items-center justify-center gap-4">
                        <button
                            ref={prevRef}
                            type="button"
                            className="rounded-md border border-white/35 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                            Prev
                        </button>
                        <button
                            ref={nextRef}
                            type="button"
                            className="rounded-md border border-white/35 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                            Next
                        </button>
                    </div>
                ) : null}

                <div ref={dragProxyRef} className="invisible absolute" />
            </div>
        </section>
    );
}
