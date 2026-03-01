import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EnergyScene() {
    const sectionRef = useRef(null);
    const backgroundsRef = useRef([]);
    const sunRef = useRef(null);
    const moonRef = useRef(null);
    const topRef = useRef(null);
    const stickyRef = useRef(null);
    const scrollItemsRef = useRef([]);
    const itemTextsRef = useRef([]);
    const itemHousesRef = useRef([]);
    const thumbnailGroupsRef = useRef([]);
    const battProgressRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(moonRef.current, { autoAlpha: 0, scale: 0.6 });
            gsap.set(sunRef.current, { rotate: -100, autoAlpha: 1 });

            // Set initial state for scroll items
            scrollItemsRef.current.forEach((item, i) => {
                if (i > 0) {
                    gsap.set(item, { autoAlpha: 0 });
                }
            });

            // Set initial house state
            itemHousesRef.current.forEach((house, i) => {
                gsap.set(house, {
                    scale: 1,
                    autoAlpha: i === 0 ? 1 : 0,
                    transform: "scale(1)",
                });
            });

            gsap.set(battProgressRef.current, { autoAlpha: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%",
                    scrub: 1.2,
                    pin: true,
                    markers: false,
                },
            });

            const totalItems = 5;

            for (let i = 0; i < totalItems; i++) {
                // Fade in background
                if (i > 0) {
                    tl.to(
                        backgroundsRef.current[i],
                        {
                            autoAlpha: 1,
                            duration: 1,
                        },
                        i === 0 ? "0%" : "<"
                    );

                    tl.to(
                        backgroundsRef.current[i - 1],
                        {
                            autoAlpha: 0,
                            duration: 1,
                        },
                        "<"
                    );
                }

                // Show scroll item
                tl.to(
                    scrollItemsRef.current[i],
                    {
                        autoAlpha: 1,
                        duration: 0.5,
                    },
                    i === 0 ? "0%" : "<+=0.3"
                );

                // Hide previous scroll item
                if (i > 0) {
                    tl.to(
                        scrollItemsRef.current[i - 1],
                        {
                            autoAlpha: 0,
                            duration: 0.5,
                        },
                        "<"
                    );
                }

                // Animate thumbnails rotation
                const mediaElements =
                    thumbnailGroupsRef.current[i]?.querySelectorAll(".media");
                if (mediaElements) {
                    mediaElements.forEach((media, idx) => {
                        const startRotation = idx * 19.2; // Initial angles
                        const endRotation = i * 76 + idx * 19.2; // Rotated by i*76
                        tl.to(
                            media,
                            {
                                rotate: endRotation,
                                duration: 2,
                            },
                            i === 0 ? "0%" : "<"
                        );
                    });
                }

                // Show house
                tl.to(
                    itemHousesRef.current[i],
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.5,
                    },
                    i === 0 ? "0%" : "<"
                );

                // Hide previous house
                if (i > 0) {
                    tl.to(
                        itemHousesRef.current[i - 1],
                        {
                            autoAlpha: 0,
                            scale: 1,
                            duration: 0.5,
                        },
                        "<"
                    );
                }

                // Battery progress
                tl.to(
                    battProgressRef.current,
                    {
                        "--progress": (i + 1) / totalItems,
                        autoAlpha: 1,
                        duration: 0.8,
                    },
                    i === 0 ? "0%" : "<"
                );

                // Pause
                if (i < totalItems - 1) {
                    tl.to({}, { duration: 0.8 });
                }
            }

            // Sun movement: Move from left to right and fade out
            tl.to(
                sunRef.current,
                {
                    left: "74%", // Move to where moon is (moon's left position)
                    autoAlpha: 0, // Fade out
                    rotate: 0,
                    duration: 5,
                },
                "0%"
            );

            // Moon appearance: Fade in after sun is fully gone
            tl.to(
                moonRef.current,
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1.5,
                },
                "5" // Start after sun animation finishes (6 seconds)
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollItems = [
        {
            text: "যখন তুমি কাজ শুরু করছো, তখন তোমার ছাদ ইতিমধ্যেই কাজ করছে। সৌরশক্তি তোমার বাড়ির ব্যাটারিতে সঞ্চিত থাকে।",
            textColor: "rgb(0, 8, 121)",
            photos: [
                "https://www.datocms-assets.com/161566/1752846744-ditiswatt_morning_ritual_01.jpg",
                "https://www.datocms-assets.com/161566/1752846744-ditiswatt_breakfast_02_morning.jpg",
                "https://www.datocms-assets.com/161566/1752848257-ditiswatt_bike_morning.jpg",
                "https://www.datocms-assets.com/161566/1752848547-ditiswatt_accu_morning.jpg",
            ],
            house: "/assets/energy_scene/house1.avif",
        },
        {
            text: "তুমি যখন সেখানে থাকো না, তখনও তোমার শক্তি পরবর্তী সময়ের জন্য সঞ্চিত থাকে।",
            textColor: "rgb(0, 8, 121)",
            photos: [
                "https://www.datocms-assets.com/161566/1752849418-ditiswatt_woman_daytime.jpg",
                "https://www.datocms-assets.com/161566/1752848687-ditiswatt_cat_daytime.jpg",
                "https://www.datocms-assets.com/161566/1752846744-ditiswatt_plant_01_daytime.jpg",
                "https://www.datocms-assets.com/161566/1752849028-ditiswatt_house_daytime_02.jpg",
            ],
            house: "/assets/energy_scene/house2.avif",
        },
        {
            text: "তোমার মুহূর্ত, তোমার শক্তি। আজ তোমার ঘর তোমার রোদে চলে।",
            textColor: "rgb(0, 8, 121)",
            photos: [
                "https://www.datocms-assets.com/161566/1752864023-ditiswatt_car_charge_home.jpg",
                "https://www.datocms-assets.com/161566/1752865431-ditiswatt_kids_evening_03.jpg",
                "https://www.datocms-assets.com/161566/1752847734-ditiswatt_cooking_evening.jpg",
                "https://www.datocms-assets.com/161566/1752864796-ditiswatt_laundry_sunset.jpg",
            ],
            house: "/assets/energy_scene/house3.avif",
        },
        {
            text: "টিভি চালু করো, হেয়ার ড্রায়ার গরম করো, আলো জ্বালাও, শুধু তোমার নিজস্ব শক্তি ব্যবহার করো।",
            textColor: "rgb(255, 255, 255)",
            photos: [
                "https://www.datocms-assets.com/161566/1752863487-ditiswatt_shower_evening.jpg",
                "https://www.datocms-assets.com/161566/1752863579-ditiswatt_couple_livingroom_evening.jpg",
                "https://www.datocms-assets.com/161566/1752861998-ditiswatt_gaming_evening_03.jpg",
                "https://www.datocms-assets.com/161566/1752851771-ditiswatt_kind_lezen_evening.jpg",
            ],
            house: "/assets/energy_scene/house4.avif",
        },
        {
            text: "শান্ত ঘর, প্রাণবন্ত দিন এবং পরের দিনের জন্য প্রস্তুত।",
            textColor: "rgb(255, 255, 255)",
            photos: [
                "https://www.datocms-assets.com/161566/1752860549-ditiswatt_study_evening_02.jpg",
                "https://www.datocms-assets.com/161566/1752860781-ditiswatt_couple_bedtime_02.jpg",
                "https://www.datocms-assets.com/161566/1752852498-ditiswatt_cat_nightime.jpg",
                "https://www.datocms-assets.com/161566/1752860145-ditiswatt_car_charge_night.jpg",
            ],
            house: "/assets/energy_scene/house5.avif",
        },
    ];

    const backgroundGradients = [
        "linear-gradient(0deg, #E6D1B8 27.77%, #F4A05F 63.05%, #6B59AD 99.63%)",
        "linear-gradient(0deg, #E1D8D4 27.77%, #F7E499 63.05%, #F4A05F 99.63%)",
        "linear-gradient(0deg, #C6AC9E 27.77%, #E99967 63.05%, #393EC9 99.63%)",
        "linear-gradient(0deg, #402E85 27.77%, #874A71 63.05%, #060C92 99.63%)",
        "linear-gradient(0deg, #000137 27.77%, #010679 63.05%, #000117 99.63%)",
    ];

    return (
        <div
            ref={sectionRef}
            style={{
                "--block-mobile-padding-top": "0",
                "--block-mobile-padding-bottom": "0",
                "--block-desktop-padding-top": "0",
                "--block-desktop-padding-bottom": "0",
            }}
            className="relative w-full h-[500px] md:h-screen overflow-hidden"
        >
            {/* Background Layers */}
            <div className="absolute inset-0">
                {backgroundGradients.map((gradient, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            if (el) backgroundsRef.current[i] = el;
                        }}
                        className="absolute inset-0"
                        style={{
                            background: gradient,
                            opacity: i === 0 ? 1 : 0,
                        }}
                    />
                ))}
            </div>

            {/* Main Container */}
            <div className="relative w-full h-full flex flex-col">
                {/* Top Section */}
                <div
                    ref={topRef}
                    className="relative mt-20 flex flex-col items-center justify-center z-20"
                >
                    {/* Sun */}
                    <div
                        ref={sunRef}
                        className="absolute w-[120px] h-[120px] left-[26%] top-[38%] z-10 translate-x-[-50%] translate-y-[-50%]"
                    >
                        <img
                            alt="সূর্য"
                            src="/assets/energy_scene/sun.svg"
                            className="w-full h-full object-contain absolute left-0 top-0 right-0 bottom-0"
                        />
                    </div>

                    {/* Moon */}
                    <div
                        ref={moonRef}
                        className="absolute w-[120px] h-[120px] left-[74%] top-[38%] z-10 translate-x-[-50%] translate-y-[-50%]"
                    >
                        <img
                            alt="চাঁদ"
                            src="/assets/energy_scene/moon.svg"
                            className="w-full h-full object-contain absolute left-0 top-0 right-0 bottom-0"
                        />
                    </div>

                    {/* Heading */}
                    <div className="text-center text-lg md:text-3xl font-normal text-white z-20 mt-20">এটা কিভাবে কাজ করে?</div>

                    {/* Title */}
                    {/* <div className="text-center text-lg md:text-4xl font-normal text-white z-20">এটা প্রতিদিনের জন্য ওয়াট।</div> */}
                </div>

                {/* Sticky Scroll Section */}
                <div
                    ref={stickyRef}
                    className="relative w-full h-full flex flex-col items-center justify-center"
                >
                    {/* Scroll Items */}
                    {scrollItems.map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                if (el) scrollItemsRef.current[i] = el;
                            }}
                            className="absolute inset-0 w-full h-full flex flex-col-reverse md:flex-row items-center justify-between"
                            style={{
                                opacity: i === 0 ? 1 : 0,
                                zIndex: i === 0 ? 20 : 0,
                                padding: "40px",
                                boxSizing: "border-box",
                            }}
                        >

                            {/* Text - Left Side */}
                            <div
                                ref={(el) => {
                                    if (el) itemTextsRef.current[i] = el;
                                }}
                                className="flex-1 flex items-center justify-center pr-8 z-30"
                                style={{
                                    minWidth: "0",
                                }}
                            >
                                <p className="text-sm md:text-lg max-w-[500px]"
                                    style={{
                                        margin: 0,
                                        lineHeight: "1.8",
                                        color: item.textColor,
                                    }}
                                >
                                    {item.text}
                                </p>
                            </div>
                            {/* House Image - Right Side */}
                            <div ref={(el) => {if (el) itemHousesRef.current[i] = el;}}
                                className="flex-1 flex items-end justify-center overflow-hidden"
                                style={{
                                    zIndex: 25,
                                    opacity: i === 0 ? 1 : 0,
                                    transform: "scale(1)",
                                    minWidth: "0",
                                    minHeight: "0",
                                }}
                            >
                                <img
                                    src={item.house}
                                    alt="House"
                                    className="h-full w-auto object-contain object-bottom"
                                    loading="lazy"
                                    style={{
                                        maxHeight: "100%",
                                        aspectRatio: "4096 / 1475",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
