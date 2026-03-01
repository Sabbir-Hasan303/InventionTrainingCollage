import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, ArrowUpRight, ChevronDown, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedPlots() {
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const [isLocationOpen, setIsLocationOpen] = useState(true);
    const [selectedPlot, setSelectedPlot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cardsRef = useRef([]);
    const filterRef = useRef(null);
    const modalWrapperRef = useRef(null);
    const modalContainerRef = useRef(null);
    const showModalTweenRef = useRef(null);
    const currentTweenRef = useRef(null);

    const plots = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
            title: 'Lakeview Residential Plot - A1',
            location: 'Purbachal, Dhaka',
            number: '01',
            price: '3,200,000 BDT',
            area: '5 Katha',
            frontage: '48 ft',
            development: 'Road + Utility Ready',
            handover: 'Q2 2026',
            block: 'Block A',
            type: 'Residential',
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
                'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
            ],
            description: 'Corner plot in a fast-growing neighborhood with planned schools, parks, and a 60 ft access road. Suitable for a premium residential build.',
            amenities: ['60 ft Road Access', 'Nearby Park', 'Electricity Line', 'Water Line', 'Gas Nearby', 'Secure Gated Entry']
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80',
            title: 'Commercial Plot - B7 Main Road',
            location: 'Uttara Sector 16',
            number: '02',
            price: '5,900,000 BDT',
            area: '6.5 Katha',
            frontage: '62 ft',
            development: 'Partial Infrastructure',
            handover: 'Q4 2026',
            block: 'Block B',
            type: 'Commercial',
            images: [
                'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80',
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
            ],
            description: 'Main-road facing commercial land ideal for retail, office, or mixed-use development with strong footfall potential.',
            amenities: ['Main Road Facing', 'High Footfall Zone', 'Drainage Ready', 'Power Connection Nearby', 'Public Transport Access']
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
            title: 'South-Facing Plot - C3',
            location: 'Bashundhara R/A Extension',
            number: '03',
            price: '4,450,000 BDT',
            area: '5.5 Katha',
            frontage: '52 ft',
            development: 'Ready for Registration',
            handover: 'Immediate',
            block: 'Block C',
            type: 'Residential',
            images: [
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
            ],
            description: 'South-facing rectangular plot with clean title paperwork and easy access to community roads and daily essentials.',
            amenities: ['South Facing', 'Clean Title', 'Nearby School', 'Mosque Nearby', 'Fiber Internet Ready']
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80',
            title: 'Premium Corner Plot - D9',
            location: 'Keraniganj New Town',
            number: '04',
            price: '6,750,000 BDT',
            area: '8 Katha',
            frontage: '70 ft',
            development: 'Road + Drainage Complete',
            handover: 'Q1 2027',
            block: 'Block D',
            type: 'Mixed Use',
            images: [
                'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
            ],
            description: 'Large corner plot with dual-road access, suited for mixed-use development and long-term land value growth.',
            amenities: ['Corner Access', 'Dual Road Entry', 'Drainage Complete', 'Utility Access', 'Future Commercial Zone']
        },
    ];

    useEffect(() => {
        const listeners = [];

        cardsRef.current.forEach((card) => {
            if (!card) return;

            const frame = card.querySelector('.project-image-frame');
            const img = card.querySelector('.project-image');
            const arrow = card.querySelector('.arrow-icon');

            if (!frame || !img || !arrow) return;

            const onEnter = () => {
                gsap.to(frame, { top: '50%', left: 18, right: 18, bottom: 18, duration: 0.6, ease: 'power3.out' });
                gsap.to(img, { scale: 1.04, duration: 0.6, ease: 'power3.out' });
                gsap.to(arrow, { scale: 1.04, y: -2, duration: 0.3, ease: 'power2.out' });
            };

            const onLeave = () => {
                gsap.to(frame, { top: 0, left: 0, right: 0, bottom: 0, duration: 0.6, ease: 'power3.out' });
                gsap.to(img, { scale: 1, duration: 0.6, ease: 'power3.out' });
                gsap.to(arrow, { scale: 1, y: 0, duration: 0.25, ease: 'power2.out' });
            };

            // Desktop hover
            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mouseleave', onLeave);

            // Mobile/tablet tap press
            card.addEventListener('touchstart', onEnter, { passive: true });
            card.addEventListener('touchend', onLeave);
            card.addEventListener('touchcancel', onLeave);

            // Fallback for pointer devices without hover
            card.addEventListener('pointerdown', onEnter);
            card.addEventListener('pointerup', onLeave);
            card.addEventListener('pointercancel', onLeave);

            listeners.push({ card, onEnter, onLeave });
        });

        return () => {
            listeners.forEach(({ card, onEnter, onLeave }) => {
                card.removeEventListener('mouseenter', onEnter);
                card.removeEventListener('mouseleave', onLeave);
                card.removeEventListener('touchstart', onEnter);
                card.removeEventListener('touchend', onLeave);
                card.removeEventListener('touchcancel', onLeave);
                card.removeEventListener('pointerdown', onEnter);
                card.removeEventListener('pointerup', onLeave);
                card.removeEventListener('pointercancel', onLeave);
            });
        };
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!filterRef.current) return;
            if (!filterRef.current.contains(event.target)) {
                setShowFilterPanel(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const modalWrapper = modalWrapperRef.current;
        const modalContainer = modalContainerRef.current;

        if (!modalWrapper || !modalContainer) return;

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

        const isDesktopViewport = () => window.matchMedia('(min-width: 1024px)').matches;

        const createHorizontalScroll = () => {
            if (!isDesktopViewport()) return;
            destroyHorizontalTween();

            const slides = gsap.utils.toArray('.featured-modal-slide', modalContainer);
            if (!slides.length) return;

            currentTweenRef.current = gsap.to(slides, {
                xPercent: -(100 * (slides.length - 1)),
                ease: 'none',
                force3D: true,
                scrollTrigger: {
                    trigger: modalWrapper,
                    scroller: modalWrapper,
                    pin: modalContainer,
                    start: 'top top',
                    end: `+=${100 * slides.length}%`,
                    scrub: 0.8,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        };

        showModalTweenRef.current = gsap
            .to(modalWrapper, {
                xPercent: 0,
                ease: 'power2.out',
                duration: 0.8,
                paused: true,
                onComplete: () => {
                    createHorizontalScroll();
                    if (isDesktopViewport()) {
                        requestAnimationFrame(() => ScrollTrigger.refresh());
                    }
                },
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

        if (isModalOpen && selectedPlot) {
            modalWrapper.scrollTop = 0;
            tween.reversed(false);
            return;
        }

        tween.reversed(true);
    }, [isModalOpen, selectedPlot]);

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        const prevPaddingRight = document.body.style.paddingRight;

        if (isModalOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        }

        return () => {
            document.body.style.overflow = prevOverflow;
            document.body.style.paddingRight = prevPaddingRight;
        };
    }, [isModalOpen]);

    const openModal = (plot) => {
        setSelectedPlot(plot);
        requestAnimationFrame(() => setIsModalOpen(true));
    };

    const modalOverlay = (
        <div
            className={`fixed inset-0 z-[9999] bg-black/45 p-4 transition-opacity duration-300 sm:p-6 ${isModalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
            onClick={() => setIsModalOpen(false)}
        >
            <div className="flex h-full w-full items-start justify-center pt-24 md:pt-28">
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Plot details modal"
                    onClick={(event) => event.stopPropagation()}
                    className="relative h-[78vh] max-h-[78vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl"
                >
                    <button
                        type="button"
                        aria-label="Close modal"
                        onClick={() => setIsModalOpen(false)}
                        className="absolute right-3 top-3 z-40 rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-black shadow"
                    >
                        <X size={16} />
                    </button>

                    <div ref={modalWrapperRef} className="h-full w-full overflow-x-hidden overflow-y-scroll overscroll-contain">
                        <div ref={modalContainerRef} className="relative flex w-full flex-col overflow-visible lg:h-full lg:flex-row lg:overflow-hidden">
                            <section className="featured-modal-slide relative h-[42vh] min-h-[320px] w-full shrink-0 lg:h-full lg:min-h-full will-change-transform">
                                <img
                                    src={selectedPlot?.images?.[0] || selectedPlot?.image}
                                    alt={selectedPlot?.title || 'Plot image'}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                                    <p className="mb-2 text-sm uppercase tracking-[0.2em]">{selectedPlot?.location}</p>
                                    <h3 className="text-3xl md:text-5xl font-light leading-tight">{selectedPlot?.title}</h3>
                                    <p className="mt-4 text-base md:text-lg">{selectedPlot?.price}</p>
                                </div>
                            </section>

                            <section className="featured-modal-slide h-auto min-h-0 w-full shrink-0 bg-light p-6 md:p-10 text-black lg:h-full lg:min-h-full will-change-transform">
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
                                    <div className="xl:col-span-2">
                                        <h4 className="text-sm uppercase tracking-[0.2em] text-black/60 mb-3">Plot Overview</h4>
                                        <p className="text-lg md:text-2xl font-light leading-relaxed max-w-4xl">
                                            {selectedPlot?.description}
                                        </p>

                                        <div className="mt-8 flex flex-wrap gap-2">
                                            <span className="inline-flex items-center rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                                                {selectedPlot?.type}
                                            </span>
                                            <span className="inline-flex items-center rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                                                {selectedPlot?.location}
                                            </span>
                                            <span className="inline-flex items-center rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                                                {selectedPlot?.price}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-black/10 bg-white p-5">
                                        <h5 className="text-xs uppercase tracking-[0.2em] text-black/50 mb-4">Plot Snapshot</h5>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                                                <span className="text-black/55">Plot No.</span>
                                                <span className="font-medium">{selectedPlot?.number}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                                                <span className="text-black/55">Block</span>
                                                <span className="font-medium">{selectedPlot?.block}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                                                <span className="text-black/55">Area</span>
                                                <span className="font-medium">{selectedPlot?.area}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                                                <span className="text-black/55">Frontage</span>
                                                <span className="font-medium">{selectedPlot?.frontage}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                                                <span className="text-black/55">Development</span>
                                                <span className="font-medium text-right">{selectedPlot?.development}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-black/55">Handover</span>
                                                <span className="font-medium">{selectedPlot?.handover}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                                        <div className="text-xs uppercase tracking-wider text-black/50">Area</div>
                                        <div className="mt-1 text-lg font-medium">{selectedPlot?.area}</div>
                                    </div>
                                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                                        <div className="text-xs uppercase tracking-wider text-black/50">Frontage</div>
                                        <div className="mt-1 text-lg font-medium">{selectedPlot?.frontage}</div>
                                    </div>
                                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                                        <div className="text-xs uppercase tracking-wider text-black/50">Development</div>
                                        <div className="mt-1 text-lg font-medium">{selectedPlot?.development}</div>
                                    </div>
                                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                                        <div className="text-xs uppercase tracking-wider text-black/50">Handover</div>
                                        <div className="mt-1 text-lg font-medium">{selectedPlot?.handover}</div>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-2xl border border-black/10 bg-white px-5 py-4 md:px-6 md:py-5">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <p className="text-sm md:text-base text-black/70">
                                            Need complete ownership, map, and legal documentation details?
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
                                        >
                                            View Full Plot Details
                                            <ArrowUpRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </section>

                            <section className="featured-modal-slide h-auto min-h-0 w-full shrink-0 bg-white p-6 md:p-10 text-black lg:h-full lg:min-h-full will-change-transform">
                                <div className="flex items-center justify-between gap-4 mb-5">
                                    <h4 className="text-sm uppercase tracking-[0.2em] text-black/60">Plot Features</h4>
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
                                    >
                                        View Full Plot Details
                                        <ArrowUpRight size={14} />
                                    </a>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                    {(selectedPlot?.amenities || []).map((amenity) => (
                                        <div key={amenity} className="rounded-2xl border border-black/10 bg-[#F7F7F7] px-4 py-3 text-base">
                                            {amenity}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(selectedPlot?.images || []).slice(0, 2).map((image, index) => (
                                        <img
                                            key={`${selectedPlot?.id}-${index}`}
                                            src={image}
                                            alt={`${selectedPlot?.title} ${index + 1}`}
                                            className="h-56 w-full rounded-2xl object-cover"
                                        />
                                    ))}
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <div className="text-sm text-gray-500 mb-2">Recently Added Plot Opportunities</div>
                        <h2 className="text-5xl md:text-6xl font-light text-gray-900">Available Plots</h2>
                    </div>

                    <button className="px-8 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">
                        View All
                    </button>
                </div>

                {/* Filters */}
                <div ref={filterRef} className="relative mb-12">
                    <button
                        type="button"
                        onClick={() => setShowFilterPanel(!showFilterPanel)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-900 shadow-sm hover:shadow-md hover:border-gray-400 transition-all"
                    >
                        <span className="text-sm font-medium">Filter</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="6" x2="16" y2="6" />
                            <line x1="8" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="12" y2="18" />
                            <circle cx="18" cy="6" r="2" />
                            <circle cx="6" cy="12" r="2" />
                            <circle cx="14" cy="18" r="2" />
                        </svg>
                    </button>

                    {showFilterPanel && (
                        <div className="absolute left-0 top-[calc(100%+12px)] z-30 w-[330px] rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl">
                            <div className="mb-5">
                                <button
                                    type="button"
                                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                                    className="w-full flex items-center justify-between mb-2"
                                >
                                    <h4 className="text-[28px] font-light text-gray-900">Price</h4>
                                    <ChevronDown size={18} className={`text-gray-700 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isPriceOpen && (
                                    <div className="space-y-2 text-sm text-gray-700">
                                        <label className="flex items-center gap-2"><input type="radio" name="price" defaultChecked /> All</label>
                                        <label className="flex items-center gap-2"><input type="radio" name="price" /> 10,000,000+ BDT</label>
                                        <label className="flex items-center gap-2"><input type="radio" name="price" /> 2,500,000 - 5,000,000 BDT</label>
                                        <label className="flex items-center gap-2"><input type="radio" name="price" /> 500,000 - 1,000,000 BDT</label>
                                        <label className="flex items-center gap-2"><input type="radio" name="price" /> up to 250,000 BDT</label>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                                    className="w-full flex items-center justify-between text-left text-[32px] font-light text-gray-900"
                                >
                                    <span>Location</span>
                                    <ChevronDown size={18} className={`text-gray-700 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isLocationOpen && (
                                    <div className="mt-3 space-y-2">
                                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-2 flex items-center gap-2">
                                            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=80&q=80" alt="Dubai" className="w-7 h-7 rounded-full object-cover" />
                                            <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=80&q=80" alt="Abu Dhabi" className="w-7 h-7 rounded-full object-cover -ml-3 border border-white" />
                                            <span className="text-sm text-gray-700">All location</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <button className="rounded-xl border border-gray-200 bg-white p-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=80&q=80" alt="Sharjah" className="w-8 h-8 rounded-md object-cover" />
                                                Sharjah
                                            </button>
                                            <button className="rounded-xl border border-gray-200 bg-white p-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=80&q=80" alt="Ras Al Khaimah" className="w-8 h-8 rounded-md object-cover" />
                                                Ras Al Khaimah
                                            </button>
                                            <button className="rounded-xl border border-gray-200 bg-white p-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <img src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=80&q=80" alt="Abu Dhabi" className="w-8 h-8 rounded-md object-cover" />
                                                Abu Dhabi
                                            </button>
                                            <button className="rounded-xl border border-[#f08f82] bg-[#ef7f72] p-2 flex items-center gap-2 text-sm text-white">
                                                <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=80&q=80" alt="Dubai" className="w-8 h-8 rounded-md object-cover border border-white/40" />
                                                Dubai
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowFilterPanel(false)}
                                    className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Reset Filters
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowFilterPanel(false)}
                                    className="flex-1 px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition-colors"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/* Available Plots Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {plots.map((plot, index) => (
                        <div
                            key={plot.id}
                            ref={el => cardsRef.current[index] = el}
                            className="group"

                        >
                            <div className="relative h-[500px] rounded-3xl overflow-hidden border border-[#ede9de] bg-light">
                                <div className="project-meta absolute inset-0 z-0 p-5 flex flex-col text-black">
                                    <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl font-light leading-none">{plot.number}</span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/15 text-sm">
                                                <MapPin size={13} />
                                                {plot.location}
                                            </span>
                                            <span className="px-3 py-1 rounded-full border border-black/15 text-sm">{plot.type}</span>
                                        </div>
                                        <div className="text-3xl font-light text-right">{plot.price}</div>
                                    </div>

                                    <div className="mt-8 flex items-start justify-between gap-6">
                                        <div className="max-w-[68%]">
                                            <p className="text-sm text-black/55 mb-2">Block: {plot.block}</p>
                                            <h3 className="card-content text-black text-4xl md:text-[46px] font-light leading-[1.05]">
                                                {plot.title}
                                            </h3>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                openModal(plot);
                                            }}
                                            className="arrow-icon shrink-0 flex items-center gap-3 rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-left hover:bg-black/10 transition-colors"
                                        >
                                            <span className="text-base leading-tight">
                                                View
                                                <br />
                                                Details
                                            </span>
                                            <span className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center">
                                                <ArrowUpRight size={16} />
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="project-image-frame absolute inset-0 z-10 rounded-3xl overflow-hidden">
                                    <img
                                        src={plot.image}
                                        alt={plot.title}
                                        className="project-image w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {typeof document !== 'undefined' ? createPortal(modalOverlay, document.body) : null}
        </section>
    );
}


