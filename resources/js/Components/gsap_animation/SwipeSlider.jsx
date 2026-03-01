import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function SwipeSlider({ slides }) {
    const sliderRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const wrapper = wrapperRef.current;
        if (!slider || !wrapper) return;

        const slideWidth = slider.children[0].offsetWidth;
        const maxScroll = -(slideWidth * (slides.length - 1));

        Draggable.create(slider, {
            type: 'x',
            bounds: { minX: maxScroll, maxX: 0 },
            inertia: true,
            snap: {
                x: (value) => Math.round(value / slideWidth) * slideWidth
            },
            onDrag() {
                gsap.to(slider.children, {
                    scale: 0.9,
                    opacity: 0.5,
                    duration: 0.3,
                    stagger: 0.02
                });
            },
            onDragEnd() {
                gsap.to(slider.children, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }, [slides]);

    return (
        <div ref={wrapperRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
            <div ref={sliderRef} className="flex gap-8">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-[600px] h-[400px] relative rounded-lg overflow-hidden"
                    >
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                            <h3 className="text-white text-3xl font-light">{slide.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
