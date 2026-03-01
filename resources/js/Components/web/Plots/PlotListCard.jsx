import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
// import PlotRating from './PlotRating';
import { DEFAULT_QR_URL, DEFAULT_YOUTUBE_URL } from './plotsData';
import { YouTube } from '@mui/icons-material';

export default function PlotListCard({ plot, index, cardMotion }) {
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
            className="group overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(15,23,42,0.12)]"
        >
            <div className="grid gap-0 lg:grid-cols-[44%_56%]">
                <div className="relative min-h-[250px] overflow-hidden p-4">
                    <div className="h-full overflow-hidden rounded-2xl">
                        <img
                            src={plot.image}
                            alt={plot.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="flex flex-col p-5 pt-4 lg:p-6">
                    <div className="flex md:items-end md:justify-end gap-4">
                        <img
                            src={qrSrc}
                            alt={`QR code for ${plot.title}`}
                            className="h-[72px] w-[72px] rounded-lg border border-black/10 bg-white p-1"
                        />
                    </div>

                    {/* <PlotRating value={plot.rating} /> */}

                    <div className="mt-3">
                        <p className="text-sm leading-3 lg:leading-[22.3906px] tracking-[1.4851px] uppercase font-semibold text-[#6e5d2e]">{plot.categoryLabel}</p>
                        <h3 className="mt-2 card-title-big text-[#11161d]">{plot.title}</h3>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[#1f252d]/78">
                        <span className="card-description-sm">{plot.katha}</span>
                        <span className="hidden text-black/20 sm:inline">|</span>
                        <span className="card-description-sm">{plot.benefit}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
                        <div className="inline-flex items-center gap-1.5 card-description-sm text-[#1f252d]/72">
                            <MapPin className="h-4 w-4 text-[#2FA89D]" />
                            {plot.location}
                        </div>
                        <p className="card-description-big text-[#c99855] m-0">{plot.priceLabel}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
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
            </div>
        </motion.article>
    );
}
