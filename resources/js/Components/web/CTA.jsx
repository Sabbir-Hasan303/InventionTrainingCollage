import React from 'react'
import SplitText from '@/Components/gsap_animation/SplitText';
import { Button } from '@mui/material';
import { Link } from '@inertiajs/react';
import { Phone } from '@mui/icons-material';

export default function CTA() {
    return (
        <section className="py-32 md:py-40 bg-gradient-to-b from-[#242424] to-[#161719]">
            <div className="max-w-5xl mx-auto px-8 text-center">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-8">
                    <SplitText>Start Your Investment Journey</SplitText>
                </h3>
                <p className="text-xl md:text-2xl text-white/60 mb-16 font-light">
                    Schedule a free consultation with our property experts today
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="#">
                        <Button variant="contained" size="large" className="bg-[#4ECDC4] hover:bg-[#3db8ad] text-black rounded-full px-14 py-6 text-xl font-medium">
                            BOOK CONSULTATION
                        </Button>
                    </Link>
                    <a href="tel:+8801742122765">
                        <Button variant="outlined" size="large" startIcon={<Phone />} className="border-2 border-white text-white hover:bg-white/10 rounded-full px-14 py-6 text-xl font-light">
                            CALL NOW
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    )
}
