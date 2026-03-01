import React from 'react'
import SplitText from '@/Components/gsap_animation/SplitText';
import InfiniteCardSlider from '@/Components/gsap_animation/InfiniteCardSlider';
import { Button } from '@mui/material';
import { Link } from '@inertiajs/react';

const availablePlots = [
    { image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', title: 'Plot A-101', location: 'Dhaka-Mawa Expressway', size: '5 Katha', price: '৳75 Lac' },
    { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', title: 'Plot B-205', location: 'Srinagar, Munshiganj', size: '3 Katha', price: '৳52 Lac' },
    { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', title: 'Plot C-301', location: 'Gazipur Chowrasta', size: '7 Katha', price: '৳1.2 Cr' },
    { image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', title: 'Plot D-402', location: 'Padma Bridge Area', size: '4 Katha', price: '৳68 Lac' },
    { image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80', title: 'Plot E-503', location: 'Purbachal New Town', size: '6 Katha', price: '৳2.1 Cr' },
  ];

export default function AvailablePlots() {
    return (
        <section className="py-32 bg-[#242424]">
            <div className="mb-20 text-center px-8">
                <span className="text-white/40 text-sm tracking-[0.3em] uppercase font-light">READY TO BOOK</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mt-6">
                    <SplitText>Available Plots</SplitText>
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-light mt-6">Premium locations, verified titles</p>
            </div>
            <InfiniteCardSlider cards={availablePlots} />
            <div className="text-center mt-16 px-8">
                <Link href="#">
                    <Button variant="contained" size="large" className="bg-[#4ECDC4] hover:bg-[#3db8ad] text-black rounded-full px-12 py-5 text-xl">
                        VIEW ALL PLOTS
                    </Button>
                </Link>
            </div>
        </section>
    )
}
