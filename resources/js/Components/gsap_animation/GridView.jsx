import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const BASE_ITEMS = [
  {
    title: "Owl",
    secondary: "Hoo are you?",
    text: "Owl lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png"
  },
  {
    title: "Deer",
    secondary: "Hi deer.",
    text: "Deer lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-deer.png"
  },
  {
    title: "Hipster",
    secondary: "What's new?",
    text: "Hipster lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-hipster.png"
  },
  {
    title: "Ram",
    secondary: "I just drank a Mountain Dew.",
    text: "Ram lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-ram.png"
  },
  {
    title: "Dog",
    secondary: "I'm trying to sleep here.",
    text: "Dog lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-dog.png"
  },
  {
    title: "Bored Ram",
    secondary: "No time for you.",
    text: "Ram side lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-sideram.png"
  },
  {
    title: "Super Ram",
    secondary: "I have lazer vision.",
    text: "Ram horns lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-multiram.png"
  },
  {
    title: "Gorilla",
    secondary: "I can fit a whole watermelon in my mouth.",
    text: "Gorilla lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-gorilla.png"
  },
  {
    title: "Birb",
    secondary: "I'm just here to chill.",
    text: "Birb lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi.",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-bird.png"
  }
];

const ITEMS = Array.from({ length: 24 }, (_, index) => BASE_ITEMS[index % BASE_ITEMS.length]);

export default function GridView() {
  const rootRef = useRef(null);
  const appRef = useRef(null);
  const backdropRef = useRef(null);
  const detailRef = useRef(null);
  const detailImageRef = useRef(null);
  const detailContentRef = useRef(null);
  const detailTitleRef = useRef(null);
  const detailSecondaryRef = useRef(null);
  const detailDescriptionRef = useRef(null);
  const itemRefs = useRef([]);
  const activeItemRef = useRef(null);
  const hideDetailsRef = useRef(null);

  useLayoutEffect(() => {
    const itemClickHandlers = new Map();

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean);
      const details = detailRef.current;
      const backdrop = backdropRef.current;
      const detailImage = detailImageRef.current;
      const detailContent = detailContentRef.current;
      const detailTitle = detailTitleRef.current;
      const detailSecondary = detailSecondaryRef.current;
      const detailDescription = detailDescriptionRef.current;

      gsap.set(detailContent, { yPercent: -100 });
      gsap.set(backdrop, { autoAlpha: 0 });

      const hideDetails = () => {
        const activeItem = activeItemRef.current;
        if (!activeItem) return;

        document.removeEventListener("click", hideDetails);
        gsap.set(details, { overflow: "hidden" });

        const state = Flip.getState(details);
        Flip.fit(details, activeItem, { scale: true, fitChild: detailImage });

        const tl = gsap.timeline();
        tl.set(details, { overflow: "hidden" })
          .to(detailContent, { yPercent: -100 })
          .to(items, {
            opacity: 1,
            stagger: { amount: 0.7, from: items.indexOf(activeItem), grid: "auto" }
          })
          .to(backdrop, { autoAlpha: 0, duration: 0.25 }, "<");

        Flip.from(state, {
          scale: true,
          duration: 0.5,
          delay: 0.2,
          onInterrupt: () => tl.kill()
        }).set(details, { visibility: "hidden" });

        activeItemRef.current = null;
      };

      const showDetails = item => {
        if (activeItemRef.current) {
          hideDetails();
          return;
        }

        const onLoad = () => {
          Flip.fit(details, item, { scale: true, fitChild: detailImage });

          const state = Flip.getState(details);

          gsap.set(details, { clearProps: true });
          gsap.set(details, {
            xPercent: -50,
            top: "50%",
            yPercent: -50,
            visibility: "visible",
            overflow: "hidden"
          });

          Flip.from(state, {
            duration: 0.5,
            ease: "power2.inOut",
            scale: true,
            onComplete: () => gsap.set(details, { overflow: "auto" })
          }).to(detailContent, { yPercent: 0 }, 0.2);

          detailImage.removeEventListener("load", onLoad);
          window.setTimeout(() => document.addEventListener("click", hideDetails), 0);
        };

        const { title, secondary, text } = item.dataset;
        const nextSrc = item.querySelector("img")?.src || "";

        detailImage.addEventListener("load", onLoad);
        detailImage.src = nextSrc;

        if (detailImage.complete && detailImage.currentSrc === nextSrc) {
          onLoad();
        }

        detailTitle.textContent = title || "";
        detailSecondary.textContent = secondary || "";
        detailDescription.textContent = text || "";

        gsap
          .to(items, {
            opacity: 0.3,
            stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto" }
          })
          .kill(item);

        gsap.to(appRef.current, {
          backgroundColor: "#ffffff",
          duration: 0.25
        });
        gsap.to(backdrop, { autoAlpha: 1, duration: 0.25 });

        activeItemRef.current = item;
      };

      hideDetailsRef.current = hideDetails;

      gsap.to(appRef.current, { autoAlpha: 1, duration: 0.2 });
      gsap.from(items, { autoAlpha: 0, yPercent: 30, stagger: 0.04 });

      items.forEach(item => {
        const handler = event => {
          event.stopPropagation();
          showDetails(item);
        };

        itemClickHandlers.set(item, handler);
        item.addEventListener("click", handler);
      });
    }, rootRef);

    return () => {
      if (hideDetailsRef.current) {
        document.removeEventListener("click", hideDetailsRef.current);
      }

      itemClickHandlers.forEach((handler, item) => {
        item.removeEventListener("click", handler);
      });

      ctx.revert();
    };
  }, []);

  return (
    <div className="grid h-full min-h-screen w-full place-items-center bg-[#1D1F20] p-6 text-[14px] text-white">
      <div
        ref={backdropRef}
        className="invisible fixed inset-0 z-[60] bg-black/65"
        onClick={() => hideDetailsRef.current?.()}
      />

      <div ref={rootRef} className="relative h-[90vmin] w-[90vmin]">
        <div ref={appRef} className="invisible relative h-full w-full overflow-auto bg-white">
          <div className="grid grid-cols-3 gap-y-[2%] gap-x-[3.6%] p-[10px]">
            {ITEMS.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                ref={element => {
                  itemRefs.current[index] = element;
                }}
                className="cursor-pointer text-[0]"
                data-title={item.title}
                data-secondary={item.secondary}
                data-text={item.text}
              >
                <img src={item.image} alt={item.title} className="w-full" />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={detailRef}
          className="invisible fixed left-1/2 top-[10px] z-[70] flex max-h-[80vh] w-[400px] cursor-pointer flex-col overflow-auto text-[0]"
          onClick={() => hideDetailsRef.current?.()}
        >
          <img ref={detailImageRef} alt="Selected item" className="relative z-[1] w-full" />

          <div ref={detailContentRef} className="grow bg-[#232323] px-6 py-8 text-base text-white">
            <div ref={detailTitleRef} className="mb-4 text-[2rem] uppercase" />
            <div ref={detailSecondaryRef} className="mb-4 text-gray-300" />
            <div ref={detailDescriptionRef} className="leading-relaxed" />
          </div>
        </div>
      </div>
    </div>
  );
}
