import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { YouTube } from '@mui/icons-material';
import { DEFAULT_QR_URL, DEFAULT_YOUTUBE_URL } from './plotsData';

export default function PlotGridCard({ plot, index, cardMotion }) {
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=88x88&data=${encodeURIComponent(
        plot.qrUrl || DEFAULT_QR_URL
    )}`;

    return (
        <motion.article
            variants={cardMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="group overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(15,23,42,0.11)]"
        >
            <div className="relative h-60 overflow-hidden">
                <img
                    src={plot.image}
                    alt={plot.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <p className="absolute left-3 top-3 rounded-full border border-white/35 bg-white/90 px-3 py-1 text-[11px] leading-3 tracking-[1.4851px] uppercase font-semibold text-[#6e5d2e]">
                    {plot.categoryLabel}
                </p>
                <img
                    src={qrSrc}
                    alt={`QR code for ${plot.title}`}
                    className="absolute bottom-3 right-3 h-[56px] w-[56px] rounded-lg border border-white/40 bg-white/95 p-1 shadow-[0_8px_20px_rgba(15,23,42,0.2)]"
                />
            </div>

            <div className="p-4">
                <div>
                    <h3 className="card-title-sm text-[#11161d]">{plot.title}</h3>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[#1f252d]/78">
                    <p className="flex items-center gap-1.5 card-description-sm text-[#1f252d]/72">
                    <MapPin className="h-4 w-4 text-[#2FA89D]" />
                    {plot.location}
                    <span className="hidden text-black/20 sm:inline">|</span>
                    <span className="card-description-sm">{plot.katha}</span>
                </p>
                </div>


                <span className="card-description-sm">{plot.benefit}</span>

                <p className="mt-2 card-description-big m-0 text-[#c99855]">{plot.priceLabel}</p>

                <div className="mt-4 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
                    <a
                        href={plot.youtubeUrl || DEFAULT_YOUTUBE_URL}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open YouTube video for ${plot.title}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-[#f8f6f0] text-[#d22f27] transition-colors hover:bg-[#eee9de]"
                    >
                        <YouTube className="h-5 w-5" />
                    </a>

                    <a
                        href={plot.detailsHref || '#'}
                        aria-label={`Open details for ${plot.title}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c99855]/50 text-[#c99855] transition-colors hover:bg-[#c99855]/10"
                    >
                        <ArrowRight className="h-4 w-4 plots-arrow-anim" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}
