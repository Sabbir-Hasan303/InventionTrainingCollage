import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "../../../css/overlap.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.config({ trialWarn: false });

const sectionsData = [
    {
        id: 1,
        layout: "overlapping",
        heading: "Våg å lytte, våg å skifte mening",
        text: "Jerky pastrami strip steak pork chuck. Biltong boudin burgdoggen shankle, short ribs short loin drumstick corned beef rump ribeye filet mignon pork chop.",
        image: "https://ensigndev.no/playground/ensign/wp-content/uploads/2022/04/pic1-1.jpg",
    },
    {
        id: 2,
        layout: "reverse-overlapping",
        heading: "Førsteinntrykket er viktig, andreinntrykket er riktig!",
        text: "",
        image: "https://ensigndev.no/playground/ensign/wp-content/uploads/2022/04/pic2-1.jpg",
    },
    {
        id: 3,
        layout: "overlapping",
        heading: "Mennesker med diagnoser møter motstand",
        text: "Picanha fatback venison capicola shoulder prosciutto tri-tip flank doner jerky bacon. Short ribs pastrami sausage swine, spare ribs ham sirloin prosciutto.",
        image: "https://ensigndev.no/playground/ensign/wp-content/uploads/2022/04/pic4.jpg",
    },
    {
        id: 4,
        layout: "reverse-overlapping",
        heading: "EN SANN HISTORIE",
        text: "Bacon ipsum dolor amet short ribs flank tongue beef porchetta t-bone. Burgdoggen porchetta shoulder, beef ribs kielbasa pork belly drumstick.",
        image: "https://ensigndev.no/playground/ensign/wp-content/uploads/2022/04/pic3-1.jpg",
    },
];

const PlayButton = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104.761 104.76">
        <g data-name="Group 2">
            <path
                data-name="Rectangle 7"
                fill="#fff"
                d="M17.38 20.88h63v62h-63z"
            />
            <path
                data-name="Path 1"
                d="M52.38-.002a52.38 52.38 0 1 0 52.38 52.38A52.38 52.38 0 0 0 52.38-.002ZM38.11 26.819a6.284 6.284 0 0 1 3.148.8l33.577 19.432a6.1 6.1 0 0 1 0 10.577l-33.577 19.47a6.054 6.054 0 0 1-9.024-5.372v-38.78a6.079 6.079 0 0 1 5.876-6.128Z"
                fill="#6bb0e4"
            />
        </g>
    </svg>
);

export default function OverlappingCodepenExact() {
    const smootherRef = useRef(null);

    useEffect(() => {
        const smoother = ScrollSmoother.create({
            smooth: 3,
            effects: true,
        });
        smootherRef.current = smoother;

        return () => {
            smoother.kill();
        };
    }, []);

    return (
        <div className="smooth-wrapper">
            <div className="smooth-content">
                {sectionsData.map((section) => (
                    <section key={section.id} className="wrapper">
                        <article>
                            <header
                                className={section.layout}
                                data-speed="1.25"
                            >
                                <h2>{section.heading}</h2>
                                {section.text && <p>{section.text}</p>}
                            </header>
                            <div
                                className={`video-bg ${
                                    section.layout === "overlapping"
                                        ? "overlapping-video-bg"
                                        : "reverse-overlapping-video-bg"
                                }`}
                            >
                                <div className="image-parent">
                                    <div className="image-child">
                                        <img
                                            data-speed="auto"
                                            src={section.image}
                                            alt={section.heading}
                                        />
                                    </div>
                                </div>
                                <PlayButton />
                            </div>
                        </article>
                    </section>
                ))}

                <div className="unsplash">
                    <small>
                        Images from Unsplash by{" "}
                        <a
                            href="https://unsplash.com/@johnarano"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            John Arano
                        </a>
                    </small>
                </div>
            </div>
        </div>
    );
}
