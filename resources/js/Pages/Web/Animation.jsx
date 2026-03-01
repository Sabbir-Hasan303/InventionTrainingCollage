import React from 'react'
import WebLayout from '@/Layouts/WebLayout';
import GsapGallery from '@/Components/gsap_animation/GsapGallery';
import Layers from '@/Components/gsap_animation/Layers';
// import ImagePanel from '@/Components/web/ImagePanel';
import AppleLightEffect from '@/Components/gsap_animation/AppleLightEffect';
import EnergyScene from '@/Components/gsap_animation/EnergyScene';
import ImageScaleSection from '@/Components/gsap_animation/ImageScaleSection';
import ScreenSlider from '@/Components/gsap_animation/ScreenSlider';
import VerticalSlider from '@/Components/gsap_animation/VerticalSlider';
import CursorTube from '@/Components/framer/CursorTube';
import Event from '@/Components/event/Event';
import Expedition from '@/Components/scrollytelling/Expedition';
import HorizontalTree from '@/Components/framer/HorizontalTree';
import ShiftLayout from '@/Components/framer/ShiftLayout';
import FolderStructure from '@/Components/framer/FolderStructure';
import Testimonials from '@/Components/framer/Testimonials';
import ContentWave from '@/Components/gsap_animation/ContentWave';
import ImageMap from '@/Components/framer/ImageMap';
import HorizontalTweenModal from '@/Components/gsap_animation/HorizontalTweenModal';
import ImageRevealHorizontal from '@/Components/gsap_animation/ImageRevealHorizontal';
import OurStoryTimeline from '@/Components/framer/OurStory/OurStoryTimeline';
import GridView from '@/Components/gsap_animation/GridView';
import InfiniteScrolling from '@/Components/gsap_animation/InfiniteScrolling';
import Glass_Carousel from '@/Components/others_animation/Glass_Carousel';
import ProductivitySlider from '@/Components/others_animation/ProductivitySlider';
import ImageCarousel3D from '@/Components/gsap_animation/ImageCarousel3D';

export default function Animation() {
    return (
        <WebLayout>
            <div className='mt-20'>
                <OurStoryTimeline />
            </div>
            <ImageCarousel3D />
            <ProductivitySlider />
            <InfiniteScrolling infinite={false} />
            {/* <InfiniteScrolling scroll={false} />  */}
            <Glass_Carousel />
            <GridView />
            <ImageMap />
            <GsapGallery />
            <Layers />
            {/* <ImagePanel /> */}
            <EnergyScene />
            <ImageScaleSection />
            <ScreenSlider />
            <VerticalSlider />
            <AppleLightEffect />
            <CursorTube />
            <Event />
            <Expedition />
            <HorizontalTree />
            <ShiftLayout />
            <FolderStructure />
            <Testimonials />
            <ContentWave />
            <HorizontalTweenModal />
            <ImageRevealHorizontal />
        </WebLayout>
    )
}
