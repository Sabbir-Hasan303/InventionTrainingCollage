import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, PlayCircle, X } from 'lucide-react';

const VIDEO_EXT_REGEX = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

function toEmbedUrl(url = '') {
    if (!url) return '';
    if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split(/[?&]/)[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('vimeo.com/') && !url.includes('/video/')) {
        const videoId = url.split('vimeo.com/')[1]?.split(/[?&]/)[0];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    return url;
}

function isEmbedVideo(url = '') {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
}

function isFileVideo(url = '') {
    return VIDEO_EXT_REGEX.test(url);
}

function collectVideos(project) {
    const raw = [
        ...(Array.isArray(project.galleryVideos) ? project.galleryVideos : []),
        ...(project.videoUrl ? [project.videoUrl] : []),
        ...(project.video ? [project.video] : []),
    ].filter(Boolean);

    return [...new Set(raw)];
}

export default function ProjectDetailGallery({ project }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const images = useMemo(() => (project.galleryImages || []).map((src) => ({ type: 'image', src })), [project.galleryImages]);
    const videos = useMemo(() => collectVideos(project).map((src) => ({ type: 'video', src })), [project]);
    const mediaItems = useMemo(() => [...videos, ...images], [videos, images]);
    const previewItems = useMemo(() => mediaItems.slice(0, 3), [mediaItems]);
    const lastPreviewIndex = previewItems.length - 1;
    const whatsappNumber = useMemo(() => (project.agent?.phone || '').replace(/\D/g, ''), [project.agent?.phone]);

    useEffect(() => {
        if (activeIndex === null) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setActiveIndex(null);
            if (event.key === 'ArrowRight') setActiveIndex((prev) => (prev + 1) % mediaItems.length);
            if (event.key === 'ArrowLeft') setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeIndex, mediaItems.length]);

    if (!mediaItems.length) return null;

    return (
        <section className="rounded-[28px] border border-black/10 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.07)] sm:p-5">
            {/* <div className="mb-4 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => setActiveIndex(0)}
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-[#f8f6f0] px-3 py-2 text-xs tracking-[0.14em] text-[#1d252d]/75"
                >
                    <Expand className="h-3.5 w-3.5" />
                    VIEW ALL
                </button>
            </div> */}

            <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-2">
                {previewItems.map((item, index) => (
                    <button
                        type="button"
                        key={`${item.type}-${item.src}-${index}`}
                        onClick={() => setActiveIndex(index)}
                        className={`group relative overflow-hidden rounded-2xl border border-black/10 ${
                            index === 0
                                ? 'h-[260px] sm:h-[360px] lg:row-span-2 lg:h-[520px]'
                                : 'h-[170px] lg:h-[255px]'
                        }`}
                        aria-label={`Open gallery image ${index + 1}`}
                    >
                        {item.type === 'video' ? (
                            <div className="relative h-full w-full bg-[#111317]">
                                {isFileVideo(item.src) ? (
                                    <video src={item.src} className="h-full w-full object-cover" muted playsInline />
                                ) : (
                                    <img
                                        src={project.galleryImages?.[0]}
                                        alt={`${project.title} video`}
                                        className="h-full w-full object-cover opacity-70"
                                    />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/45 px-3 py-1.5 text-xs tracking-[0.12em] text-white">
                                        <PlayCircle className="h-4 w-4" />
                                        PLAY VIDEO
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <img
                                src={item.src}
                                alt={`${project.title} gallery ${index + 1}`}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t ${index === lastPreviewIndex ? 'from-black/70 via-black/35 to-black/10' : 'from-black/45 via-transparent to-transparent'}`} />
                        {index === lastPreviewIndex && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-base font-medium text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-lg">
                                    Show all {mediaItems.length} items
                                </p>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {activeIndex !== null && (
                <div className="fixed inset-0 z-[120]">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setActiveIndex(null)}
                        aria-label="Close image modal"
                    />
                    <div className="absolute left-1/2 top-1/2 w-[min(94vw,1420px)] -translate-x-1/2 -translate-y-1/2">
                        <div className="overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl xl:grid xl:grid-cols-[minmax(0,1fr)_350px]">
                            <div className="relative">
                                {mediaItems[activeIndex]?.type === 'video' ? (
                                    isFileVideo(mediaItems[activeIndex].src) ? (
                                        <video
                                            src={mediaItems[activeIndex].src}
                                            controls
                                            autoPlay
                                            className="h-[76vh] w-full bg-black object-contain xl:h-[82vh]"
                                        />
                                    ) : (
                                        <iframe
                                            src={toEmbedUrl(mediaItems[activeIndex].src)}
                                            title={`${project.title} video`}
                                            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                                            allowFullScreen
                                            className="h-[76vh] w-full bg-black xl:h-[82vh]"
                                        />
                                    )
                                ) : (
                                    <img
                                        src={mediaItems[activeIndex]?.src}
                                        alt={`${project.title} gallery ${activeIndex + 1}`}
                                        className="h-[76vh] w-full object-cover xl:h-[82vh]"
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex(null)}
                                    className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white"
                                    aria-label="Close"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                {mediaItems.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)}
                                            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex((prev) => (prev + 1) % mediaItems.length)}
                                            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </>
                                )}
                            </div>

                            <aside className="hidden bg-white p-6 xl:block">
                                <h3 className="text-[2rem] font-light leading-tight text-[#11161d]">{project.title}</h3>
                                <p className="mt-2 text-2xl font-light text-[#11161d]">Want to find out more?</p>

                                <form className="mt-4 space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#2FA89D]/65"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#2FA89D]/65"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#2FA89D]/65"
                                    />
                                    <textarea
                                        rows={4}
                                        defaultValue={`Hello,\nI'm interested in [ ${project.title} ]`}
                                        className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#2FA89D]/65"
                                    />
                                    <label className="flex items-start gap-2 text-xs leading-relaxed text-[#1d252d]/70">
                                        <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-black/20" />
                                        I consent to receive communications related to this property and can unsubscribe at any time.
                                    </label>
                                    <button
                                        type="button"
                                        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#111317] text-sm tracking-[0.08em] text-white transition-colors hover:bg-black"
                                    >
                                        Send
                                    </button>
                                    <div className="grid grid-cols-2 gap-2">
                                        <a
                                            href={`tel:${project.agent?.phone || ''}`}
                                            className="inline-flex h-11 items-center justify-center rounded-lg border border-black/20 text-sm text-[#11161d] transition-colors hover:bg-[#f5f3ee]"
                                        >
                                            Call
                                        </a>
                                        <a
                                            href={`https://wa.me/${whatsappNumber}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex h-11 items-center justify-center rounded-lg border border-black/20 text-sm text-[#11161d] transition-colors hover:bg-[#f5f3ee]"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                </form>
                            </aside>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
