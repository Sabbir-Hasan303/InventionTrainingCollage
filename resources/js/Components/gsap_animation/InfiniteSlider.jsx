import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function InfiniteSlider({ items, speed = 50 }) {
    const sliderRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const firstSet = slider.children[0];
        const width = firstSet.offsetWidth;

        animationRef.current = gsap.to(slider, {
            x: -width,
            duration: speed,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % width)
            }
        });

        return () => {
            if (animationRef.current) animationRef.current.kill();
        };
    }, [items, speed]);

    return (
        <div className="overflow-hidden">
            <div ref={sliderRef} className="flex">
                <div className="flex flex-shrink-0 gap-8">
                    {items.map((item, i) => (
                        <div key={i} className="flex-shrink-0">
                            {item}
                        </div>
                    ))}
                </div>
                <div className="flex flex-shrink-0 gap-8">
                    {items.map((item, i) => (
                        <div key={`dup-${i}`} className="flex-shrink-0">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
