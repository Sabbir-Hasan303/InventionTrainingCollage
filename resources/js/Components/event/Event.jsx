import React, { useState, useCallback } from "react";
import { events } from "./eventData";
import EventNavBar from "./EventNavBar";
import EventHeader from "./EventHeader";
import EventSlider from "./EventSlider";
import EventFooter from "./EventFooter";
import EventModal from "./EventModal";
import EventSection from "./EventSection";

export default function Event() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEvent, setModalEvent] = useState(null);

    const handleNext = useCallback(() => {
        if (current < events.length - 1) {
            setDirection(1);
            setCurrent((c) => c + 1);
        }
    }, [current]);

    const handlePrev = useCallback(() => {
        if (current > 0) {
            setDirection(-1);
            setCurrent((c) => c - 1);
        }
    }, [current]);

    const handleCardClick = useCallback((event) => {
        setModalEvent(event);
        setModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    const currentEvent = events[current];

    return (
        <EventSection>
            <div className="select-none">
                <div
                    className="relative bg-white shadow-[0_0_60px_rgba(0,0,0,0.15)] w-full max-w-[500px] overflow-hidden mx-auto flex flex-col rounded-[30px] pt-4"
                    style={{
                        height: "700px",
                        minHeight: "500px",
                    }}
                >
                    {/* Nav bar */}
                    {/* <EventNavBar isModalOpen={modalOpen} /> */}

                    {/* Animated header */}
                    <EventHeader event={currentEvent} direction={direction} />

                    {/* Card slider */}
                    {!modalOpen && (
                        <EventSlider
                            events={events}
                            current={current}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            onCardClick={handleCardClick}
                        />
                    )}

                    {/* Footer */}
                    {/* <EventFooter /> */}

                    {/* Modal overlay */}
                    <EventModal
                        event={modalEvent}
                        isOpen={modalOpen}
                        onClose={handleCloseModal}
                    />
                </div>
            </div>
        </EventSection>
    );
}
