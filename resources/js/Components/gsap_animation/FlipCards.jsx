import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const INITIAL_CARDS = [5, 4, 3, 2, 1].map((number, index) => ({
  id: `portrait-${index}-${number}`,
  src: `https://assets.codepen.io/16327/portrait-number-${number}.png`,
  alt: `Portrait ${number}`
}));

export default function FlipCards() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const sliderRef = useRef(null);
  const nextIdRef = useRef(INITIAL_CARDS.length + 1);
  const pendingStateRef = useRef(null);
  const animatingRef = useRef(false);

  const moveCard = () => {
    if (!sliderRef.current || animatingRef.current) return;

    const items = sliderRef.current.querySelectorAll(".flip-card-item");
    pendingStateRef.current = Flip.getState(items);

    setCards(previous => {
      const lastCard = previous[previous.length - 1];
      if (!lastCard) return previous;

      const nextCard = {
        ...lastCard,
        id: `portrait-${nextIdRef.current++}`
      };

      return [nextCard, ...previous.slice(0, -1)];
    });
  };

  useLayoutEffect(() => {
    if (!pendingStateRef.current || !sliderRef.current) return;

    animatingRef.current = true;
    const state = pendingStateRef.current;
    pendingStateRef.current = null;

    Flip.from(state, {
      targets: sliderRef.current.querySelectorAll(".flip-card-item"),
      absolute: true,
      ease: "sine.inOut",
      onEnter: elements =>
        gsap.from(elements, {
          duration: 0.3,
          yPercent: 20,
          opacity: 0,
          ease: "expo.out"
        }),
      onLeave: elements =>
        gsap.to(elements, {
          duration: 0.3,
          yPercent: 5,
          xPercent: -5,
          transformOrigin: "bottom left",
          opacity: 0,
          ease: "expo.out"
        }),
      onComplete: () => {
        animatingRef.current = false;
      },
      onInterrupt: () => {
        animatingRef.current = false;
      }
    });
  }, [cards]);

  return (
    <section
      className="relative flex min-h-screen w-full cursor-pointer items-start justify-center overflow-hidden bg-[#0e0f10]"
      onClick={moveCard}
    >
      <div ref={sliderRef} className="relative mt-[30vh] h-[200px] w-[300px] [perspective:100px]">
        {cards.map((card, index) => (
          <img
            key={card.id}
            src={card.src}
            alt={card.alt}
            className="flip-card-item absolute w-[300px] aspect-[2/3] rounded-xl object-cover shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            style={{
              left: `${index * -20}px`,
              top: `${index * 20}px`
            }}
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
}
