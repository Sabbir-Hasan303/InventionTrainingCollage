import React, { useMemo, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import {
    AlertTriangle,
    BookOpen,
    Briefcase,
    CheckCircle2,
    ChevronDown,
    Clock3,
    GraduationCap,
    Layers3,
    MapPin,
} from 'lucide-react'
import WebLayout from '@/Layouts/WebLayout'
import EnquiryForm from '@/Components/web/EnquiryForm'
import { getCourseById, getCourseBySlug } from '@/Data/courses'

function InfoPill({ icon: Icon, children }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/12 px-3 py-1.5 text-xs font-medium text-white/90">
            <Icon className="h-3.5 w-3.5 text-[#f4cf7b]" />
            {children}
        </span>
    )
}

function ListBlock({ title, items }) {
    if (!items?.length) return null
    return (
        <section className="rounded-2xl border border-[#1d1f22]/12 bg-white p-6 shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
            <h3 className="mb-4 text-2xl font-bold text-[#1d1f22]">{title}</h3>
            <ul className="space-y-3 !p-0">
                {items.map((item, index) => (
                    <li key={`${title}-${index}`} className="list-none text-sm leading-relaxed text-[#4b5058]">
                        <span className="mr-2 text-[#8a6b1f]">•</span>
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    )
}

function Accordion({ title, open, onToggle, children }) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#1d1f22]/12 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
                <h4 className="text-lg font-bold text-[#1d1f22]">{title}</h4>
                <ChevronDown className={`h-5 w-5 text-[#6f7480] transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open ? <div className="border-t border-[#1d1f22]/10 px-5 py-4">{children}</div> : null}
        </section>
    )
}

export default function CourseDetails({ slug = null, legacyId = null }) {
    const { url } = usePage()
    const [openSections, setOpenSections] = useState({
        coreUnits: true,
        electiveUnits: false,
        entryRequirements: true,
        deliveryAndAssessment: false,
        placement: false,
        licensing: false,
    })

    const fallbackSlug = useMemo(() => {
        if (!url) return null
        const cleaned = String(url).split('?')[0]
        const parts = cleaned.split('/').filter(Boolean)
        if (parts[0] === 'courses' && parts[1]) return parts[1]
        return null
    }, [url])

    const course = useMemo(() => {
        if (slug) {
            const bySlug = getCourseBySlug(slug)
            if (bySlug) return bySlug
        }

        if (legacyId) {
            const byId = getCourseById(legacyId)
            if (byId) return byId
            const bySlug = getCourseBySlug(legacyId)
            if (bySlug) return bySlug
        }

        if (fallbackSlug) {
            const byFallbackSlug = getCourseBySlug(fallbackSlug)
            if (byFallbackSlug) return byFallbackSlug
            return getCourseById(fallbackSlug)
        }

        return null
    }, [fallbackSlug, legacyId, slug])

    if (!course) {
        return (
            <WebLayout>
                <section className="bg-light py-36">
                    <div className="web-giant-container">
                        <div className="mx-auto max-w-2xl rounded-2xl border border-[#1d1f22]/12 bg-white p-10 text-center shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                            <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-[#b5892f]" />
                            <h1 className="mb-2 text-3xl font-bold text-[#1d1f22]">Course Not Found</h1>
                            <p className="mb-6 text-sm text-[#525761]">The course you are looking for is unavailable or has moved.</p>
                            <Link
                                href="/courses"
                                className="inline-flex items-center rounded-full bg-[#1d1f22] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#30343b]"
                            >
                                Back To Courses
                            </Link>
                        </div>
                    </div>
                </section>
            </WebLayout>
        )
    }

    return (
        <WebLayout>
            <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.image})` }}
                />
                <div className="absolute inset-0 bg-[#0c1016]/78" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1119]/84 via-[#0b1119]/66 to-[#0b1119]/56" />

                <div className="web-giant-container relative z-10">
                    <Link href="/courses" className="mb-6 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-[#f4d186]">
                        Back to Courses
                    </Link>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4d186]">{course.code}</p>
                    <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">{course.title}</h1>
                    <p className="mb-5 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">{course.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                        <InfoPill icon={GraduationCap}>{course.level}</InfoPill>
                        <InfoPill icon={Layers3}>{course.totalUnits} Units</InfoPill>
                        <InfoPill icon={Clock3}>{course.duration}</InfoPill>
                        <InfoPill icon={BookOpen}>{course.categoryLabel}</InfoPill>
                    </div>
                </div>
            </section>

            <section className="bg-light pb-24 pt-10">
                <div className="web-giant-container">
                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_420px]">
                        <div className="space-y-6">
                            <section className="rounded-2xl border border-[#1d1f22]/12 bg-white p-6 shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
                                <h2 className="mb-4 text-2xl font-bold text-[#1d1f22]">Overview</h2>
                                <div className="space-y-3 text-sm leading-relaxed text-[#4b5058]">
                                    {course.overview.map((paragraph, idx) => (
                                        <p key={`overview-${idx}`}>{paragraph}</p>
                                    ))}
                                </div>
                            </section>

                            <ListBlock title="Suitable For" items={course.suitableFor} />
                            <ListBlock title="Career Outcomes" items={course.careerOutcomes} />

                            <section className="rounded-2xl border border-[#1d1f22]/12 bg-white p-6 shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
                                <h3 className="mb-4 text-2xl font-bold text-[#1d1f22]">Course Structure</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="rounded-xl bg-[#1d1f22]/6 p-4">
                                        <p className="text-xs uppercase tracking-[0.12em] text-[#646a74]">Total Units</p>
                                        <p className="mt-1 text-2xl font-bold text-[#1d1f22]">{course.totalUnits}</p>
                                    </div>
                                    <div className="rounded-xl bg-[#1d1f22]/6 p-4">
                                        <p className="text-xs uppercase tracking-[0.12em] text-[#646a74]">Core Units</p>
                                        <p className="mt-1 text-2xl font-bold text-[#1d1f22]">{course.coreUnitsCount}</p>
                                    </div>
                                    <div className="rounded-xl bg-[#1d1f22]/6 p-4">
                                        <p className="text-xs uppercase tracking-[0.12em] text-[#646a74]">Elective Units</p>
                                        <p className="mt-1 text-2xl font-bold text-[#1d1f22]">{course.electiveUnitsCount}</p>
                                    </div>
                                </div>
                            </section>

                            <Accordion
                                title="Core Units"
                                open={openSections.coreUnits}
                                onToggle={() => setOpenSections((prev) => ({ ...prev, coreUnits: !prev.coreUnits }))}
                            >
                                <ul className="space-y-3 !p-0">
                                    {course.coreUnits?.map((unit) => (
                                        <li key={unit.code} className="list-none rounded-lg bg-[#1d1f22]/5 px-3 py-2 text-sm text-[#424850]">
                                            <span className="font-semibold text-[#1d1f22]">{unit.code}</span> - {unit.name}
                                        </li>
                                    ))}
                                </ul>
                            </Accordion>

                            <Accordion
                                title="Elective Units"
                                open={openSections.electiveUnits}
                                onToggle={() => setOpenSections((prev) => ({ ...prev, electiveUnits: !prev.electiveUnits }))}
                            >
                                <ul className="space-y-3 !p-0">
                                    {course.electiveUnits?.map((unit) => (
                                        <li key={unit.code} className="list-none rounded-lg bg-[#1d1f22]/5 px-3 py-2 text-sm text-[#424850]">
                                            <span className="font-semibold text-[#1d1f22]">{unit.code}</span> - {unit.name}
                                        </li>
                                    ))}
                                </ul>
                                {course.electiveNote ? <p className="mt-4 text-sm text-[#505661]">{course.electiveNote}</p> : null}
                            </Accordion>

                            {course.workPlacement ? (
                                <Accordion
                                    title="Work Placement"
                                    open={openSections.placement}
                                    onToggle={() => setOpenSections((prev) => ({ ...prev, placement: !prev.placement }))}
                                >
                                    <p className="mb-2 text-sm text-[#3f454d]">
                                        <span className="font-semibold">Required Hours:</span> {course.workPlacement.hours}
                                    </p>
                                    <p className="text-sm leading-relaxed text-[#505661]">{course.workPlacement.description}</p>
                                </Accordion>
                            ) : null}

                            <Accordion
                                title="Entry Requirements"
                                open={openSections.entryRequirements}
                                onToggle={() => setOpenSections((prev) => ({ ...prev, entryRequirements: !prev.entryRequirements }))}
                            >
                                <ul className="space-y-3 !p-0">
                                    {course.entryRequirements?.map((item, idx) => (
                                        <li key={`entry-${idx}`} className="list-none text-sm text-[#505661]">
                                            <span className="mr-2 text-[#8a6b1f]">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Accordion>

                            <Accordion
                                title="Delivery and Assessment"
                                open={openSections.deliveryAndAssessment}
                                onToggle={() => setOpenSections((prev) => ({ ...prev, deliveryAndAssessment: !prev.deliveryAndAssessment }))}
                            >
                                {course.deliveryModes?.length ? (
                                    <>
                                        <p className="mb-2 text-sm font-semibold text-[#1d1f22]">Delivery Modes</p>
                                        <ul className="mb-4 space-y-2 !p-0">
                                            {course.deliveryModes.map((mode, idx) => (
                                                <li key={`mode-${idx}`} className="list-none text-sm text-[#505661]">
                                                    <span className="mr-2 text-[#8a6b1f]">•</span>
                                                    {mode}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : null}

                                {course.deliveryNote ? (
                                    <p className="mb-4 rounded-lg bg-[#1d1f22]/5 p-3 text-sm text-[#505661]">{course.deliveryNote}</p>
                                ) : null}

                                {course.assessmentMethods?.length ? (
                                    <>
                                        <p className="mb-2 text-sm font-semibold text-[#1d1f22]">Assessment Methods</p>
                                        <ul className="space-y-2 !p-0">
                                            {course.assessmentMethods.map((method, idx) => (
                                                <li key={`assessment-${idx}`} className="list-none text-sm text-[#505661]">
                                                    <span className="mr-2 text-[#8a6b1f]">•</span>
                                                    {method}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : null}
                            </Accordion>

                            {course.licensingDisclaimer ? (
                                <Accordion
                                    title="Licensing Disclaimer"
                                    open={openSections.licensing}
                                    onToggle={() => setOpenSections((prev) => ({ ...prev, licensing: !prev.licensing }))}
                                >
                                    <p className="text-sm leading-relaxed text-[#505661]">{course.licensingDisclaimer}</p>
                                </Accordion>
                            ) : null}
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-2xl border border-[#1d1f22]/12 bg-white p-5 shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
                                <h3 className="mb-4 text-xl font-bold text-[#1d1f22]">Quick Facts</h3>
                                <ul className="space-y-3 !p-0">
                                    <li className="list-none flex items-center justify-between text-sm">
                                        <span className="inline-flex items-center gap-2 text-[#525761]"><GraduationCap className="h-4 w-4 text-[#8a6b1f]" /> Level</span>
                                        <span className="font-semibold text-[#1d1f22]">{course.level}</span>
                                    </li>
                                    <li className="list-none flex items-center justify-between text-sm">
                                        <span className="inline-flex items-center gap-2 text-[#525761]"><Layers3 className="h-4 w-4 text-[#8a6b1f]" /> Total Units</span>
                                        <span className="font-semibold text-[#1d1f22]">{course.totalUnits}</span>
                                    </li>
                                    <li className="list-none flex items-center justify-between text-sm">
                                        <span className="inline-flex items-center gap-2 text-[#525761]"><Clock3 className="h-4 w-4 text-[#8a6b1f]" /> Duration</span>
                                        <span className="font-semibold text-[#1d1f22]">{course.duration}</span>
                                    </li>
                                    <li className="list-none flex items-center justify-between text-sm">
                                        <span className="inline-flex items-center gap-2 text-[#525761]"><Briefcase className="h-4 w-4 text-[#8a6b1f]" /> Category</span>
                                        <span className="font-semibold text-[#1d1f22]">{course.categoryLabel}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-[#1d1f22]/12 bg-white p-5 shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
                                <h3 className="mb-3 text-xl font-bold text-[#1d1f22]">Why Choose This Course</h3>
                                <ul className="space-y-2 !p-0 text-sm text-[#525761]">
                                    <li className="list-none inline-flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[#8a6b1f]" /> Nationally recognised qualification</li>
                                    <li className="list-none inline-flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[#8a6b1f]" /> Industry-aligned training outcomes</li>
                                    <li className="list-none inline-flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[#8a6b1f]" /> Flexible delivery options</li>
                                    <li className="list-none inline-flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[#8a6b1f]" /> Campus support in Bankstown</li>
                                </ul>
                            </div>

                            <EnquiryForm courseCode={course.code} courseTitle={course.title} variant="inline" />
                        </aside>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}
