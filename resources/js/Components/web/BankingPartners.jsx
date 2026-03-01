import React from 'react'
import InfiniteSlider from '@/Components/gsap_animation/InfiniteSlider';

const bankPartners = ['DBBL', 'BRAC BANK', 'EASTERN BANK', 'CITY BANK', 'PRIME BANK', 'UCBL', 'MTBL', 'IFIC BANK'];

export default function BankingPartners() {
    return (
        <section className="py-24 bg-[#0A0A0A] border-y border-white/5">
            <div className="max-w-[1800px] mx-auto px-8">
                <div className="text-center mb-16">
                    <span className="text-white/40 text-sm tracking-[0.3em] uppercase font-light">FINANCING PARTNERS</span>
                </div>
                <InfiniteSlider items={bankPartners.map((p, i) => (
                    <div key={i} className="text-4xl md:text-5xl font-light text-white/30 hover:text-white/60 transition-colors px-16">{p}</div>
                ))} speed={40} />
            </div>
        </section>
    )
}
