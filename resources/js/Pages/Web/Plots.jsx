import React, { useMemo, useState } from 'react';
import WebLayout from '@/Layouts/WebLayout';
import PlotsHeroSection from '@/Components/web/Plots/PlotsHeroSection';
import PlotsCatalogSection from '@/Components/web/Plots/PlotsCatalogSection';
import { initialPlotFilters, plotsData } from '@/Components/web/Plots/plotsData';

const cardMotion = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

function buildOptions(items) {
    return [{ value: 'all', title: 'All' }, ...items.map((item) => ({ value: item, title: item }))];
}

export default function Plots() {
    const [viewMode, setViewMode] = useState('list');
    const [filters, setFilters] = useState(initialPlotFilters);

    const locationOptions = useMemo(() => buildOptions([...new Set(plotsData.map((plot) => plot.location))]), []);
    const propertyTypeOptions = useMemo(
        () => buildOptions([...new Set(plotsData.map((plot) => plot.propertyType))]),
        []
    );
    const purposeOptions = useMemo(() => buildOptions([...new Set(plotsData.map((plot) => plot.purpose))]), []);
    const amenityOptions = useMemo(
        () => buildOptions([...new Set(plotsData.flatMap((plot) => plot.amenities))]),
        []
    );

    const filteredPlots = useMemo(() => {
        const keyword = filters.keyword.trim().toLowerCase();

        return plotsData.filter((plot) => {
            const matchesKeyword =
                !keyword ||
                [plot.title, plot.categoryLabel, plot.location, plot.benefit].join(' ').toLowerCase().includes(keyword);
            const matchesLocation = filters.location === 'all' || plot.location === filters.location;
            const matchesPropertyType = filters.propertyType === 'all' || plot.propertyType === filters.propertyType;
            const matchesPurpose = filters.purpose === 'all' || plot.purpose === filters.purpose;
            const matchesAmenity =
                filters.amenity === 'all' ||
                plot.amenities.some((amenity) => amenity.toLowerCase().includes(filters.amenity.toLowerCase()));

            return matchesKeyword && matchesLocation && matchesPropertyType && matchesPurpose && matchesAmenity;
        });
    }, [filters]);

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters(initialPlotFilters);
    };

    return (
        <WebLayout>
            <div className="relative bg-light overflow-hidden">
                <div className="pointer-events-none absolute -left-36 top-24 h-96 w-96 rounded-full bg-[#2FA89D]/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-24 top-[420px] h-80 w-80 rounded-full bg-[#c99855]/12 blur-3xl" />

                <PlotsHeroSection />
                <PlotsCatalogSection
                    filters={filters}
                    locationOptions={locationOptions}
                    propertyTypeOptions={propertyTypeOptions}
                    purposeOptions={purposeOptions}
                    amenityOptions={amenityOptions}
                    onFilterChange={updateFilter}
                    onClearFilters={clearFilters}
                    filteredPlots={filteredPlots}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    cardMotion={cardMotion}
                />
            </div>
        </WebLayout>
    );
}
