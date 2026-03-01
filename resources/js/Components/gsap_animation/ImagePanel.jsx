import '../../../css/imagepanel.css';

import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useEffect } from 'react';

export default function ImagePanel() {
    useEffect(() => {
        gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

        const smoother = ScrollSmoother.create({
            smooth: 1,
            effects: true,
        });
    }, []);

    return (
        <section className="relative">
            <div className="image-grid">
                <picture className="image_cont">
                    <source
                        srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1500"
                        media="(min-width: 1500px)"
                    />
                    <source
                        srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1000"
                        media="(min-width: 700px)"
                    />
                    <img
                        data-speed="auto"
                        className=""
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=600"
                        alt=""
                    />
                </picture>
                <div className="image_cont">
                    <img
                        data-speed="auto"
                        src="https://images.unsplash.com/photo-1569596082827-c5e8990496cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDg3NQ&ixlib=rb-1.2.1&q=80&w=500"
                        alt=""
                    />
                </div>
                <div className="image_cont">
                    <img
                        data-speed="auto"
                        src="https://images.unsplash.com/photo-1587932775991-708a20af2cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDQ5Mg&ixlib=rb-1.2.1&q=80&w=500"
                        alt=""
                    />
                </div>
                <div className="image_cont">
                    <img
                        data-speed="auto"
                        src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1200"
                        alt=""
                    />
                </div>
            </div>
            <div className="spacer"></div>
        </section>
    );
}
