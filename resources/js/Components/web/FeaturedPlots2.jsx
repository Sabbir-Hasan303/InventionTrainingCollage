import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, ArrowUpRight, X, Ruler, Building2, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TYPE_COLORS = {
    Residential: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    Commercial: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
    'Mixed Use': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500' },
};

const AMENITY_ICONS = {
    default: '✦',
};

export default function FeaturedPlots2() {
    const [selectedPlot, setSelectedPlot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeMobileCardId, setActiveMobileCardId] = useState(null);
    const [isDesktopView, setIsDesktopView] = useState(() => {
        if (typeof window === 'undefined') return true;
        return window.matchMedia('(min-width: 1024px)').matches;
    });

    const cardsRef = useRef([]);
    const modalWrapperRef = useRef(null);
    const modalContainerRef = useRef(null);
    const showModalTweenRef = useRef(null);
    const currentTweenRef = useRef(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const onChange = (event) => setIsDesktopView(event.matches);
        setIsDesktopView(mediaQuery.matches);
        mediaQuery.addEventListener?.('change', onChange);
        return () => mediaQuery.removeEventListener?.('change', onChange);
    }, []);

    useEffect(() => {
        if (isDesktopView) setActiveMobileCardId(null);
    }, [isDesktopView]);

    const plots = [
        {
            id: 1,
            image: 'https://img.freepik.com/free-photo/view-land-plot-real-estate-business-development_23-2149916719.jpg?t=st=1771955123~exp=1771958723~hmac=bf93f26c4befe772fa8bb4ab40616c463c7a6eb203276d78d58264d0d8d7ec06&w=1480',
            title: 'Lakeview Residential Plot — A1',
            location: 'Purbachal, Dhaka',
            number: '01',
            price: '৳ 3,200,000',
            area: '5 Katha',
            frontage: '48 ft',
            development: 'Road + Utility Ready',
            handover: 'Q2 2026',
            block: 'Block A',
            type: 'Residential',
            tag: 'New Launch',
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
                'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
            ],
            description: 'Corner plot in a fast-growing neighborhood with planned schools, parks, and a 60 ft access road. Suitable for a premium residential build.',
            amenities: ['60 ft Road Access', 'Nearby Park', 'Electricity Line', 'Water Line', 'Gas Nearby', 'Secure Gated Entry'],
        },
        {
            id: 2,
            image: 'https://img.freepik.com/premium-photo/vacant-land-plot-marked-with-location-markers-green-field-area-residential-development-project_1299716-35645.jpg?w=1480',
            title: 'Commercial Plot — B7 Main Road',
            location: 'Uttara Sector 16',
            number: '02',
            price: '৳ 5,900,000',
            area: '6.5 Katha',
            frontage: '62 ft',
            development: 'Partial Infrastructure',
            handover: 'Q4 2026',
            block: 'Block B',
            type: 'Commercial',
            tag: 'High ROI',
            images: [
                'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80',
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
            ],
            description: 'Main-road facing commercial land ideal for retail, office, or mixed-use development with strong footfall potential.',
            amenities: ['Main Road Facing', 'High Footfall Zone', 'Drainage Ready', 'Power Connection Nearby', 'Public Transport Access'],
        },
        {
            id: 3,
            image: 'https://img.freepik.com/premium-photo/trees-grassy-field_1611446-277.jpg?w=1480',
            title: 'South-Facing Plot — C3',
            location: 'Bashundhara R/A Extension',
            number: '03',
            price: '৳ 4,450,000',
            area: '5.5 Katha',
            frontage: '52 ft',
            development: 'Ready for Registration',
            handover: 'Immediate',
            block: 'Block C',
            type: 'Residential',
            tag: 'Ready to Move',
            images: [
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
            ],
            description: 'South-facing rectangular plot with clean title paperwork and easy access to community roads and daily essentials.',
            amenities: ['South Facing', 'Clean Title', 'Nearby School', 'Mosque Nearby', 'Fiber Internet Ready'],
        },
        {
            id: 4,
            image: 'https://img.freepik.com/premium-photo/scenic-view-golf-course-against-clear-sky_1613591-175.jpg?w=1480',
            title: 'Premium Corner Plot — D9',
            location: 'Keraniganj New Town',
            number: '04',
            price: '৳ 6,750,000',
            area: '8 Katha',
            frontage: '70 ft',
            development: 'Road + Drainage Complete',
            handover: 'Q1 2027',
            block: 'Block D',
            type: 'Mixed Use',
            tag: 'Premium',
            images: [
                'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
            ],
            description: 'Large corner plot with dual-road access, suited for mixed-use development and long-term land value growth.',
            amenities: ['Corner Access', 'Dual Road Entry', 'Drainage Complete', 'Utility Access', 'Future Commercial Zone'],
        },
    ];

    // Scroll-triggered card entrance
    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean);
        if (!cards.length) return;

        gsap.fromTo(
            cards,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cards[0],
                    start: 'top 85%',
                    once: true,
                },
            }
        );

        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 88%', once: true } }
            );
        }
    }, []);

    // Card hover GSAP
    useEffect(() => {
        if (!isDesktopView) return;
        const listeners = [];
        cardsRef.current.forEach((card) => {
            if (!card) return;
            const frame = card.querySelector('.project-image-frame');
            const img = card.querySelector('.project-image');
            const arrows = card.querySelectorAll('.arrow-icon');
            const initialOverlay = card.querySelector('.project-initial-overlay');
            const meta = card.querySelector('.project-meta');
            const detailsChip = card.querySelector('.details-chip');
            if (!frame || !img || !arrows.length || !initialOverlay || !meta || !detailsChip) return;

            gsap.set(meta, { autoAlpha: 0, y: 18 });

            const onEnter = () => {
                gsap.to(frame, { top: '47%', left: 16, right: 16, bottom: 16, borderRadius: 22, duration: 0.55, ease: 'power3.out' });
                gsap.to(img, { scale: 1.06, duration: 0.55, ease: 'power3.out' });
                gsap.to(arrows, { scale: 1.05, y: -3, duration: 0.3, ease: 'power2.out', stagger: 0.03 });
                gsap.to(initialOverlay, { autoAlpha: 0, duration: 0.24, ease: 'power2.out' });
                gsap.to(meta, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' });
                gsap.to(detailsChip, { y: -2, duration: 0.3, ease: 'power2.out' });
            };
            const onLeave = () => {
                gsap.to(frame, { top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16, duration: 0.55, ease: 'power3.out' });
                gsap.to(img, { scale: 1, duration: 0.55, ease: 'power3.out' });
                gsap.to(arrows, { scale: 1, y: 0, duration: 0.25, ease: 'power2.out' });
                gsap.to(initialOverlay, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' });
                gsap.to(meta, { autoAlpha: 0, y: 18, duration: 0.25, ease: 'power2.inOut' });
                gsap.to(detailsChip, { y: 0, duration: 0.25, ease: 'power2.out' });
            };

            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mouseleave', onLeave);
            listeners.push({ card, onEnter, onLeave });
        });
        return () => {
            listeners.forEach(({ card, onEnter, onLeave }) => {
                card.removeEventListener('mouseenter', onEnter);
                card.removeEventListener('mouseleave', onLeave);
            });
        };
    }, [isDesktopView]);



    // Modal GSAP setup
    useEffect(() => {
        const modalWrapper = modalWrapperRef.current;
        const modalContainer = modalContainerRef.current;
        if (!modalWrapper || !modalContainer) return;

        // Don't hide the wrapper itself - the overlay handles visibility
        gsap.set(modalContainer, { xPercent: 100 });

        const destroyHorizontalTween = () => {
            if (!currentTweenRef.current) return;
            currentTweenRef.current.scrollTrigger?.kill();
            currentTweenRef.current.kill();
            currentTweenRef.current = null;
        };

        const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

        const createHorizontalScroll = () => {
            if (!isDesktop()) return;
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

        showModalTweenRef.current = gsap.to(modalContainer, {
            xPercent: 0,
            ease: 'power2.out',
            duration: 0.75,
            paused: true,
            onComplete: () => {
                createHorizontalScroll();
                if (isDesktop()) requestAnimationFrame(() => ScrollTrigger.refresh());
            },
            onReverseComplete: destroyHorizontalTween,
        }).reverse();

        return () => {
            destroyHorizontalTween();
            showModalTweenRef.current?.kill();
        };
    }, []);

    useEffect(() => {
        const tween = showModalTweenRef.current;
        const modalWrapper = modalWrapperRef.current;
        if (!tween || !modalWrapper) return;
        if (isModalOpen && selectedPlot) {
            modalWrapper.scrollTop = 0;
            tween.reversed(false);
        } else {
            tween.reversed(true);
        }
    }, [isModalOpen, selectedPlot]);

    useEffect(() => {
        if (isModalOpen) {
            const sw = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            if (sw > 0) document.body.style.paddingRight = `${sw}px`;
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isModalOpen]);

    const openModal = (plot) => {
        setSelectedPlot(plot);
        setActiveImageIndex(0);
        requestAnimationFrame(() => setIsModalOpen(true));
    };

    const typeStyle = selectedPlot ? (TYPE_COLORS[selectedPlot.type] || TYPE_COLORS['Residential']) : TYPE_COLORS['Residential'];

    const modalOverlay = (
        <div
            className={`fixed inset-0 z-[9999] transition-all duration-300 ${isModalOpen ? 'pointer-events-auto opacity-100 visible' : 'pointer-events-none opacity-0 invisible'}`}
            style={{ background: isModalOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)', backdropFilter: isModalOpen ? 'blur(4px)' : 'blur(0px)' }}
            onClick={() => setIsModalOpen(false)}
        >
            <div className="flex h-full w-full items-start justify-center pt-16 sm:pt-20 px-3 sm:px-6">
                <div
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()}
                    className="relative h-[82vh] max-h-[82vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                    style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.35)' }}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="absolute right-4 top-4 z-50 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <X size={16} strokeWidth={2.5} />
                    </button>

                    <div ref={modalWrapperRef} className="h-full w-full overflow-x-hidden overflow-y-scroll overscroll-contain">
                        <div ref={modalContainerRef} className="relative flex w-full flex-col overflow-visible lg:h-full lg:flex-row lg:overflow-hidden">

                            {/* Slide 1 — Hero Image */}
                            <section className="featured-modal-slide relative h-[46vh] min-h-[340px] w-full shrink-0 lg:h-full lg:min-h-full will-change-transform">
                                {/* Image Gallery Thumbnails */}
                                <div className="absolute bottom-2 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                    {(selectedPlot?.images || []).map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImageIndex(i)}
                                            className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === i ? 'border-white scale-110' : 'border-white/40 opacity-60'}`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>

                                <img
                                    src={(selectedPlot?.images || [])[activeImageIndex] || selectedPlot?.image}
                                    alt={selectedPlot?.title}
                                    className="h-full w-full object-cover transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Type badge */}
                                {selectedPlot && (
                                    <div className="absolute top-5 left-5 z-20">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${typeStyle.bg} ${typeStyle.text} border ${typeStyle.border}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${typeStyle.dot}`} />
                                            {selectedPlot.type}
                                        </span>
                                    </div>
                                )}

                                <div className="absolute bottom-10 left-0 right-0 p-6 md:p-10 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin size={14} className="opacity-70" />
                                        <span className="text-sm uppercase tracking-[0.2em] leading-none opacity-80">{selectedPlot?.location}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-light leading-tight mb-3">{selectedPlot?.title}</h3>
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <span className="text-2xl md:text-3xl font-semibold">{selectedPlot?.price}</span>
                                        <span className="text-sm opacity-60 uppercase tracking-wider">BDT</span>
                                    </div>
                                </div>
                            </section>

                            {/* Slide 2 — Overview */}
                            <section className="featured-modal-slide h-auto min-h-0 w-full shrink-0 bg-light p-6 md:p-10 text-black lg:h-full lg:min-h-full will-change-transform">
                                <div className="max-w-5xl mx-auto">
                                    {/* Stats row */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                                        {[
                                            { icon: <Ruler size={15} />, label: 'Area', value: selectedPlot?.area },
                                            { icon: <Ruler size={15} />, label: 'Frontage', value: selectedPlot?.frontage },
                                            { icon: <Building2 size={15} />, label: 'Block', value: selectedPlot?.block },
                                            { icon: <Calendar size={15} />, label: 'Handover', value: selectedPlot?.handover },
                                        ].map(({ icon, label, value }) => (
                                            <div key={label} className="rounded-2xl bg-white border border-black/8 p-4 flex flex-col gap-1.5">
                                                <div className="flex items-center gap-1.5 text-black/40 text-xs uppercase tracking-wider">
                                                    {icon} {label}
                                                </div>
                                                <div className="text-base font-semibold text-black">{value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                        <div className="xl:col-span-2">
                                            <h4 className="text-xs uppercase tracking-[0.22em] text-black/40 mb-3">Plot Overview</h4>
                                            <p className="text-lg md:text-xl font-light leading-relaxed text-black/80">
                                                {selectedPlot?.description}
                                            </p>

                                            {/* Development status */}
                                            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10">
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                <span className="text-sm font-medium">{selectedPlot?.development}</span>
                                            </div>

                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {[selectedPlot?.type, selectedPlot?.location, selectedPlot?.block].map((tag) => (
                                                    <span key={tag} className="inline-flex items-center rounded-full border border-black/12 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-black/60">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Snapshot card */}
                                        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                                            <h5 className="text-xs uppercase tracking-[0.22em] text-black/40 mb-4">Plot Snapshot</h5>
                                            <div className="space-y-3 text-sm">
                                                {[
                                                    { label: 'Plot No.', value: selectedPlot?.number },
                                                    { label: 'Block', value: selectedPlot?.block },
                                                    { label: 'Area', value: selectedPlot?.area },
                                                    { label: 'Frontage', value: selectedPlot?.frontage },
                                                    { label: 'Development', value: selectedPlot?.development },
                                                    { label: 'Handover', value: selectedPlot?.handover },
                                                ].map(({ label, value }) => (
                                                    <div key={label} className="flex items-center justify-between gap-3 border-b border-black/8 pb-2 last:border-0 last:pb-0">
                                                        <span className="text-black/45">{label}</span>
                                                        <span className="font-medium text-right">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-8 rounded-2xl border border-black/10 bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between shadow-sm">
                                        <div>
                                            <p className="text-sm font-medium text-black">Ready to invest?</p>
                                            <p className="text-xs text-black/50 mt-0.5">Get full ownership docs, site map & legal paperwork</p>
                                        </div>
                                        <a href="#" className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-gray-800 transition-colors shrink-0">
                                            Full Plot Details <ArrowUpRight size={13} />
                                        </a>
                                    </div>
                                </div>
                            </section>

                            {/* Slide 3 — Features & Gallery */}
                            <section className="featured-modal-slide h-auto min-h-0 w-full shrink-0 bg-white p-6 md:p-10 text-black lg:h-full lg:min-h-full will-change-transform">
                                <div className="max-w-5xl mx-auto">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <h4 className="text-xs uppercase tracking-[0.22em] text-black/40">Plot Features & Gallery</h4>
                                        <a href="#" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-gray-800 transition-colors">
                                            View All Details <ArrowUpRight size={13} />
                                        </a>
                                    </div>

                                    {/* Amenities */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                                        {(selectedPlot?.amenities || []).map((amenity) => (
                                            <div key={amenity} className="rounded-xl border border-black/8 bg-[#F7F7F7] px-4 py-3 flex items-center gap-2.5">
                                                <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs text-black/50">✦</span>
                                                <span className="text-sm font-medium">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Gallery */}
                                    <h5 className="text-xs uppercase tracking-[0.22em] text-black/40 mb-3">Photo Gallery</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(selectedPlot?.images || []).map((image, index) => (
                                            <div key={`${selectedPlot?.id}-${index}`} className="relative overflow-hidden rounded-2xl group">
                                                <img
                                                    src={image}
                                                    alt={`${selectedPlot?.title} ${index + 1}`}
                                                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section ref={sectionRef} className="py-28 bg-light">
            <div className="web-giant-container px-5 sm:px-8">

                {/* Header */}
                <div ref={headerRef} className="mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 section-sub-title mb-4">
                                <TrendingUp size={11} />
                                Recently Added Plot Opportunities
                            </div>
                            <h2 className="section-title text-gray-900">
                                Available <span className="italic text-gray-400">Plots</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <div className="text-2xl font-light text-gray-900">{plots.length}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Listings</div>
                            </div>
                            <button className="px-7 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-black/20">
                                View All
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>



                {/* Plot Cards Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    {plots.map((plot, index) => {
                        const isMobileExpanded = !isDesktopView && activeMobileCardId === plot.id;
                        const frameStateClass = isMobileExpanded ? 'top-[47%] left-4 right-4 bottom-4 rounded-[22px]' : 'inset-0 rounded-2xl';
                        const frameMotionClass = isDesktopView ? '' : 'transition-all duration-500';
                        const overlayStateClass = isMobileExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100';
                        const overlayMotionClass = isDesktopView ? '' : 'transition-opacity duration-300';
                        return (
                        <div
                            key={plot.id}
                            ref={el => cardsRef.current[index] = el}
                            className="group"
                            onClick={() => {
                                if (isDesktopView) return;
                                setActiveMobileCardId(prev => (prev === plot.id ? null : plot.id));
                            }}
                        >
                            <div className="relative h-[420px] rounded-2xl overflow-hidden border border-[#e7e3d7] bg-light shadow-sm hover:shadow-2xl transition-shadow duration-500">
                                <div className="project-meta absolute inset-0 z-0 p-4 sm:p-5 text-black">
                                    <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-3">
                                        <div className="flex items-center gap-2.5 flex-wrap">
                                            <span className="text-4xl font-light leading-none">{plot.number}</span>
                                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/15 bg-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] text-[11px] sm:text-xs font-medium tracking-[0.08em] uppercase text-black/80">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                                {plot.type}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-light text-right">{plot.price}</div>
                                    </div>

                                    <div className="flex items-start justify-between gap-3 lg:gap-5">
                                        <div className="max-w-[85%]">
                                            <h3 className="card-title-sm font-light line-clamp-3 text-black">{plot.title}</h3>
                                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/15 bg-white/80 text-xs sm:text-sm text-black/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-black/8">
                                                    <MapPin size={10} className="text-black/70" />
                                                </span>
                                                {plot.location}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); openModal(plot); }}
                                            className="mt-6 details-chip arrow-icon shrink-0 flex items-center gap-3 rounded-2xl border border-black/10 bg-gradient-to-b from-white to-[#f2efe7] px-4 py-3 text-left shadow-sm hover:shadow-md hover:border-black/20 transition-all"
                                        >
                                            {/* <span className="text-base leading-tight text-black/90">
                                                View
                                                <br />
                                                Details
                                            </span> */}
                                            <span className="w-8 h-8 rounded-full border border-black/20 bg-white flex items-center justify-center shadow-sm">
                                                <ArrowUpRight size={16} className="text-black/80" />
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className={`project-image-frame absolute z-10 overflow-hidden ${frameMotionClass} ${frameStateClass}`}>
                                    <img src={plot.image} alt={plot.title} className="project-image w-full h-full object-cover transition-transform duration-700" />
                                    <div className={`project-initial-overlay absolute inset-0 ${overlayMotionClass} ${overlayStateClass}`}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                                                <MapPin size={11} />
                                                {plot.location}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); openModal(plot); }}
                                            className="arrow-icon absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
                                        >
                                            <ArrowUpRight size={16} className="text-black" />
                                        </button>

                                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
                                            <div className="flex items-end justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-sm font-semibold">{plot.number}</span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold leading-tight">{plot.title}</h3>
                                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                                        <span className="text-sm opacity-80">{plot.area}</span>
                                                        <span className="w-1 h-1 rounded-full bg-white/40" />
                                                        <span className="text-sm opacity-80">{plot.frontage} frontage</span>
                                                        <span className="w-1 h-1 rounded-full bg-white/40" />
                                                        <span className="text-sm opacity-80">{plot.handover}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <div className="text-lg font-bold">{plot.price}</div>
                                                    <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${plot.tag === 'Ready to Move' ? 'bg-green-500/80' : plot.tag === 'High ROI' ? 'bg-blue-500/80' : plot.tag === 'Premium' ? 'bg-purple-500/80' : 'bg-amber-500/80'} text-white`}>
                                                        {plot.tag}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>

                {/* Bottom CTA strip */}
                <div className="mt-16 rounded-3xl bg-dark text-white p-8 md:p-12 flex flex-col xl:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="section-title mb-1">Looking for something specific?</h3>
                        <p className="max-w-2xl hero-description text-white/50">Browse our full catalogue of available plots across Dhaka</p>
                    </div>
                    <div className="flex w-full md:w-auto flex-col md:flex-row gap-3 shrink-0">
                        <button className="w-full md:w-auto px-7 py-3 rounded-full bg-white text-black text-sm leading-4 tracking-[0.08em] hover:bg-gray-100 transition-colors">
                            Browse All Plots
                        </button>
                        <button className="w-full md:w-auto px-7 py-3 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                            Contact Agent
                        </button>
                    </div>
                </div>
            </div>

            {typeof document !== 'undefined' ? createPortal(modalOverlay, document.body) : null}
        </section>
    );
}
