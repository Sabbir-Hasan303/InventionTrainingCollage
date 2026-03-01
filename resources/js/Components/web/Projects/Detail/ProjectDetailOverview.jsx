import { Bath, BedDouble, Building2, Grid2x2, MapPin, Ruler } from 'lucide-react';

const SECTION_LINKS = [
    { label: 'Description', targetId: 'project-description' },
    { label: 'Details & Features', targetId: 'project-details-features' },
    { label: 'Maps Location', targetId: 'project-map-location' },
    { label: 'Book A Tour', targetId: 'project-booking' },
];

function formatLabel(value) {
    if (!value) return '-';
    return String(value)
        .split(/[-_]/g)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY - 116;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
}

export default function ProjectDetailOverview({ project }) {
    const overviewImage = project?.galleryImages?.[2] || project?.galleryImages?.[0] || project?.heroImage;
    const hasAvailability = Number.isFinite(project?.availablePlots) && Number.isFinite(project?.totalPlots);
    const infoItems = [
        { label: 'Category', value: formatLabel(project?.category), icon: Building2 },
        { label: 'Property ID', value: project?.id || '-', icon: Grid2x2 },
        { label: 'Bedrooms', value: project?.bedrooms ?? '-', icon: BedDouble },
        { label: 'Bathrooms', value: project?.bathrooms ?? '-', icon: Bath },
        { label: 'Property Size', value: project?.sizeSqft ? `${project.sizeSqft} ft2` : '-', icon: Ruler },
        { label: 'Location', value: project?.location || '-', icon: MapPin },
        {
            label: 'Availability',
            value: hasAvailability ? `${project.availablePlots} / ${project.totalPlots} Plots` : '-',
            icon: Grid2x2,
        },
    ];

    return (
        <div>
            <nav className="mb-6 rounded-2xl border border-[#d7dce6] bg-[#f7f8fb] p-2 sm:mb-7">
                <div className="grid grid-cols-2 gap-1 sm:flex sm:w-full sm:items-center sm:gap-1 sm:overflow-x-auto sm:whitespace-nowrap sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden">
                    {SECTION_LINKS.map((link) => (
                        <button
                            key={link.targetId}
                            type="button"
                            onClick={() => scrollToSection(link.targetId)}
                            className="w-full rounded-xl px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-[#1d252d]/80 transition sm:w-auto sm:px-4 sm:text-[11px] md:hover:bg-[#1D1F22] md:hover:text-white"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </nav>

            <section id="project-description" className="scroll-mt-28 grid gap-5 rounded-3xl border border-[#d7dce6] bg-[#f8f6f0] p-4 sm:p-5 lg:grid-cols-[1fr_1.02fr] lg:gap-8 lg:p-6">
                <div className="flex flex-col justify-center">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#6e5d2e]">Overview</p>
                    <h2 className="mt-3 text-[2rem] font-light leading-tight text-[#11161d]">About The Property</h2>
                    <p className="mt-4 text-base leading-8 text-[#1d252d]/82">{project?.overview}</p>
                    <p className="mt-3 text-sm leading-7 text-[#1d252d]/70">{project?.description}</p>
                </div>

                <div className="overflow-hidden rounded-[1.35rem] border border-black/10 bg-[#dde2ea]">
                    {overviewImage ? (
                        <img src={overviewImage} alt={`${project?.title} overview`} className="h-[280px] w-full object-cover sm:h-[360px] lg:h-full" />
                    ) : (
                        <div className="flex h-[280px] w-full items-center justify-center text-sm text-[#5f6a78] sm:h-[360px] lg:h-full">Image unavailable</div>
                    )}
                </div>
            </section>

            <section id="project-details-features" className="scroll-mt-28 mt-5 rounded-3xl border border-[#d7dce6] bg-white p-4 sm:mt-6 sm:p-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-7">
                    {infoItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article key={item.label} className="rounded-2xl border border-[#e0e5ee] bg-[#f9fbff] p-3.5">
                                <p className="m-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#617087]">
                                    <Icon className="h-3.5 w-3.5 text-[#2FA89D]" />
                                    {item.label}
                                </p>
                                <p className="mt-2 line-clamp-2 text-sm text-[#11161d]">{item.value}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
