import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@inertiajs/react'
import WebLayout from '@/Layouts/WebLayout'
import MenuDropdown from '@/Components/others_animation/MenuDropdown'
import { categories, courses } from '@/Data/courses'
import { ArrowRight, BookOpen, Search } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const levelOrder = {
    'Certificate II': 1,
    'Certificate III': 2,
    'Certificate IV': 3,
    Diploma: 4,
}

const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'az', label: 'Title A-Z' },
    { value: 'level', label: 'Level' },
    { value: 'duration', label: 'Duration' },
]

export default function Courses({ category = null }) {
    const layoutRef = useRef(null)
    const sidebarRef = useRef(null)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedLevel, setSelectedLevel] = useState('all')
    const [selectedDuration, setSelectedDuration] = useState('all')
    const [query, setQuery] = useState('')
    const [sortBy, setSortBy] = useState('featured')

    const levels = useMemo(() => Array.from(new Set(courses.map((course) => course.level))), [])
    const durations = useMemo(() => Array.from(new Set(courses.map((course) => course.duration))), [])
    const sortDropdownOptions = useMemo(
        () => sortOptions.map((item) => ({ value: item.value, title: item.label })),
        []
    )
    const categoryDropdownOptions = useMemo(
        () => [{ value: 'all', title: 'All' }, ...categories.map((item) => ({ value: item.id, title: item.title }))],
        []
    )
    const levelDropdownOptions = useMemo(
        () => [{ value: 'all', title: 'All' }, ...levels.map((level) => ({ value: level, title: level }))],
        [levels]
    )
    const durationDropdownOptions = useMemo(
        () => [{ value: 'all', title: 'All' }, ...durations.map((duration) => ({ value: duration, title: duration }))],
        [durations]
    )

    useEffect(() => {
        const exists = categories.some((item) => item.id === category)
        setSelectedCategory(exists ? category : 'all')
    }, [category])

    const filteredCourses = useMemo(() => {
        const normalized = query.trim().toLowerCase()
        let list = [...courses]

        if (selectedCategory !== 'all') {
            list = list.filter((course) => course.category === selectedCategory)
        }

        if (selectedLevel !== 'all') {
            list = list.filter((course) => course.level === selectedLevel)
        }

        if (selectedDuration !== 'all') {
            list = list.filter((course) => course.duration === selectedDuration)
        }

        if (normalized) {
            list = list.filter((course) => {
                const haystack = [
                    course.title,
                    course.code,
                    course.categoryLabel,
                    course.level,
                    course.shortDescription,
                ]
                    .join(' ')
                    .toLowerCase()
                return haystack.includes(normalized)
            })
        }

        if (sortBy === 'az') {
            list.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sortBy === 'level') {
            list.sort((a, b) => (levelOrder[a.level] ?? 999) - (levelOrder[b.level] ?? 999))
        } else if (sortBy === 'duration') {
            list.sort((a, b) => a.duration.localeCompare(b.duration))
        }

        return list
    }, [query, selectedCategory, selectedDuration, selectedLevel, sortBy])

    const hasFilter =
        query.trim().length > 0 ||
        selectedCategory !== 'all' ||
        selectedLevel !== 'all' ||
        selectedDuration !== 'all' ||
        sortBy !== 'featured'

    const totalCategories = categories.length
    const totalCourses = courses.length
    const visibleCourses = filteredCourses.length
    const dropdownTheme = {
        label: 'text-transparent',
        triggerFrame: 'border-[#1d1f22]/15 bg-white shadow-none',
        triggerText: 'text-[#1d1f22]',
        triggerPlaceholder: 'text-[#1d1f22]',
        triggerIcon: 'text-[#6b7280]',
        chevron: 'text-[#6b7280]',
        menuFrame: 'border-[#1d1f22]/15 bg-white',
        optionTitle: 'text-[#1d1f22]',
        optionTitleSelected: 'text-[#1d1f22]',
        optionDescription: 'text-[#6b7280]',
        optionIcon: 'text-[#6b7280]',
        optionIconSelected: 'text-[#1d1f22]',
        optionSelectedBg: 'bg-[#f3f4f6]',
        optionHoverBg: 'hover:bg-[#f7f7f8] focus-visible:bg-[#f7f7f8]',
    }

    useEffect(() => {
        const container = layoutRef.current
        const sidebar = sidebarRef.current
        if (!container || !sidebar) return

        const mm = gsap.matchMedia()
        mm.add('(min-width: 1024px)', () => {
            ScrollTrigger.create({
                trigger: container,
                start: 'top top+=122',
                end: 'bottom bottom-=54',
                pin: sidebar,
                pinSpacing: false,
                invalidateOnRefresh: true,
            })
        })

        ScrollTrigger.refresh()
        return () => mm.revert()
    }, [visibleCourses])

    return (
        <WebLayout>
            <section className="relative overflow-hidden bg-[#111318] pb-20 pt-36 sm:pb-24 sm:pt-40">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(215,181,90,0.22),transparent_42%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_24%,rgba(78,205,196,0.16),transparent_38%)]" />
                </div>

                <div className="web-giant-container relative z-10">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_auto] lg:items-end">
                        <div>
                            <span className="mb-5 inline-flex rounded-full border border-[#d7b55a]/55 bg-[#d7b55a]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7dda0]">
                                Explore Courses
                            </span>
                            <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                                Professional Training for Real Career Outcomes
                            </h1>
                            <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                                Browse nationally recognised qualifications, compare pathways, and choose the right
                                program to build your future with confidence.
                            </p>
                        </div>

                        {/* <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            <div className="rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-center">
                                <p className="text-2xl font-bold text-white">{totalCourses}</p>
                                <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Courses</p>
                            </div>
                            <div className="rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-center">
                                <p className="text-2xl font-bold text-white">{totalCategories}</p>
                                <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Categories</p>
                            </div>
                            <div className="rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-center">
                                <p className="text-2xl font-bold text-white">{visibleCourses}</p>
                                <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Showing</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            <section className="bg-light pb-20 pt-12 sm:pb-24 sm:pt-14">
                <div className="web-giant-container">
                    <div
                        ref={layoutRef}
                        className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start"
                    >
                        <aside
                            ref={sidebarRef}
                            className="relative z-40 overflow-visible rounded-[1.35rem] border border-[#1d1f22]/10 bg-white shadow-[0_16px_38px_rgba(0,0,0,0.08)]"
                        >
                            <div className="rounded-t-[1.35rem] bg-[#1d1f22] px-6 py-6">
                                <h2 className="text-xl font-bold uppercase tracking-[0.1em] text-white">Find Your Preferred Course</h2>
                            </div>

                            <div className="space-y-4 p-6">
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-[#4d525b]">Keyword</span>
                                    <span className="relative block">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f7580]" />
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search title, code, or level"
                                            className="h-12 w-full rounded-xl border border-[#1d1f22]/15 bg-white pl-10 pr-3 text-sm text-[#1d1f22] outline-none transition focus:border-[#1d1f22]/35"
                                        />
                                    </span>
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-[#4d525b]">Category</span>
                                    <MenuDropdown
                                        id="courses-category"
                                        name="courses_category"
                                        label="Category"
                                        labelClassName="sr-only"
                                        placeholder="All"
                                        options={categoryDropdownOptions}
                                        value={selectedCategory}
                                        onChange={(nextValue) => setSelectedCategory(nextValue)}
                                        size="md"
                                        color="slate"
                                        theme={dropdownTheme}
                                        showTriggerIcon={false}
                                        showOptionIcon={false}
                                        className="max-w-none"
                                        triggerClassName="h-12 rounded-xl py-0 text-sm font-normal"
                                        menuClassName="rounded-xl p-1"
                                        optionClassName="rounded-lg"
                                    />
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-[#4d525b]">Level</span>
                                    <MenuDropdown
                                        id="courses-level"
                                        name="courses_level"
                                        label="Level"
                                        labelClassName="sr-only"
                                        placeholder="All"
                                        options={levelDropdownOptions}
                                        value={selectedLevel}
                                        onChange={(nextValue) => setSelectedLevel(nextValue)}
                                        size="md"
                                        color="slate"
                                        theme={dropdownTheme}
                                        showTriggerIcon={false}
                                        showOptionIcon={false}
                                        className="max-w-none"
                                        triggerClassName="h-12 rounded-xl py-0 text-sm font-normal"
                                        menuClassName="rounded-xl p-1"
                                        optionClassName="rounded-lg"
                                    />
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-[#4d525b]">Duration</span>
                                    <MenuDropdown
                                        id="courses-duration"
                                        name="courses_duration"
                                        label="Duration"
                                        labelClassName="sr-only"
                                        placeholder="All"
                                        options={durationDropdownOptions}
                                        value={selectedDuration}
                                        onChange={(nextValue) => setSelectedDuration(nextValue)}
                                        size="md"
                                        color="slate"
                                        theme={dropdownTheme}
                                        showTriggerIcon={false}
                                        showOptionIcon={false}
                                        className="max-w-none"
                                        triggerClassName="h-12 rounded-xl py-0 text-sm font-normal"
                                        menuClassName="rounded-xl p-1"
                                        optionClassName="rounded-lg"
                                    />
                                </label>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setQuery('')
                                        setSelectedCategory('all')
                                        setSelectedLevel('all')
                                        setSelectedDuration('all')
                                        setSortBy('featured')
                                    }}
                                    disabled={!hasFilter}
                                    className="h-12 w-full rounded-xl bg-[#c89c53] px-4 text-sm font-semibold text-white transition hover:bg-[#b58d49] disabled:cursor-not-allowed disabled:opacity-45"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </aside>

                        <div>
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[1.15rem] border border-[#1d1f22]/10 bg-white px-4 py-3 shadow-[0_10px_26px_rgba(0,0,0,0.07)] sm:px-5">
                                <MenuDropdown
                                    id="courses-sort"
                                    name="courses_sort"
                                    label="Sort by"
                                    labelClassName="sr-only"
                                    placeholder="Sort by"
                                    options={sortDropdownOptions}
                                    value={sortBy}
                                    onChange={(nextValue) => setSortBy(nextValue)}
                                    size="sm"
                                    color="slate"
                                    theme={dropdownTheme}
                                    showTriggerIcon={false}
                                    showOptionIcon={false}
                                    className="max-w-none w-[170px]"
                                    triggerClassName="h-10 rounded-lg py-0 text-sm font-medium"
                                    menuClassName="rounded-lg p-1"
                                    optionClassName="rounded-md"
                                />

                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                    <p className="text-sm text-[#6a7078]">
                                        Showing <span className="font-semibold text-[#1d1f22]">{visibleCourses}</span> courses
                                    </p>
                                </div>
                            </div>

                            {filteredCourses.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {filteredCourses.map((course) => (
                                        <Link
                                            key={course.id}
                                            href={`/courses/${course.slug}`}
                                            className="group overflow-hidden rounded-[1.5rem] border border-[#1d1f22]/12 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(0,0,0,0.12)]"
                                        >
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/12 to-transparent" />
                                                <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                                                    {course.categoryLabel}
                                                </span>
                                                <span className="absolute bottom-4 left-4 rounded-full bg-[#d7b55a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1d1f22]">
                                                    {course.code}
                                                </span>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="mb-3 min-h-[64px] text-[1.35rem] font-bold leading-tight text-[#1d1f22]">
                                                    {course.title}
                                                </h3>
                                                <p className="mb-4 text-sm leading-relaxed text-[#4b5058]">{course.shortDescription}</p>

                                                <div className="mb-5 flex flex-wrap gap-2 text-[11px]">
                                                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#1d1f22]/6 px-2.5 py-1 font-medium text-[#40454d]">
                                                        <BookOpen className="h-3.5 w-3.5 text-[#616771]" />
                                                        {course.level}
                                                    </span>
                                                    <span className="rounded-lg bg-[#1d1f22]/6 px-2.5 py-1 font-medium text-[#40454d]">{course.totalUnits} Units</span>
                                                    <span className="rounded-lg bg-[#1d1f22]/6 px-2.5 py-1 font-medium text-[#40454d]">{course.duration}</span>
                                                </div>

                                                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6b1f]">
                                                    View Details
                                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-[1.5rem] border border-[#1d1f22]/10 bg-white p-10 text-center shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                                    <h3 className="mb-2 text-2xl font-bold text-[#1d1f22]">No Courses Found</h3>
                                    <p className="mb-6 text-sm text-[#555a61]">
                                        No results match your current filters. Try a different keyword or reset filters.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery('')
                                            setSelectedCategory('all')
                                            setSelectedLevel('all')
                                            setSelectedDuration('all')
                                            setSortBy('featured')
                                        }}
                                        className="rounded-full bg-[#1d1f22] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#2d3138]"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}
