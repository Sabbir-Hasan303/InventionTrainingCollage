import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const ITEMS = [
  "planning",
  "properties",
  "counters",
  "masking",
  "3D",
  "blending",
  "siblings",
  "speech",
  "typography",
  "magnetism",
  "keyframes",
  "easing",
  "staggers",
  "composition",
  "popovers",
  "transitions",
  "clipping",
  "morphing",
  "timing",
  "paths",
  "svg",
  "scrolling",
];

export default function ContentWave() {
  const listRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const cards = useMemo(
    () =>
      ITEMS.map((item, index) => ({
        id: `${item}-${index}`,
        item,
        index,
        number: (index + 1).toString().padStart(2, "0"),
      })),
    []
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const proxy = document.createElement("div");

    const updateScroll = function updateScroll() {
      list.scroll({
        left: this.scrollLeft + -this.x,
        behavior: "auto",
      });
    };

    const draggable = Draggable.create(proxy, {
      type: "x",
      trigger: list,
      allowContextMenu: true,
      onPressInit() {
        this.scrollLeft = list.scrollLeft;
        gsap.set(proxy, { clearProps: "all" });
      },
      onDragStart: () => setIsDragging(true),
      onDragEnd: () => setIsDragging(false),
      onDrag: updateScroll,
      onThrowUpdate: updateScroll,
    })[0];

    return () => {
      draggable.kill();
    };
  }, []);

  return (
    <section className="relative bg-black text-white font-['DM_Sans',serif,'SF_Pro_Text','SF_Pro_Icons','AOS_Icons','Helvetica_Neue',Helvetica,Arial,sans-serif,system-ui]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

        .content-wave-root { --card-width: clamp(150px, 30vw, 300px); }

        @keyframes content-wave-change {
          50% { width: var(--card-width); }
        }

        .content-wave-item article {
          animation-name: content-wave-change;
          animation-fill-mode: both;
          animation-timing-function: linear(
            0 0%,
            0.0027 3.64%,
            0.0106 7.29%,
            0.0425 14.58%,
            0.0957 21.87%,
            0.1701 29.16%,
            0.2477 35.19%,
            0.3401 41.23%,
            0.5982 55.18%,
            0.7044 61.56%,
            0.7987 68.28%,
            0.875 75%,
            0.9297 81.25%,
            0.9687 87.5%,
            0.9922 93.75%,
            1 100%
          );
          animation-timeline: view(inline);
        }

        .content-wave-list {
          scrollbar-color: red transparent;
          scrollbar-width: thin;
        }

        .content-wave-list a::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0 [background-image:linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-position:50%_50%] [background-size:45px_45px] [mask-image:linear-gradient(150deg,transparent_50%,white)]" />

      <div className="content-wave-root relative z-10 m-2 flex min-h-[72vh] flex-col overflow-hidden rounded-lg bg-black">
        <main className="flex flex-1 items-end py-1">
          <ul
            ref={listRef}
            data-dragging={isDragging}
            className="content-wave-list flex h-full min-h-[calc(clamp(150px,30vw,300px)*1.75)] w-full list-none gap-2 overflow-auto px-0 py-3"
            style={{ paddingInline: "calc(50% - (clamp(150px, 30vw, 300px)) * 0.5)" }}
          >
            {cards.map((card) => (
              <li
                key={card.id}
                className="content-wave-item flex aspect-[2/3] flex-1 snap-center flex-col items-end justify-end"
              >
                <article className="relative flex aspect-[2/3] w-[clamp(80px,10vw,160px)] max-h-full flex-col justify-end overflow-hidden text-ellipsis">
                  <a
                    href="#"
                    onClick={(e) => {
                      if (isDragging) e.preventDefault();
                    }}
                    className={`relative mb-1 inline-block text-[10px] font-light uppercase no-underline ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                  >
                    <span aria-hidden="true">{card.number}.&nbsp;</span>
                    {card.item}
                  </a>
                  <div className="relative flex-1">
                    <img
                      src={`https://picsum.photos/1000/1500?random=${card.index}`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover grayscale-[0.85] contrast-[1.6]"
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </section>
  );
}
