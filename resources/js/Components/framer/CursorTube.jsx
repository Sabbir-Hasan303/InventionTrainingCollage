import { useCallback, useEffect, useRef } from "react";

const TUBES_OPTIONS = {
    tubes: {
        colors: ["#f967fb", "#53bc28", "#6958d5"],
        lights: {
            intensity: 200,
            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
        },
    },
};

const MODULE_URL =
    "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

function randomColors(count) {
    return new Array(count)
        .fill(0)
        .map(
            () =>
                `#${Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0")}`
        );
}

export default function CursorTube() {
    const canvasRef = useRef(null);
    const appRef = useRef(null);

    const handleClick = useCallback(() => {
        if (!appRef.current) return;
        const colors = randomColors(3);
        const lightsColors = randomColors(4);
        appRef.current.tubes?.setColors?.(colors);
        appRef.current.tubes?.setLightsColors?.(lightsColors);
    }, []);

    useEffect(() => {
        let cancelled = false;

        import(MODULE_URL)
            .then((module) => {
                if (cancelled) return;
                const TubesCursor = module?.default ?? module;
                if (!canvasRef.current || !TubesCursor) return;
                appRef.current = TubesCursor(canvasRef.current, TUBES_OPTIONS);
            })
            .catch((error) => {
                console.error("Failed to load TubesCursor module:", error);
            });

        return () => {
            cancelled = true;
            if (appRef.current?.dispose) {
                appRef.current.dispose();
            }
            appRef.current = null;
        };
    }, []);

    return (
        <div
            className="relative h-screen w-full touch-none overflow-hidden font-['Montserrat',serif]"
            onClick={handleClick}
        >
            <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-2.5 text-center">
                <h1 className="select-none text-[52px] font-bold uppercase leading-none text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)] md:text-[80px]">
                    Tubes
                </h1>
                <h2 className="select-none text-[40px] font-medium uppercase leading-none text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)] md:text-[60px]">
                    Cursor
                </h2>
                <a
                    className="text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.framer.com/@kevin-levron/"
                >
                    Framer Component
                </a>
            </div>
        </div>
    );
}
