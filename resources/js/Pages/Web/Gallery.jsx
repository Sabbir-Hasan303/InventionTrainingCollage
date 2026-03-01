import React, { useEffect, useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand, Grid3X3, Images } from 'lucide-react';
import WebLayout from '@/Layouts/WebLayout';

const galleryImages = [
    { id: '1', title: 'Eco-City Overview', image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80', category: 'project' },
    { id: '2', title: 'Green Valley Streetscape', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80', category: 'project' },
    { id: '3', title: 'Construction Progress', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80', category: 'construction' },
    { id: '4', title: 'Lakefront Residential Block', image_url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80', category: 'project' },
    { id: '5', title: 'Commercial Hub Entrance', image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80', category: 'project' },
    { id: '6', title: 'On-Site Development Tour', image_url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1400&q=80', category: 'site_visit' },
    { id: '7', title: 'Head Office', image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80', category: 'office' },
    { id: '8', title: 'Team Collaboration Day', image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1400&q=80', category: 'event' },
    { id: '9', title: 'Project Launch Ceremony', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80', category: 'event' },
    { id: '10', title: 'Foundation Works', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80', category: 'construction' },
    { id: '11', title: 'Aerial Community View', image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80', category: 'project' },
    { id: '12', title: 'Client Advisory Meeting', image_url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80', category: 'office' },
    { id: '13', title: 'Land Preparation Phase', image_url: 'https://images.unsplash.com/photo-1590725175676-bbb6d64a7042?w=1400&q=80', category: 'construction' },
    { id: '14', title: 'Site Visit Briefing', image_url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80', category: 'site_visit' },
    { id: '15', title: 'Annual Partner Summit', image_url: 'https://images.unsplash.com/photo-1464998857633-50e59fbf2fe6?w=1400&q=80', category: 'event' },
    { id: '16', title: 'Sales Office Interior', image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=80', category: 'office' },
];

const categories = [
    { value: 'all', label: 'All' },
    { value: 'project', label: 'Projects' },
    { value: 'construction', label: 'Construction' },
    { value: 'site_visit', label: 'Site Visits' },
    { value: 'office', label: 'Office' },
    { value: 'event', label: 'Events' },
];

const tileClassByIndex = [
    'sm:col-span-2 sm:row-span-2',
    'sm:row-span-2',
    '',
    '',
    'sm:col-span-2',
    '',
    'sm:row-span-2',
    '',
];

function prettyCategory(category) {
    return category.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filteredImages = useMemo(
        () => galleryImages.filter((img) => selectedCategory === 'all' || img.category === selectedCategory),
        [selectedCategory]
    );

    const currentImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;
    const categoryCount = (category) => galleryImages.filter((img) => img.category === category).length;

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = () => {
        if (!filteredImages.length) return;
        setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
    };
    const prevImage = () => {
        if (!filteredImages.length) return;
        setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    useEffect(() => {
        if (lightboxIndex === null) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeLightbox();
            if (event.key === 'ArrowRight') nextImage();
            if (event.key === 'ArrowLeft') prevImage();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxIndex, filteredImages.length]);

    useEffect(() => {
        setLightboxIndex(null);
    }, [selectedCategory]);

    return (
        <WebLayout>
            <div className="overflow-hidden">
                <section className="relative isolate border-b border-white/10 bg-[#17181b] pt-28 md:pt-36">
                    <div className="pointer-events-none absolute inset-0 opacity-60">
                        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#6fd5cc]/35 blur-3xl" />
                        <div className="absolute -right-16 top-28 h-64 w-64 rounded-full bg-[#d7b55a]/25 blur-3xl" />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    <div className="web-medium-container relative pb-14 md:pb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            className="max-w-4xl"
                        >
                            <span className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-5 py-2 hero-sub-title text-[#e8ecef]">
                                <Images className="h-4 w-4 text-[#7de5dd]" />
                                VISUAL STORIES
                            </span>
                            <h1 className="hero-title text-white">
                                Project Moments,
                                <span className="block text-[#7de5dd]">Captured with Intent</span>
                            </h1>
                            <p className="mt-6 max-w-2xl hero-description text-white/75">
                                Browse development milestones, office culture, and on-site progress from across our portfolio.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="bg-light py-8 md:py-10">
                    <div className="web-medium-container">
                        <div className="rounded-2xl border border-black/10 bg-white p-3 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => {
                                    const isActive = selectedCategory === category.value;
                                    const count = category.value === 'all' ? galleryImages.length : categoryCount(category.value);

                                    return (
                                        <button
                                            key={category.value}
                                            type="button"
                                            onClick={() => setSelectedCategory(category.value)}
                                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm tracking-wide transition-all ${isActive
                                                ? 'bg-[#1a1a1a] text-white shadow-[0_12px_28px_rgba(15,23,42,0.22)]'
                                                : 'bg-[#f4f1e9] text-[#1f252d] hover:bg-[#eae5d9]'
                                                }`}
                                        >
                                            <span>{category.label}</span>
                                            <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-black/70'}`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-light pb-20">
                    <div className="web-medium-container">
                        {filteredImages.length ? (
                            <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {filteredImages.map((image, index) => (
                                    <motion.button
                                        key={image.id}
                                        type="button"
                                        onClick={() => openLightbox(index)}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.45, delay: index * 0.04 }}
                                        className={`group relative overflow-hidden rounded-2xl border border-black/10 text-left ${tileClassByIndex[index % tileClassByIndex.length]}`}
                                    >
                                        <img
                                            src={image.image_url}
                                            alt={image.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-95" />
                                        <div className="absolute inset-0 border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <div className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/30 p-2 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            <Expand className="h-4 w-4" />
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 p-4">
                                            <span className="inline-flex rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#f4f8fb]">
                                                {prettyCategory(image.category)}
                                            </span>
                                            <p className="mt-3 text-lg leading-tight text-white">{image.title}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-black/20 bg-white p-10 text-center">
                                <Grid3X3 className="mx-auto h-10 w-10 text-black/35" />
                                <h3 className="mt-4 text-2xl font-light text-[#20262f]">No images in this category</h3>
                                <p className="mt-2 text-[#20262f]/65">Choose another filter to view more project visuals.</p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-[#131418] py-14">
                    <div className="web-medium-container">
                        <div className="rounded-3xl border border-white/15 bg-[linear-gradient(115deg,#22252d_0%,#16181d_45%,#111318_100%)] p-8 md:p-12">
                            <p className="section-sub-title text-[#7de5dd]">Need a guided walkthrough?</p>
                            <h2 className="mt-3 section-title text-white">Book a visit and explore plots in person.</h2>
                            <p className="mt-4 max-w-2xl card-description-big text-white/70">
                                Our consultants can arrange site tours, project comparisons, and price details tailored to your investment goals.
                            </p>
                            <div className="mt-8">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center rounded-full border border-[#7de5dd]/55 bg-[#7de5dd]/10 px-6 py-3 text-sm tracking-[0.14em] text-[#8ae9e2] transition-all hover:border-[#7de5dd] hover:bg-[#7de5dd]/18 hover:text-white"
                                >
                                    GET IN TOUCH
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <AnimatePresence>
                {lightboxIndex !== null && currentImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 px-4 pt-20"
                        onClick={closeLightbox}
                    >
                        <button
                            type="button"
                            onClick={closeLightbox}
                            className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 p-2 text-white/85 transition-colors hover:text-white md:right-8 md:top-8"
                            aria-label="Close gallery image"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-3 rounded-full border border-white/20 bg-black/40 p-2 text-white/85 transition-colors hover:text-white md:left-8"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-7 w-7" />
                        </button>

                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-3 rounded-full border border-white/20 bg-black/40 p-2 text-white/85 transition-colors hover:text-white md:right-8"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-7 w-7" />
                        </button>

                        <motion.div
                            key={currentImage.id}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-6xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                                <img
                                    src={currentImage.image_url}
                                    alt={currentImage.title}
                                    className="max-h-[72vh] w-full object-contain"
                                />
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
                                <div>
                                    <p className="text-xl font-light text-white">{currentImage.title}</p>
                                    <p className="mt-1 text-sm text-white/60">
                                        {prettyCategory(currentImage.category)} | {lightboxIndex + 1} / {filteredImages.length}
                                    </p>
                                </div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Use arrow keys</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </WebLayout>
    );
}
