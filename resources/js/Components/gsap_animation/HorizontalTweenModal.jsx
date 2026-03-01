import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalTweenModal() {
  const modalWrapperRef = useRef(null);
  const modalContainerRef = useRef(null);
  const showModalTweenRef = useRef(null);
  const currentTweenRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const modalWrapper = modalWrapperRef.current;
    const modalContainer = modalContainerRef.current;

    if (!modalWrapper || !modalContainer) return;

    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      target: [modalWrapper],
    });

    gsap.set(modalWrapper, {
      autoAlpha: 1,
      xPercent: 100,
    });

    const destroyHorizontalTween = () => {
      if (!currentTweenRef.current) return;

      currentTweenRef.current.scrollTrigger?.kill();
      currentTweenRef.current.kill();
      currentTweenRef.current = null;
    };

    const createHorizontalScroll = () => {
      destroyHorizontalTween();

      const slides = gsap.utils.toArray(".modal-slide", modalContainer);
      if (!slides.length) return;

      currentTweenRef.current = gsap.to(slides, {
        xPercent: -(100 * (slides.length - 1)),
        ease: "none",
        scrollTrigger: {
          trigger: modalWrapper,
          scroller: modalWrapper,
          pin: modalContainer,
          start: "top top",
          end: `+=${100 * slides.length}%`,
          scrub: 0.5,
        },
      });
    };

    showModalTweenRef.current = gsap
      .to(modalWrapper, {
        xPercent: 0,
        ease: "power2.out",
        duration: 0.8,
        paused: true,
        onComplete: createHorizontalScroll,
        onReverseComplete: destroyHorizontalTween,
      })
      .reverse();

    return () => {
      destroyHorizontalTween();
      showModalTweenRef.current?.kill();
      showModalTweenRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tween = showModalTweenRef.current;
    const modalWrapper = modalWrapperRef.current;
    if (!tween || !modalWrapper) return;

    if (isOpen) {
      modalWrapper.scrollTop = 0;
      tween.reversed(false);
      return;
    }

    tween.reversed(true);
  }, [isOpen]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  const modalOverlay = (
    <div
      className={`fixed inset-0 z-[9999] bg-black/45 p-4 transition-opacity duration-300 sm:p-6 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={() => setIsOpen(false)}
    >
      <div className="flex h-full w-full items-start justify-center pt-28">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Horizontal slides modal"
          onClick={(event) => event.stopPropagation()}
          ref={modalWrapperRef}
          className="relative h-[78vh] max-h-[78vh] w-full max-w-6xl overscroll-contain overflow-x-hidden overflow-y-auto rounded-xl bg-white shadow-2xl"
        >
          <div ref={modalContainerRef} className="relative flex h-full w-full overflow-hidden">
            <section className="modal-slide h-full min-h-[640px] w-full shrink-0 bg-green-600" />
            <section className="modal-slide h-full min-h-[640px] w-full shrink-0 bg-blue-600" />
            <section className="modal-slide h-full min-h-[640px] w-full shrink-0 bg-fuchsia-600" />

            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-30 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative z-[1] h-screen w-full overflow-hidden bg-orange-300/25">
      <div className="flex h-full w-full items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
        >
          Show Modal
        </button>
      </div>

      {typeof document !== "undefined" ? createPortal(modalOverlay, document.body) : null}
    </div>
  );
}


