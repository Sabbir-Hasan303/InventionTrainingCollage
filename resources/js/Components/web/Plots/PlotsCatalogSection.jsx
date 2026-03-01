import React, { useEffect, useRef, useState } from 'react';
import PlotsFiltersSidebar from './PlotsFiltersSidebar';
import PlotsResultsSection from './PlotsResultsSection';

export default function PlotsCatalogSection({
    filters,
    locationOptions,
    propertyTypeOptions,
    purposeOptions,
    amenityOptions,
    onFilterChange,
    onClearFilters,
    filteredPlots,
    viewMode,
    onViewModeChange,
    cardMotion,
}) {
    const PIN_TOP = 112;
    const sectionRef = useRef(null);
    const leftTrackRef = useRef(null);
    const leftPanelRef = useRef(null);
    const [pinMode, setPinMode] = useState('static');
    const [fixedRect, setFixedRect] = useState({ left: 0, width: 0 });
    const [panelHeight, setPanelHeight] = useState(0);

    useEffect(() => {
        const isDesktop = window.innerWidth >= 1280;
        if (!isDesktop) {
            setPinMode('static');
            return undefined;
        }

        const updatePinnedPanel = () => {
            const sectionEl = sectionRef.current;
            const leftTrackEl = leftTrackRef.current;
            const leftPanelEl = leftPanelRef.current;
            if (!sectionEl || !leftTrackEl || !leftPanelEl) return;

            const trackRect = leftTrackEl.getBoundingClientRect();
            const measuredHeight = leftPanelEl.offsetHeight;
            const roundedLeft = Math.round(trackRect.left);
            const roundedWidth = Math.round(trackRect.width);
            const nextHeight = Math.round(measuredHeight);

            setFixedRect((prev) => {
                if (prev.left === roundedLeft && prev.width === roundedWidth) return prev;
                return { left: roundedLeft, width: roundedWidth };
            });

            setPanelHeight((prev) => (prev === nextHeight ? prev : nextHeight));

            const sectionRect = sectionEl.getBoundingClientRect();
            const sectionTopDoc = window.scrollY + sectionRect.top;
            const sectionBottomDoc = sectionTopDoc + sectionEl.offsetHeight;
            const scrollY = window.scrollY;

            let nextMode = 'fixed';
            if (scrollY + PIN_TOP <= sectionTopDoc) {
                nextMode = 'static';
            } else if (scrollY + PIN_TOP + measuredHeight >= sectionBottomDoc) {
                nextMode = 'bottom';
            }

            setPinMode((prev) => (prev === nextMode ? prev : nextMode));
        };

        updatePinnedPanel();
        window.addEventListener('scroll', updatePinnedPanel, { passive: true });
        window.addEventListener('resize', updatePinnedPanel);

        return () => {
            window.removeEventListener('scroll', updatePinnedPanel);
            window.removeEventListener('resize', updatePinnedPanel);
        };
    }, [filteredPlots.length, viewMode]);

    const panelStyle =
        pinMode === 'fixed'
            ? {
                  position: 'fixed',
                  top: `${PIN_TOP}px`,
                  left: `${fixedRect.left}px`,
                  width: `${fixedRect.width}px`,
                  zIndex: 40,
              }
            : pinMode === 'bottom'
            ? {
                  position: 'absolute',
                  left: '0px',
                  bottom: '0px',
                  width: '100%',
              }
            : {
                  position: 'relative',
                  width: '100%',
              };

    return (
        <section ref={sectionRef} className="relative pb-16 pt-10">
            <div className="web-giant-container">
                <div className="grid items-start gap-8 xl:grid-cols-[360px_1fr]">
                    <div
                        ref={leftTrackRef}
                        className="relative"
                        style={{ minHeight: panelHeight > 0 ? `${panelHeight}px` : undefined }}
                    >
                        <div ref={leftPanelRef} style={panelStyle}>
                            <PlotsFiltersSidebar
                                filters={filters}
                                locationOptions={locationOptions}
                                propertyTypeOptions={propertyTypeOptions}
                                purposeOptions={purposeOptions}
                                amenityOptions={amenityOptions}
                                onFilterChange={onFilterChange}
                                onClearFilters={onClearFilters}
                            />
                        </div>
                    </div>

                    <PlotsResultsSection
                        filteredPlots={filteredPlots}
                        viewMode={viewMode}
                        onViewModeChange={onViewModeChange}
                        cardMotion={cardMotion}
                    />
                </div>
            </div>
        </section>
    );
}
