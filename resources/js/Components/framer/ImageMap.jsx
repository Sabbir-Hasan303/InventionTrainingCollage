import React, { useEffect, useMemo, useRef, useState } from "react";

const IMAGE_SRC = "https://i.imgur.com/FemsIYz.jpg";
const HOTSPOT_RADIUS = 15;

const HOTSPOTS = [
    {
        id: "one",
        top: 15,
        left: 20,
        title: "Stretch Knit Top Cover",
        body: [
            "A thin stretch-knit fabric that expands and contracts to match your shape allowing you to feel the total body conformity of the mattress. It is also easily removable and washable to ensure this is the most hypo-allergenic mattress you can own.",
        ],
    },
    {
        id: "two",
        top: 29,
        left: 70,
        title: "Memory Foam Assembly",
        body: ["This 1\" thick free-floating layer matches the shape of your body while adding a little firmness."],
        notes: ["Included with Firm models only."],
    },
    {
        id: "three",
        top: 39,
        left: 20,
        title: "Waveless Water Mattress",
        body: [
            "With modern materials, this mattress is more durable than previous mattresses and the oversized mattress will be loose so when you lie down, the surface will be able to totally conform to the shape of your body better than any mattress in the market.",
            "The mattresses internal support material greatly reduces the wave motion experienced in older generation waterbeds which allows for a more stable night sleep.",
        ],
    },
    {
        id: "four",
        top: 39,
        left: 48,
        title: "Thermal Divider",
        body: ["This flexible vertical panel serves as insulation between the dual mattresses to ensure zero heat transfer."],
        notes: ["Only included in King Dual models."],
    },
    {
        id: "five",
        top: 49,
        left: 70,
        title: "Impermeable Liner",
        body: [
            "This easy-to-clean material prevents any spilled water from escaping and prevents dust mites and bedbugs from moving into the Afloat interior, ensuring a hygienic sleep.",
        ],
    },
    {
        id: "six",
        top: 61,
        left: 30,
        title: "Perimeter Comfort Rails",
        body: [
            "Provides a comfortable sitting edge. Connector system locks rails into decking to prevent the rails from changing shape over the years while also creating a \"hinging action\" that helps keep your bed linens in place better than any ordinary mattresses.",
        ],
    },
    {
        id: "seven",
        top: 69,
        left: 65,
        title: "Heating System",
        body: [
            "The heating pad works in concert with your Afloat digital temperature controller on the outside of your bed to keep your bed within 1 degree of your preferred temperature.",
        ],
        notes: ["Two units included for the Dual models.", "One unit included for Standard models."],
    },
    {
        id: "eight",
        top: 74,
        left: 20,
        title: "Lower Cover Panel",
        body: [
            "The Lower Cover Panel locks into the perimeter rail system to prevent any shifting over time and allows for easier access to unzip the Stretch Knit Top Cover for machine washing.",
        ],
    },
    {
        id: "nine",
        top: 81,
        left: 80,
        title: "Traditional Box Foundation",
        body: [
            "Supports the Afloat mattress assembly and locks into the rail system to prevent any shifting. The insulated system inside the foundation also reduces electrical operating costs by up to 40% compared to earlier generation waterbeds.",
        ],
    },
    {
        id: "ten",
        top: 86,
        left: 48,
        title: "Heavy-Duty Metal Bed Frame",
        body: ["Raises the foundation about 6\" above the floor."],
    },
];

