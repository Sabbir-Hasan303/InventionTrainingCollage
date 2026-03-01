import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import TimelineCard from "./TimelineCard";
import TimelineArrows from "./TimelineArrows";
import TimelineDots from "./TimelineDots";

const TIMELINE_DATA = [
  {
    year: "2019",
    description:
      "On 22 January 2019, NEOM Company was incorporated. In June, NEOM Bay Airport welcomed its first commercial flight operated by Saudi Arabian Airlines.",
  },
  {
    year: "2020",
    description:
      "NEOM moved its headquarters to Northwest Saudi Arabia and the NEOM Green Hydrogen Company was announced in a joint venture with Air Products and ACWA Power.",
  },
  {
    year: "2021",
    description:
      "His Royal Highness Crown Prince Mohammed bin Salman announced THE LINE in October, followed by the port based industrial city, Oxagon, in November.",
  },
  {
    year: "2022",
    description:
      "NEOM unveiled plans for THE LINE and announced the mountain destination Trojena. The Port of NEOM opened for business.",
  },
  {
    year: "2023",
    description:
      "Construction accelerated across all sectors. NEOM announced Sindalah, its luxury island destination, and Leyja, its nature reserve project.",
  },
  {
    year: "2024",
    description:
      "NEOM continued to attract global talent and investment, with major milestones in sustainable energy and infrastructure development.",
  },
];

const getCardWidth = () => {
  if (typeof window === "undefined") return 300;
  if (window.innerWidth < 640) return 260;
  if (window.innerWidth < 768) return 280;
  return 300;
};
const CARD_GAP = 24;

export default function OurStoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const dragRef = useRef(null);
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(getCardWidth);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      setCardWidth(getCardWidth());
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const totalScrollWidth = TIMELINE_DATA.length * (cardWidth + CARD_GAP) - CARD_GAP;
  const maxDrag = 0;
  const minDrag = -(totalScrollWidth - containerWidth + 40);

  const scrollToIndex = useCallback(
    (index) => {
      const targetX = -(index * (cardWidth + CARD_GAP));
      const clampedX = Math.max(Math.min(targetX, maxDrag), minDrag);
      animate(x, clampedX, {
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 0.8,
      });
      setActiveIndex(index);
    },
    [x, cardWidth, maxDrag, minDrag]
  );

  const handlePrev = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < TIMELINE_DATA.length - 1) scrollToIndex(activeIndex + 1);
  };

  const handleCardClick = (index) => {
    if (!isDragging) {
      scrollToIndex(index);
    }
  };

  const handleDragEnd = (_, info) => {
    setTimeout(() => setIsDragging(false), 50);
    const currentX = x.get();
    const velocity = info.velocity.x;

    // Determine new index based on position and velocity
    let newIndex = Math.round(-currentX / (cardWidth + CARD_GAP));
    if (velocity < -300) newIndex = Math.min(newIndex + 1, TIMELINE_DATA.length - 1);
    if (velocity > 300) newIndex = Math.max(newIndex - 1, 0);
    newIndex = Math.max(0, Math.min(newIndex, TIMELINE_DATA.length - 1));

    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const targetX = -(activeIndex * (cardWidth + CARD_GAP));
    const clampedX = Math.max(Math.min(targetX, maxDrag), minDrag);
    x.set(clampedX);
  }, [activeIndex, cardWidth, minDrag, maxDrag, x]);

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[560px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1920&q=80')",
        }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1220]/90 via-[#0c1220]/75 to-[#0c1220]/85" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 py-10 md:py-14">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 md:mb-14">
          <motion.h2
            className="text-white text-2xl md:text-3xl font-light tracking-[0.2em] uppercase"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Story
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <TimelineArrows
              onPrev={handlePrev}
              onNext={handleNext}
              canPrev={activeIndex > 0}
              canNext={activeIndex < TIMELINE_DATA.length - 1}
            />
          </motion.div>
        </div>

        {/* Scrollable timeline */}
        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            ref={dragRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: minDrag, right: maxDrag }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {TIMELINE_DATA.map((item, index) => (
              <TimelineCard
                key={item.year}
                item={item}
                index={index}
                isActive={index === activeIndex}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom dot navigation */}
        {/* <div className="mt-8 md:mt-10 max-w-md">
          <TimelineDots
            items={TIMELINE_DATA}
            activeIndex={activeIndex}
            onDotClick={scrollToIndex}
          />
        </div> */}
      </div>
    </section>
  );
}

