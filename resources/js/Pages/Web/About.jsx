import React from 'react';
import WebLayout from '@/Layouts/WebLayout';
import AboutHeroSection from '@/Components/web/About/AboutHeroSection';
import AboutPillarsSection from '@/Components/web/About/AboutPillarsSection';
import AboutStatsSection from '@/Components/web/About/AboutStatsSection';
import AboutVideoSection from '@/Components/web/About/AboutVideoSection';
import AboutMissionVisionSection from '@/Components/web/About/AboutMissionVisionSection';
import AboutTimelineSection from '@/Components/web/About/AboutTimelineSection';
import AboutValuesSection from '@/Components/web/About/AboutValuesSection';
import AboutGallerySection from '@/Components/web/About/AboutGallerySection';
import AboutCtaSection from '@/Components/web/About/AboutCtaSection';
import AboutCommunitySection from '@/Components/web/About/AboutCommunitySection';
import AboutContactSection from '@/Components/web/About/AboutContactSection';

export default function About() {
    return (
        <WebLayout>
            <AboutHeroSection />
            <AboutMissionVisionSection />
            <AboutPillarsSection />
            <AboutCommunitySection />
            {/* <AboutStatsSection /> */}
            {/* <AboutVideoSection /> */}
            <AboutValuesSection />
            <AboutTimelineSection />
            <AboutContactSection />
            {/* <AboutGallerySection /> */}
            <AboutCtaSection />
        </WebLayout>
    );
}