export default function ImageMap() {
    const imageRef = useRef(null);
    const [activeId, setActiveId] = useState(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [hasImageError, setHasImageError] = useState(false);

    useEffect(() => {
        const updateSize = () => {
            if (!imageRef.current) return;
            const rect = imageRef.current.getBoundingClientRect();
            setSize({ width: rect.width, height: rect.height });
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const points = useMemo(() => {
        if (!size.width || !size.height) return [];
        return HOTSPOTS.map((spot) => ({
            ...spot,
            x: (spot.left / 100) * size.width,
            y: (spot.top / 100) * size.height,
        }));
    }, [size.width, size.height]);

    const activeSpot = points.find((spot) => spot.id === activeId) || null;

    return (
        <section className="w-full py-10">
            <style>{`
                @keyframes hotspotPulse {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    100% { transform: translate(-50%, -50%) scale(1.2); }
                }
                @keyframes rippleStroke {
                    0% { border-color: rgba(255, 255, 255, 0.4); }
                    50% { border-color: rgba(255, 255, 255, 0.85); }
                    100% { border-color: rgba(255, 255, 255, 0.4); }
                }
            `}</style>

            <div className="relative mx-auto w-full max-w-[400px]">
                {!hasImageError && (
                    <>
                        <img
                            ref={imageRef}
                            src={IMAGE_SRC}
                            alt="Layered bed illustration with map hotspots"
                            useMap="#mattress-image-map"
                            referrerPolicy="no-referrer"
                            onLoad={(event) => {
                                const rect = event.currentTarget.getBoundingClientRect();
                                setSize({ width: rect.width, height: rect.height });
                            }}
                            onError={() => setHasImageError(true)}
                            className="block h-auto w-full"
                        />

                        <map name="mattress-image-map">
                            {points.map((spot) => (
                                <area
                                    key={spot.id}
                                    shape="circle"
                                    coords={`${Math.round(spot.x)},${Math.round(spot.y)},${HOTSPOT_RADIUS}`}
                                    href="#"
                                    alt={spot.title}
                                    onMouseEnter={() => setActiveId(spot.id)}
                                    onMouseLeave={() => setActiveId(null)}
                                    onFocus={() => setActiveId(spot.id)}
                                    onBlur={() => setActiveId(null)}
                                    onClick={(event) => event.preventDefault()}
                                />
                            ))}
                        </map>

                        <div className="pointer-events-none absolute inset-0">
                            {points.map((spot) => {
                                const isActive = activeId === spot.id;
                                return (
                                    <div
                                        key={`marker-${spot.id}`}
                                        className="absolute z-20 h-[30px] w-[30px] rounded-full text-white shadow-[0_0_4px_0_rgba(255,255,255,0.3)]"
                                        style={{
                                            left: `${spot.x}px`,
                                            top: `${spot.y}px`,
                                            transform: "translate(-50%, -50%)",
                                            background: isActive
                                                ? "linear-gradient(45deg,#0057ae 1%,#69dbff 99%)"
                                                : "#01426A",
                                            animation: "hotspotPulse 1.5s ease-in-out infinite alternate",
                                        }}
                                    >
                                        <span className="block -translate-y-[1px] text-center text-[30px] leading-[27px]">+</span>
                                        <span
                                            className="absolute left-1/2 top-1/2 h-[234%] w-[234%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
                                            style={{ animation: "rippleStroke 2s linear infinite", animationDelay: "0.6s" }}
                                        />
                                        <span
                                            className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
                                            style={{ animation: "rippleStroke 2s linear infinite", animationDelay: "0.3s" }}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {activeSpot && (
                            <div
                                className="pointer-events-none absolute z-30 w-[280px] rounded-md bg-white p-4 text-left text-[#333] shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                                style={{
                                    left: `${activeSpot.x}px`,
                                    top: `${activeSpot.y + 22}px`,
                                    transform: activeSpot.x > size.width * 0.6 ? "translateX(-100%)" : "translateX(0)",
                                }}
                            >
                                <h2 className="mb-2 text-xl font-semibold leading-tight">{activeSpot.title}</h2>
                                {activeSpot.body.map((paragraph, index) => (
                                    <p key={`${activeSpot.id}-body-${index}`} className="mb-2 text-sm leading-relaxed last:mb-0">
                                        {paragraph}
                                    </p>
                                ))}
                                {activeSpot.notes?.map((note, index) => (
                                    <p key={`${activeSpot.id}-note-${index}`} className="mt-2 text-sm font-medium">
                                        {note}
                                    </p>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {hasImageError && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        Could not load the map image from `i.imgur.com`. Use a local image path in `IMAGE_SRC`.
                    </div>
                )}
            </div>
        </section>
    );
}
