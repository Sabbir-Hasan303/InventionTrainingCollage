import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function EventCard({
  event,
  index,
  stackIndex,
  isTop,
  onDragEnd,
  onClick,
  dragConstraints,
}) {
  const videoRef = useRef(null);
  const MAX_VISIBLE = 3;
  const isVisible = stackIndex < MAX_VISIBLE;

  useEffect(() => {
    if (videoRef.current) {
      if (isTop && event.video) {
        videoRef.current.play().catch(() => {});
      } else if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isTop, event.video]);

  if (!isVisible && stackIndex >= MAX_VISIBLE) {
    return null;
  }

  const offsetX = stackIndex * 24;
  const scale = 1 - stackIndex * 0.06;
  const opacity = stackIndex >= MAX_VISIBLE ? 0 : 1 - stackIndex * 0.15;

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full origin-right"
      style={{
        zIndex: 100 - stackIndex,
        cursor: isTop ? "grab" : "default",
        pointerEvents: isTop ? "auto" : "none",
      }}
      initial={false}
      animate={{
        x: offsetX,
        scale: scale,
        opacity: opacity,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={dragConstraints}
      dragElastic={0.15}
      onDragEnd={(e, info) => {
        if (isTop) onDragEnd(e, info);
      }}
      onClick={() => {
        if (isTop) onClick(event);
      }}
      whileDrag={{ cursor: "grabbing" }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 35,
        mass: 0.8,
      }}
    >
      <motion.div
        className="w-full h-full rounded-[20px] overflow-hidden"
        style={{
          backgroundImage: event.image ? `url(${event.image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translate3d(0,0,0)",
        }}
        animate={{
          boxShadow:
            isTop
              ? "0 10px 40px rgba(0,0,0,0.22)"
              : "0 0px 0px rgba(0,0,0,0.1)",
        }}
      >
        {event.video && (
          <video
            ref={videoRef}
            src={event.video}
            poster={event.poster}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
