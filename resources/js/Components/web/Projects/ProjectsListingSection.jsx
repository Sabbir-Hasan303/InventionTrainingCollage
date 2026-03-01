import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';
import {
    ArrowUpRight,
    Bath,
    BedDouble,
    Grid3X3,
    List,
    MapPin,
    MapPinned,
    Ruler,
    X,
} from 'lucide-react';
import MenuDropdown from '@/Components/others_animation/MenuDropdown';
import ProjectsLocationMap from './ProjectsLocationMap';

const DEFAULT_CAL_LINK = 'sabbir303/15min';
const CAL_NAMESPACE = '15min';

function CalPopupButton({ className = '', onClick, children }) {
    const calLink = import.meta.env.VITE_CAL_COM_LINK || DEFAULT_CAL_LINK;
    const calConfig = JSON.stringify({
        layout: 'month_view',
        useSlotsViewOnSmallScreens: true,
        theme: 'light',
    });

    return (
        <button
            type="button"
            data-cal-namespace={CAL_NAMESPACE}
            data-cal-link={calLink}
            data-cal-config={calConfig}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    );
}

export default function ProjectsListingSection({
    filteredProjects,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    cardMotion,
    statusClass,
    statusLabels,
    transactionLabels,
}) {
    const PIN_TOP = 112;
    const [activeProjectId, setActiveProjectId] = useState(filteredProjects[0]?.id || null);
    const [showDesktopMap, setShowDesktopMap] = useState(false);
    const [mobileMapProject, setMobileMapProject] = useState(null);
    const sectionRef = useRef(null);
    const leftTrackRef = useRef(null);
    const leftPanelRef = useRef(null);
    const [pinMode, setPinMode] = useState('static');
    const [fixedRect, setFixedRect] = useState({ left: 0, width: 0 });
    const [panelHeight, setPanelHeight] = useState(0);

    useEffect(() => {
        (async () => {
            const cal = await getCalApi({ namespace: CAL_NAMESPACE });
            cal('ui', {
                theme: 'light',
                hideEventTypeDetails: false,
                layout: 'month_view',
                cssVarsPerTheme: {
                    light: { 'cal-brand': '#292929' },
                    dark: { 'cal-brand': '#fafafa' },
                },
            });
        })();
    }, []);

    useEffect(() => {
        if (!filteredProjects.length) {
            setActiveProjectId(null);
            setMobileMapProject(null);
            return;
        }

        const hasActiveProject = filteredProjects.some((project) => project.id === activeProjectId);
        if (!hasActiveProject) {
            setActiveProjectId(filteredProjects[0].id);
        }

        if (mobileMapProject && !filteredProjects.some((project) => project.id === mobileMapProject.id)) {
            setMobileMapProject(null);
        }
    }, [filteredProjects, activeProjectId, mobileMapProject]);

    const activeProject = useMemo(
        () => filteredProjects.find((project) => project.id === activeProjectId) || filteredProjects[0],
        [filteredProjects, activeProjectId]
    );

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
    }, [filteredProjects.length]);

    const panelStyle =
        pinMode === 'fixed'
            ? {
                  position: 'fixed',
                  top: `${PIN_TOP}px`,
                  left: `${fixedRect.left}px`,
                  width: `${fixedRect.width}px`,
                  zIndex: 30,
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

    const sortOptions = [
        { value: 'featured', title: 'Sort: Featured' },
        { value: 'price_high', title: 'Price: High to Low' },
        { value: 'price_low', title: 'Price: Low to High' },
        { value: 'availability', title: 'Availability' },
    ];

    const sortDropdownTheme = {
        triggerFrame: 'border-black/10 bg-white',
        triggerText: 'text-[#1f252d]',
        triggerPlaceholder: 'text-[#1f252d]/45',
        chevron: 'text-[#1f252d]/45',
        menuFrame: 'border-black/10 bg-white',
        optionTitle: 'text-[#1f252d]',
        optionTitleSelected: 'text-[#0f3f38]',
        optionDescription: 'text-[#1f252d]/60',
        optionSelectedBg: 'bg-[#0f3f38]/10',
        optionHoverBg: 'hover:bg-[#0f3f38]/[0.06] focus-visible:bg-[#0f3f38]/[0.06]',
    };

    return (
        <section ref={sectionRef} className="bg-light py-12 md:py-14">
            <div className="web-giant-container">
                <div className="grid gap-8 xl:grid-cols-[360px_1fr]">
                    <div ref={leftTrackRef} className="relative hidden xl:block" style={{ minHeight: panelHeight > 0 ? `${panelHeight}px` : undefined }}>
                        <aside ref={leftPanelRef} style={panelStyle}>
                            <div className="overflow-hidden rounded-[30px] border border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#f5f4ef_100%)] shadow-[0_22px_48px_rgba(15,23,42,0.14)]">
                                <div className="space-y-4 p-5">
                                    <div className="rounded-2xl border border-[#0f3f38]/20 bg-[#0f3f38]/[0.07] p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="section-sub-title text-[#0f3f38]/80">Map Focus</p>
                                            {activeProject && (
                                                <span className="rounded-full border border-[#0f3f38]/20 bg-white/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#0f3f38]">
                                                    {transactionLabels[activeProject.transaction]}
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-2 card-title-sm text-[#122029]">
                                            {activeProject?.title || 'No project selected'}
                                        </p>
                                        <p className="mt-2 flex items-center gap-2 card-description-sm text-[#1f252d]/75">
                                            <MapPin className="h-4 w-4 text-[#2FA89D]" />
                                            {activeProject?.location || 'Select a project to preview location'}
                                        </p>
                                        {activeProject && (
                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                <span className="rounded-full border border-black/10 bg-white/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#1f252d]/70">
                                                    {activeProject.availablePlots} / {activeProject.totalPlots} plots
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {showDesktopMap && filteredProjects.length > 0 && (
                                        <div className="relative h-[320px] overflow-hidden rounded-2xl border border-black/10">
                                            <ProjectsLocationMap projects={filteredProjects} activeProjectId={activeProject?.id} />
                                            <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                                                Live Tracking
                                            </div>
                                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent">
                                                <p className="absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.2em] text-white/85">
                                                    Active Location
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <CalPopupButton className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111317] px-4 py-3 text-xs tracking-[0.15em] text-white shadow-[0_12px_24px_rgba(17,24,39,0.25)] transition-all hover:-translate-y-0.5 hover:bg-black">
                                        BOOK 15 MIN CALL
                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </CalPopupButton>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <div>
                        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="section-sub-title text-[#6e5d2e]">Discover</p>
                                <h2 className="mt-1 card-title-sm text-[#1d1f22]">Our Properties</h2>
                                <p className="mt-2 card-description-sm text-[#1d1f22]/70">Showing {filteredProjects.length} results</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <div className="inline-flex rounded-xl border border-black/10 bg-white p-1">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('grid')}
                                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                                            viewMode === 'grid' ? 'bg-[#1a1a1a] text-white' : 'text-[#1f252d]/65 hover:bg-[#f1eee6]'
                                        }`}
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('list')}
                                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                                            viewMode === 'list' ? 'bg-[#1a1a1a] text-white' : 'text-[#1f252d]/65 hover:bg-[#f1eee6]'
                                        }`}
                                    >
                                        <List className="h-4 w-4" />
                                    </button>
                                </div>

                                <MenuDropdown
                                    value={sortBy}
                                    onChange={(nextValue) => setSortBy(nextValue)}
                                    options={sortOptions}
                                    label="Sort Projects"
                                    name="sort-filter"
                                    placeholder="Sort: Featured"
                                    showTriggerIcon={false}
                                    showOptionIcon={false}
                                    size="md"
                                    theme={sortDropdownTheme}
                                    className="!w-auto min-w-[180px] max-w-none"
                                    labelClassName="sr-only mb-0"
                                    triggerClassName="h-11 rounded-xl pr-10 text-sm shadow-none"
                                    menuClassName="rounded-xl p-1.5"
                                    optionClassName="rounded-lg"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowDesktopMap((prev) => !prev)}
                                    disabled={!filteredProjects.length}
                                    className={`hidden h-11 items-center gap-2 rounded-xl border px-4 text-sm transition-colors xl:inline-flex ${
                                        filteredProjects.length
                                            ? showDesktopMap
                                                ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                                                : 'border-black/10 bg-white text-[#1f252d]/75 hover:border-[#1f252d]/30'
                                            : 'cursor-not-allowed border-black/10 bg-white text-[#1f252d]/35'
                                    }`}
                                >
                                    <MapPinned className="h-4 w-4" />
                                    Map View
                                </button>
                            </div>
                        </div>

                        {filteredProjects.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-black/20 bg-white p-10 text-center">
                                <h3 className="text-2xl font-light text-[#1d1f22]">No projects found</h3>
                                <p className="mt-2 text-[#1d1f22]/60">Try changing filters or search terms.</p>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredProjects.map((project, index) => (
                                    <motion.article
                                        key={project.id}
                                        variants={cardMotion}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.45, delay: index * 0.03 }}
                                        onMouseEnter={() => setActiveProjectId(project.id)}
                                        onFocusCapture={() => setActiveProjectId(project.id)}
                                        onClick={(event) => {
                                            if (event.target.closest('a,button')) return;
                                            router.visit(`/projects/${project.slug}`);
                                        }}
                                        className="group cursor-pointer overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)]"
                                    >
                                        <Link href={`/projects/${project.slug}`}>
                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                <img
                                                    src={project.heroImage}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                                                    {project.featured && (
                                                        <span className="rounded-full bg-[#7de5dd]/95 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#113532]">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="absolute right-3 top-3 rounded-full bg-[#c99855] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white">
                                                    {transactionLabels[project.transaction]}
                                                </span>
                                            </div>
                                        </Link>

                                        <div className="p-4">
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="card-title-sm text-[#11161d] transition-colors hover:text-[#2FA89D]"
                                            >
                                                {project.title}
                                            </Link>
                                            <p className="mt-2 line-clamp-2 card-description-sm text-[#11161d]/66">{project.description}</p>
                                            <p className="mt-3 flex items-center gap-2 card-description-sm text-[#11161d]/70">
                                                <MapPin className="h-4 w-4 text-[#2FA89D]" />
                                                {project.location}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setMobileMapProject(project);
                                                }}
                                                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-black/10 bg-[#f8f6f0] px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#1f252d]/75 xl:hidden"
                                            >
                                                <MapPinned className="h-3.5 w-3.5" />
                                                Map View
                                            </button>

                                            {/* <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-black/10 bg-[#f8f6f0] p-3 text-[12px] text-[#11161d]/75">
                                                <span className="flex items-center gap-1.5">
                                                    <BedDouble className="h-3.5 w-3.5" />
                                                    {project.bedrooms}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Bath className="h-3.5 w-3.5" />
                                                    {project.bathrooms}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Ruler className="h-3.5 w-3.5" />
                                                    {project.sizeSqft} ft2
                                                </span>
                                            </div> */}

                                            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 gap-4">
                                                <p className="card-description-big text-[#1d1f22]">{project.priceLabel}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs uppercase tracking-[0.14em] text-[#1d1f22]/55">
                                                        {project.availablePlots} / {project.totalPlots} available
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {filteredProjects.map((project, index) => (
                                    <motion.article
                                        key={project.id}
                                        variants={cardMotion}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.45, delay: index * 0.03 }}
                                        onMouseEnter={() => setActiveProjectId(project.id)}
                                        onFocusCapture={() => setActiveProjectId(project.id)}
                                        onClick={(event) => {
                                            if (event.target.closest('a,button')) return;
                                            router.visit(`/projects/${project.slug}`);
                                        }}
                                        className="cursor-pointer overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                                    >
                                        <div className="grid gap-0 lg:grid-cols-[330px_1fr]">
                                            <Link href={`/projects/${project.slug}`} className="relative h-full min-h-[240px] overflow-hidden">
                                                <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                                                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                                                    {project.featured && (
                                                        <span className="rounded-full bg-[#7de5dd]/95 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#113532]">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>

                                            <div className="p-6">
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <div>
                                                        <p className="section-sub-title text-[#6e5d2e]">
                                                            {project.type} | {transactionLabels[project.transaction]}
                                                        </p>
                                                        <Link
                                                            href={`/projects/${project.slug}`}
                                                            className="mt-2 inline-block card-title-big text-[#11161d] transition-colors hover:text-[#2FA89D]"
                                                        >
                                                            {project.title}
                                                        </Link>
                                                    </div>
                                                    <p className="rounded-full border border-black/10 bg-[#f8f6f0] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#11161d]/70">
                                                        {project.availablePlots} Available
                                                    </p>
                                                </div>

                                                <p className="mt-3 max-w-3xl card-description-sm text-[#11161d]/68">{project.description}</p>
                                                <p className="mt-3 flex items-center gap-2 card-description-sm text-[#11161d]/70">
                                                    <MapPin className="h-4 w-4 text-[#2FA89D]" />
                                                    {project.location}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setMobileMapProject(project);
                                                    }}
                                                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-black/10 bg-[#f8f6f0] px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#1f252d]/75 xl:hidden"
                                                >
                                                    <MapPinned className="h-3.5 w-3.5" />
                                                    Map View
                                                </button>

                                                {/* <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-black/10 bg-[#f8f6f0] p-3 text-sm text-[#11161d]/75 sm:max-w-md">
                                                    <span className="flex items-center gap-2">
                                                        <BedDouble className="h-4 w-4" /> {project.bedrooms} Bedrooms
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Bath className="h-4 w-4" /> {project.bathrooms} Baths
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Ruler className="h-4 w-4" /> {project.sizeSqft} ft2
                                                    </span>
                                                </div> */}

                                                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-4">
                                                    <p className="card-description-big text-[#1d1f22]">{project.priceLabel}</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="section-sub-title text-[#1d1f22]/55">
                                                            {project.totalPlots} Total Plots
                                                        </span>
                                                        <Link
                                                            href={`/projects/${project.slug}`}
                                                            className="inline-flex items-center gap-1 rounded-lg border border-black/10 bg-[#f8f6f0] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[#1d252d]/80 transition-colors hover:bg-[#ece8dc]"
                                                        >
                                                            Details
                                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {mobileMapProject && (
                <div className="fixed inset-0 z-[80] xl:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMapProject(null)}
                        className="absolute inset-0 bg-black/55"
                        aria-label="Close map popup"
                    />

                    <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border border-black/10 bg-white p-4 shadow-[0_-20px_45px_rgba(15,23,42,0.28)]">
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.16em] text-[#6e5d2e]">Map View</p>
                                <h3 className="mt-1 text-xl font-light text-[#11161d]">{mobileMapProject.title}</h3>
                                <p className="mt-1 flex items-center gap-2 text-sm text-[#11161d]/70">
                                    <MapPin className="h-4 w-4 text-[#2FA89D]" />
                                    {mobileMapProject.location}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileMapProject(null)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-[#1f252d]"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="h-72 overflow-hidden rounded-2xl border border-black/10">
                            <ProjectsLocationMap projects={filteredProjects} activeProjectId={mobileMapProject.id} />
                        </div>

                        <CalPopupButton
                            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#1a1a1a] px-4 py-3 text-xs tracking-[0.15em] text-white transition-colors hover:bg-black"
                        >
                            BOOK 15 MIN CALL
                        </CalPopupButton>
                    </div>
                </div>
            )}
        </section>
    );
}
