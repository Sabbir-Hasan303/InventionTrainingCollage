import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Layers() {
    const mainRef = useRef(null);
    const panelBaseClasses =
        "layer-panel relative z-[1] box-border flex h-screen w-full items-center justify-center gap-20 px-8 before:pointer-events-none before:absolute before:left-4 before:top-4 before:h-[calc(100%-2rem)] before:w-[calc(100%-2rem)] before:rounded-[20px] before:border-[3px] before:border-black before:content-['']";

    useGSAP(
        () => {
            const panels = gsap.utils.toArray('.layer-panel', mainRef.current);
            if (!panels.length) return;

            const topTrackers = panels.map((panel) =>
                ScrollTrigger.create({
                    trigger: panel,
                    start: 'top top',
                })
            );

            const pinTriggers = panels.map((panel, index) =>
                ScrollTrigger.create({
                    trigger: panel,
                    start: () => (panel.offsetHeight < window.innerHeight ? 'top top' : 'bottom bottom'),
                    pin: true,
                    // Keep layering for intermediate panels, but reserve space after the last panel
                    // so the next page section is not covered.
                    pinSpacing: index === panels.length - 1,
                    anticipatePin: 1,
                })
            );

            ScrollTrigger.refresh();

            return () => {
                topTrackers.forEach((trigger) => trigger.kill());
                pinTriggers.forEach((trigger) => trigger.kill());
            };
        },
        {
            scope: mainRef,
            revertOnUpdate: true,
        }
    );

    return (
        <main ref={mainRef}>
            <section className={`${panelBaseClasses} bg-blue-500`}>
                <div className="relative z-10">
                    <h1 className="text-center text-[1.8em] font-light text-white">Layered pinning</h1>
                    <p className="text-white">Use pinning to layer panels on top of each other as you scroll.</p>
                    <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 overflow-visible text-base font-normal uppercase text-black">
                        Scroll down
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="mx-auto -mt-1 h-5 w-5"
                        >
                            <path
                                d="M6 9l6 6 6-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </section>
            <section className={`${panelBaseClasses} bg-slate-500`}>
                <span className="relative z-10">ONE</span>
            </section>
            <section className={`${panelBaseClasses} bg-purple-500`}>
                <span className="relative z-10">TWO</span>
            </section>
            <section className={`${panelBaseClasses} bg-orange-500`}>
                <span className="relative z-10">THREE</span>
            </section>
            <section className={`${panelBaseClasses} bg-red-500`}>
                <span className="relative z-10">FOUR</span>
            </section>
        </main>
    );
}


export function StickyPiningLayers(){
    return <Layers />;
}
