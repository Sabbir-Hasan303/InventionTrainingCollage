import React from 'react'
import Hero from '@/Components/web/Hero';
import WebLayout from '@/Layouts/WebLayout';
import Starts from '@/Components/web/Starts';
import AboutUs from '@/Components/web/AboutUs';
import FeaturedPlots from '@/Components/web/FeaturedPlots';
import FeaturedPlots2 from '@/Components/web/FeaturedPlots2';
import LandProjectsSection from '@/Components/web/LandProjects/LandProjectsSection';
// import WhyChoose from '@/Components/web/WhyChoose';
import ApartmentShowcase from '@/Components/web/ApartmentShowcase';
import AvailablePlots from '@/Components/web/AvailablePlots';
import Testimonial from '@/Components/web/Testimonial';
import BankingPartners from '@/Components/web/BankingPartners';
import CTA from '@/Components/web/CTA';
import Starts2 from '@/Components/web/Starts2';
import AboutCtaSection from '@/Components/web/About/AboutCtaSection';
import HomeHero from '@/Components/web/Home/Hero';
import Categories from '@/Components/web/Home/Categories';
import WhyChoose from '@/Components/web/Home/WhyChoose';

export default function Home() {
    return (
        <WebLayout>
            <HomeHero />
            <Categories />
            <WhyChoose />
        </WebLayout>
    )
}


