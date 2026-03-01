import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({ children, className = '', delay = 0 }) {
    const textRef = useRef(null);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        const text = element.textContent;
        element.innerHTML = '';

        const chars = text.split('').map((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            return span;
        });

        chars.forEach(char => element.appendChild(char));

        const splitTween = gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        return () => {
            splitTween.scrollTrigger?.kill();
            splitTween.kill();
        };
    }, [children, delay]);

    return (
        <span ref={textRef} className={className}>
            {children}
        </span>
    );
}
