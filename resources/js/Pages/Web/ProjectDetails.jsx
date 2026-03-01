import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';
import WebLayout from '@/Layouts/WebLayout';
import ProjectDetailHero from '@/Components/web/Projects/Detail/ProjectDetailHero';
import ProjectDetailSidebar from '@/Components/web/Projects/Detail/ProjectDetailSidebar';
import ProjectDetailGallery from '@/Components/web/Projects/Detail/ProjectDetailGallery';
import ProjectDetailOverview from '@/Components/web/Projects/Detail/ProjectDetailOverview';
import ProjectDetailMapSection from '@/Components/web/Projects/Detail/ProjectDetailMapSection';
import ProjectDetailBooking from '@/Components/web/Projects/Detail/ProjectDetailBooking';
import ProjectDetailFAQ from '@/Components/web/Projects/Detail/ProjectDetailFAQ';
import RelatedProjects from '@/Components/web/Projects/Detail/RelatedProjects';
import AmenitiesSection from '@/Components/web/Projects/Detail/AmenitiesSection';
import {
    getProjectBySlug,
    getRelatedProjects,
    statusClass,
    statusLabels,
    transactionLabels,
} from '@/Components/web/Projects/projectsData';

function PaymentSnapshot({ project }) {
    const paymentItems = Array.isArray(project?.paymentPlan) ? project.paymentPlan : [];
    const featureImage = project?.galleryImages?.[1] || project?.heroImage;

    return (
        <section className="my-14 overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="web-medium-container">
                <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                    <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#5f6a78]">Payment Plan Snapshot</p>
                        <h2 className="mt-3 text-[2rem] font-light leading-tight text-[#11161d]">Payment Plan & Value</h2>
                        <p className="mt-4 max-w-[56ch] text-[1.05rem] leading-8 text-[#2b3440]/86">
                            Choose a payment structure that matches your timeline. We keep the process transparent from booking to final handover,
                            with dedicated support at each stage.
                        </p>

                        <div className="mt-6 space-y-3">
                            {paymentItems.map((item) => (
                                <article key={item.label} className="rounded-xl border border-[#cad3df] bg-white/75 px-4 py-3">
                                    <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#5f6a78]">{item.label}</p>
                                    <p className="mt-1 text-base text-[#11161d]">{item.value}</p>
                                </article>
                            ))}
                        </div>

                        <p className="mt-5 rounded-xl border border-[#2FA89D]/30 bg-[#2FA89D]/[0.1] px-4 py-3 text-sm text-[#1d252d]/78">
                            Current availability: <span className="font-medium text-[#11161d]">{project.availablePlots} plots</span> from{' '}
                            <span className="font-medium text-[#11161d]">{project.totalPlots}</span> total inventory.
                        </p>
                    </div>

                    <div className="relative overflow-hidden rounded-[1.25rem] border border-[#cad3df] bg-[#d8dde6]">
                        {featureImage ? (
                            <img src={featureImage} alt={`${project.title} payment highlight`} className="h-[320px] w-full object-cover sm:h-[420px]" />
                        ) : (
                            <div className="flex h-[320px] w-full items-center justify-center text-sm text-[#5f6a78] sm:h-[420px]">Image unavailable</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function ProjectDetails({ slug }) {
    const PIN_TOP = 112;
    const project = useMemo(() => getProjectBySlug(slug), [slug]);
    const relatedProjects = useMemo(() => getRelatedProjects(slug, 3), [slug]);
    const [showMobileCta, setShowMobileCta] = useState(false);
    const sectionRef = useRef(null);
    const rightTrackRef = useRef(null);
    const rightPanelRef = useRef(null);
    const [pinMode, setPinMode] = useState('static');
    const [fixedRect, setFixedRect] = useState({ left: 0, width: 0 });
    const [panelHeight, setPanelHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setShowMobileCta(window.scrollY > 340);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const isDesktop = window.innerWidth >= 1280;
        if (!isDesktop) {
            setPinMode('static');
            return undefined;
        }

        const updatePinnedPanel = () => {
            const sectionEl = sectionRef.current;
            const rightTrackEl = rightTrackRef.current;
            const rightPanelEl = rightPanelRef.current;
            if (!sectionEl || !rightTrackEl || !rightPanelEl) return;

            const trackRect = rightTrackEl.getBoundingClientRect();
            const measuredHeight = rightPanelEl.offsetHeight;
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
    }, [slug]);

    const description = project ? `${project.subtitle} ${project.description}` : 'Project details not found.';

    const jsonLd = useMemo(() => {
        if (!project) return null;

        return {
            '@context': 'https://schema.org',
            '@type': 'RealEstateListing',
            name: project.title,
            description: project.description,
            image: project.heroImage,
            url: `/projects/${project.slug}`,
            address: {
                '@type': 'PostalAddress',
                addressLocality: project.location,
                addressCountry: 'BD',
            },
            offers: {
                '@type': 'Offer',
                price: project.priceValue,
                priceCurrency: 'BDT',
                availability: project.availablePlots > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            },
        };
    }, [project]);

    const sidebarPanelStyle =
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

    if (!project) {
        return (
            <WebLayout>
                <Head title="Project Not Found">
                    <meta name="description" content="The requested project could not be found. Browse available projects instead." />
                </Head>
                <div className="bg-light pt-36 pb-24">
                    <div className="web-medium-container">
                        <section className="rounded-[30px] border border-black/10 bg-white p-10 text-center shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6e5d2e]">Not Found</p>
                            <h1 className="mt-3 text-[2.4rem] font-light text-[#11161d]">Project is not available</h1>
                            <p className="mt-3 text-[#1d252d]/70">
                                We could not find the project details for this link. You can go back to the project listing or contact the team.
                            </p>
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                <Link
                                    href="/projects"
                                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-[#f8f6f0] px-5 py-3 text-sm text-[#1d252d]"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Projects
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex rounded-xl bg-[#111317] px-5 py-3 text-sm tracking-[0.12em] text-white"
                                >
                                    CONTACT US
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout>
            <Head title={project.title}>
                <meta name="description" content={description} />
                {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
            </Head>

            <div className="bg-light">
                <ProjectDetailHero
                    project={project}
                    statusLabels={statusLabels}
                    statusClass={statusClass}
                    transactionLabels={transactionLabels}
                />

                <div ref={sectionRef} className="web-giant-container relative -mt-12 pb-14 sm:-mt-14">
                    <ProjectDetailSidebar
                        project={project}
                        transactionLabels={transactionLabels}
                        sticky={false}
                        className="mb-5 xl:hidden"
                    />

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-7">
                        <div className="space-y-6">
                            <ProjectDetailGallery project={project} />
                            <section className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.07)] sm:p-6">
                                <ProjectDetailOverview project={project} />
                                <AmenitiesSection />
                            </section>
                        </div>

                        <div
                            ref={rightTrackRef}
                            className="relative hidden xl:block"
                            style={{ minHeight: panelHeight > 0 ? `${panelHeight}px` : undefined }}
                        >
                            <div ref={rightPanelRef} style={sidebarPanelStyle}>
                                <ProjectDetailSidebar project={project} transactionLabels={transactionLabels} sticky={false} />
                            </div>
                        </div>
                    </div>
                </div>

                <section id="project-map-location" className="scroll-mt-28">
                    <ProjectDetailMapSection project={project} />
                </section>
                <PaymentSnapshot project={project} />
                <section id="project-booking" className="scroll-mt-28">
                    <ProjectDetailBooking project={project} />
                </section>
                <section id="project-faq" className="scroll-mt-28">
                    <ProjectDetailFAQ project={project} />
                </section>
                <RelatedProjects
                    relatedProjects={relatedProjects}
                    statusClass={statusClass}
                    statusLabels={statusLabels}
                    transactionLabels={transactionLabels}
                />
            </div>

            {showMobileCta && (
                <div className="fixed inset-x-4 bottom-0 z-[80] rounded-2xl border border-black/10 bg-white/95 p-3 shadow-[0_15px_35px_rgba(15,23,42,0.22)] backdrop-blur xl:hidden">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm text-[#11161d]">{project.title}</p>
                        <p className="text-sm font-medium text-[#11161d]">{project.priceLabel}</p>
                    </div>
                    {/* <p className="mb-3 inline-flex items-center gap-2 text-xs text-[#1d252d]/70">
                        <MapPin className="h-3.5 w-3.5 text-[#2FA89D]" />
                        {project.location}
                    </p> */}
                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl bg-[#111317] px-3 py-2.5 text-xs tracking-[0.12em] text-white"
                        >
                            BOOK VISIT
                        </Link>
                        <a
                            href={project.brochureUrl}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-[#f8f6f0] px-3 py-2.5 text-xs tracking-[0.12em] text-[#1d252d]"
                        >
                            <Download className="h-3.5 w-3.5" />
                            BROCHURE
                        </a>
                    </div>
                </div>
            )}
        </WebLayout>
    );
}
