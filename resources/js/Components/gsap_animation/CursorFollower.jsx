import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorFollower() {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        const CURSOR_HIDDEN_CLASS = 'cursor-follower-active';
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;
        const mediaQuery = window.matchMedia('(min-width: 1024px)');

        const syncCursorVisibilityClass = () => {
            if (mediaQuery.matches) {
                document.body.classList.add(CURSOR_HIDDEN_CLASS);
            } else {
                document.body.classList.remove(CURSOR_HIDDEN_CLASS);
            }
        };

        const moveCursor = (e) => {
            gsap.set(cursor, {
                x: e.clientX,
                y: e.clientY
            });

            gsap.set(cursorDot, {
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseEnter = () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        };

        syncCursorVisibilityClass();
        mediaQuery.addEventListener('change', syncCursorVisibilityClass);
        window.addEventListener('mousemove', moveCursor);

        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleMouseEnter);
            link.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            mediaQuery.removeEventListener('change', syncCursorVisibilityClass);
            document.body.classList.remove(CURSOR_HIDDEN_CLASS);
            window.removeEventListener('mousemove', moveCursor);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <style>{`
                body.cursor-follower-active,
                body.cursor-follower-active * {
                    cursor: none !important;
                }
            `}</style>
            <div
                ref={cursorRef}
                className="hidden lg:block fixed w-10 h-10 border-2 border-[#06402B] rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
                style={{ mixBlendMode: 'difference' }}
            />
            <div
                ref={cursorDotRef}
                className="hidden lg:block fixed w-2 h-2 bg-[#06402B] rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
            />
        </>
    );
}
