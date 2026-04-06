import React from 'react'
import WebLayout from '@/Layouts/WebLayout';
import CTA from '@/Components/web/CTA';
import HomeHero from '@/Components/web/Home/Hero';
import Categories from '@/Components/web/Home/Categories';
import WhyChoose from '@/Components/web/Home/WhyChoose';
import AllCourses from '@/Components/web/Home/AllCourses';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <WebLayout>
            <Head title="Home" />
            <HomeHero />
            <Categories />
            <AllCourses />
            <WhyChoose />
            <CTA />
        </WebLayout>
    )
}


