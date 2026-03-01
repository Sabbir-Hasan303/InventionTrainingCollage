import React, { useRef } from "react";
import EventCard from "./EventCard";

export default function EventSlider({ events, current, onNext, onPrev, onCardClick }) {
    const constraintsRef = useRef(null);

    const handleDragEnd = (e, info) => {
        const threshold = -80;
        const prevThreshold = 50;

        if (info.offset.x < threshold && current < events.length - 1) {
            onNext();
        } else if (info.offset.x > prevThreshold && current > 0) {
            onPrev();
        }
    };

    // Show current + next few cards in stack
    const visibleCards = [];
    for (let i = current; i < Math.min(current + 4, events.length); i++) {
        visibleCards.push({
            event: events[i],
            index: i,
            stackIndex: i - current,
        });
    }

    return (
        <div className="relative flex-1 w-[78%] mb-6" ref={constraintsRef}>
            <div className="relative h-full pl-[35px]">
                <div className="relative h-full">
                    {visibleCards.reverse().map(({ event, index, stackIndex }) => (
                        <EventCard
                            key={event.id + "-" + index}
                            event={event}
                            index={index}
                            stackIndex={stackIndex}
                            isTop={stackIndex === 0}
                            onDragEnd={handleDragEnd}
                            onClick={onCardClick}
                            dragConstraints={constraintsRef}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
