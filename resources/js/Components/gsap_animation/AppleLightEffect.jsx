import { useEffect, useRef } from "react";

export default function AppleLightEffect() {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const frameCount = 148;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = 1158;
        canvas.height = 770;

        const currentFrame = index =>
            `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
                .toString()
                .padStart(4, "0")}.jpg`;

        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            imagesRef.current.push(img);
        }

        imagesRef.current[0].onload = () => {
            context.drawImage(imagesRef.current[0], 0, 0);
        };

        const onScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll =
                document.body.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScroll;

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );

            const img = imagesRef.current[frameIndex];
            if (!img) return;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section className="relative bg-black h-[500vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-full"
                />
            </div>
        </section>
    );
}
