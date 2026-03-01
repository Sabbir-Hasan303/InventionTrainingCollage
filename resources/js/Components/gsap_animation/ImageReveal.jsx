import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal({ src, alt, className = '', maskColor = '#06402B' }) {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const image = imageRef.current;
            const mask = maskRef.current;
            if (!container || !image || !mask) return;

            gsap.set(image, { scale: 1.1, y: 48 });
            gsap.set(mask, { yPercent: 0, autoAlpha: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top 90%',
                    end: 'top 18%',
                    scrub: 1.65,
                }
            });

            tl.to(mask, {
                yPercent: -104,
                ease: 'power3.inOut',
            }, 0).to(image, {
                y: 0,
                scale: 1,
                ease: 'power3.out',
            }, 0);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className="w-full h-full object-cover scale-110"
            />
            <div
                ref={maskRef}
                className="absolute inset-0 z-10"
                style={{ backgroundColor: maskColor }}
            />
        </div>
    );
}
