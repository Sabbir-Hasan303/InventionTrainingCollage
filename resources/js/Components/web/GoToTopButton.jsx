import React, { useEffect, useState } from 'react';

export default function GoToTopButton() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showGoTop, setShowGoTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollRange > 0 ? (scrollTop / scrollRange) * 100 : 0;

            setScrollProgress(Math.min(100, Math.max(0, progress)));
            setShowGoTop(scrollTop > 220);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGoTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={handleGoTop}
            aria-label="Go to top"
            className={`group fixed bottom-24 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full shadow-[0_10px_22px_rgba(0,0,0,0.3)] transition-all duration-300 ${showGoTop ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-6 opacity-0 pointer-events-none'
                }`}
            style={{
                background: `conic-gradient(#ffffff ${scrollProgress}%, rgba(0,0,0,0.32) ${scrollProgress}% 100%)`,
            }}
        >
            <span className="absolute inset-[4px] rounded-full bg-[radial-gradient(circle_at_30%_22%,#2c2c2c_0%,#151515_48%,#080808_100%)] shadow-[0_0_0_2px_rgba(255,255,255,0.75),0_0_0_4px_rgba(0,0,0,0.28),0_8px_18px_rgba(0,0,0,0.32)]" />
            <span className="relative z-10 h-4 w-4 overflow-hidden">
                <span className="flex flex-col transition-transform duration-300 group-hover:-translate-y-4">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 20V4" />
                        <path d="M5 11l7-7 7 7" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 20V4" />
                        <path d="M5 11l7-7 7 7" />
                    </svg>
                </span>
            </span>
        </button>
    );
}
