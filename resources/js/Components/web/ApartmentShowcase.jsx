import React from 'react'
import InfiniteScrolling from '@/Components/gsap_animation/InfiniteScrolling';

const apartmentShowcase = [
    {
        image: 'https://images.unsplash.com/photo-1460317442991-0ec209e9f5f1?w=1200&q=80',
        title: 'The Imperium Eskaton',
        subtitle: 'Apartment Tower',
    },
    {
        image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80',
        title: 'Bay Icon Hotel & Resort',
        subtitle: 'Hospitality',
    },
    {
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
        title: 'Skyline Meridian Tower',
        subtitle: 'High-Rise',
    },
    {
        image: 'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=1200&q=80',
        title: 'Maple Heights Residence',
        subtitle: 'Urban Living',
    },
    {
        image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&q=80',
        title: 'Bay Crest Residences',
        subtitle: 'Residential Block',
    },
    {
        image: 'https://images.unsplash.com/photo-1462396240927-52058a6a84ec?w=1200&q=80',
        title: 'Landmark Nine Tower',
        subtitle: 'Mixed-Use',
    },
    {
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
        title: 'Portside Commerce Center',
        subtitle: 'Office & Hotel',
    },
];

export default function ApartmentShowcase() {
    return (
        <section className="bg-dark">
            <InfiniteScrolling
                infinite={false}
                cards={apartmentShowcase}
                showControls={false}
                eyebrow="Apartments & Hospitality"
                title="Built Spaces For Modern City Life"
                description="Explore our apartment towers, residences, and hotel projects crafted for premium urban living."
                cardSizeClass="w-64 sm:w-72 md:w-72 lg:w-80"
                cardAspectClass="aspect-[7/9]"
            />
        </section>
    )
}
