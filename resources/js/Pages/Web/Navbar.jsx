import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { IconButton, InputAdornment } from '@mui/material';
import { Menu, Close, Search, Language } from '@mui/icons-material';
import gsap from 'gsap';
import WebTextField from '@/Components/WebTextField';
// import Logo from '../ui/Logo';

const megaSections = [
    {
        id: '01',
        name: 'DHAKA',
        page: 'projects',
        hasChildren: true,
        categories: [
            {
                id: 'land-project',
                name: 'Land Project',
                items: [
                    { name: 'Pushpo Eco City', code: 'PE', color: '#f59e0b', page: 'projects' },
                    { name: 'Dhaka Western Valley', code: 'DW', color: '#22d3ee', page: 'projects' },
                    { name: 'Purbachal Garden Enclave', code: 'PG', color: '#a78bfa', page: 'projects' },
                    { name: 'Purbachal Garden Enclave', code: 'PG', color: '#a78bfa', page: 'projects' },
                ],
            },
            {
                id: 'building-project',
                name: 'Building Project',
                items: [
                    { name: 'The Imperium Eskaton', code: 'IE', color: '#34d399', page: 'projects' },
                    { name: 'Bay Icon Hotel & Resort', code: 'BI', color: '#60a5fa', page: 'projects' },
                    { name: 'Skyline Meridian Tower', code: 'SM', color: '#f472b6', page: 'projects' },
                ],
            },
        ],
    },
    {
        id: '02',
        name: 'GAZIPUR',
        page: 'projects',
        hasChildren: true,
        categories: [
            {
                id: 'land-project',
                name: 'Land Project',
                items: [
                    { name: 'Gazipur Green Meadows', code: 'GM', color: '#84cc16', page: 'projects' },
                    { name: 'Canal Front Acres', code: 'CA', color: '#38bdf8', page: 'projects' },
                    { name: 'Heritage Orchard Plots', code: 'HO', color: '#f97316', page: 'projects' },
                ],
            },
            {
                id: 'building-project',
                name: 'Building Project',
                items: [
                    { name: 'Regent Business Park', code: 'RB', color: '#2dd4bf', page: 'projects' },
                    { name: 'Maple Heights Residence', code: 'MH', color: '#fb7185', page: 'projects' },
                    { name: 'Northview Tech Square', code: 'NT', color: '#c084fc', page: 'projects' },
                ],
            },
        ],
    },
    {
        id: '03',
        name: 'MUNSHIGANJ',
        page: 'projects',
        hasChildren: true,
        categories: [
            {
                id: 'land-project',
                name: 'Land Project',
                items: [
                    { name: 'Riverside Horizon Plots', code: 'RH', color: '#60a5fa', page: 'projects' },
                    { name: 'Orchard Point Estates', code: 'OP', color: '#22c55e', page: 'projects' },
                    { name: 'Southbank Lake Fields', code: 'SL', color: '#0ea5e9', page: 'projects' },
                ],
            },
            {
                id: 'building-project',
                name: 'Building Project',
                items: [
                    { name: 'Sapphire Riverfront Towers', code: 'SR', color: '#f59e0b', page: 'projects' },
                    { name: 'Terrace Court Residences', code: 'TC', color: '#e879f9', page: 'projects' },
                    { name: 'Munshi Grand Center', code: 'MG', color: '#14b8a6', page: 'projects' },
                ],
            },
        ],
    },
    {
        id: '04',
        name: 'NARAYANGANJ',
        page: 'projects',
        hasChildren: true,
        categories: [
            {
                id: 'land-project',
                name: 'Land Project',
                items: [
                    { name: 'Eastern Quay Gardens', code: 'EQ', color: '#f97316', page: 'projects' },
                    { name: 'Riverpark Enclave', code: 'RE', color: '#f43f5e', page: 'projects' },
                    { name: 'Crescent Meadow Lands', code: 'CM', color: '#06b6d4', page: 'projects' },
                ],
            },
            {
                id: 'building-project',
                name: 'Building Project',
                items: [
                    { name: 'Metro Hub Corporate Center', code: 'MC', color: '#84cc16', page: 'projects' },
                    { name: 'Bay Crest Residences', code: 'BC', color: '#818cf8', page: 'projects' },
                    { name: 'Landmark Nine Tower', code: 'L9', color: '#22d3ee', page: 'projects' },
                ],
            },
        ],
    },
    {
        id: '05',
        name: 'CHATTOGRAM',
        page: 'projects',
        hasChildren: true,
        categories: [
            {
                id: 'land-project',
                name: 'Land Project',
                items: [
                    { name: 'Ocean Frontier Plots', code: 'OF', color: '#22c55e', page: 'projects' },
                    { name: 'Hillview Ridge Acres', code: 'HR', color: '#f59e0b', page: 'projects' },
                    { name: 'Harbor Green Valley', code: 'HG', color: '#38bdf8', page: 'projects' },
                ],
            },
            {
                id: 'building-project',
                name: 'Building Project',
                items: [
                    { name: 'Bayline Icon Hotel', code: 'BI', color: '#fb7185', page: 'projects' },
                    { name: 'Portside Commerce Center', code: 'PC', color: '#a78bfa', page: 'projects' },
                    { name: 'Marina District Towers', code: 'MD', color: '#14b8a6', page: 'projects' },
                ],
            },
        ],
    },
];

const navItems = [
    { label: 'ABOUT', page: 'about', hasDropdown: false },
    { label: 'PROJECTS', page: '#', hasDropdown: true, isMega: true },
    { label: 'PLOTS', page: 'plots', hasDropdown: false },
    { label: 'PRICING', page: 'pricing', hasDropdown: false },
    { label: 'GALLERY', page: 'gallery', hasDropdown: false },
    { label: 'LANDOWNER', page: 'landowner', hasDropdown: false },
    { label: 'CONTACT', page: 'contact', hasDropdown: false },
    // { label: 'ANIMATION', page: 'animation', hasDropdown: false },
];

export default function Navbar() {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileSearchQuery, setMobileSearchQuery] = useState('');
    const [mobileMenuLevel, setMobileMenuLevel] = useState(0);
    const [mobileProjectSectionId, setMobileProjectSectionId] = useState(megaSections[0]?.id || '');
    const [mobileProjectCategoryId, setMobileProjectCategoryId] = useState(megaSections[0]?.categories?.[0]?.id || '');
    const [hoveredItem, setHoveredItem] = useState(null);
    const [activeMegaSectionId, setActiveMegaSectionId] = useState(megaSections[0].id);
    const [activeMegaGroupId, setActiveMegaGroupId] = useState(megaSections[0]?.categories?.[0]?.id || '');
    const navRef = useRef(null);
    const megaMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const searchRef = useRef(null);
    const ctaButtonRef = useRef(null);
    const mobileTopActionsRef = useRef(null);
    const mobileBottomActionsRef = useRef(null);
    const megaGroupHoverTimeoutRef = useRef(null);

    const showBackground = isScrolled || hoveredItem !== null || searchOpen;
    const activeMegaSection = megaSections.find((section) => section.id === activeMegaSectionId) || megaSections[0];
    const activeMegaSectionGroups = activeMegaSection.categories || [];
    const activeMegaGroup = activeMegaSectionGroups.find((group) => group.id === activeMegaGroupId) || activeMegaSectionGroups[0];
    const activeMegaGroupItems = activeMegaGroup?.items || [];
    const visibleMegaGroupItems = activeMegaGroupItems.slice(0, 9);
    const hiddenMegaGroupItemCount = Math.max(activeMegaGroupItems.length - visibleMegaGroupItems.length, 0);
    const filteredMobileItems = navItems.filter((item) =>
        item.label.toLowerCase().includes(mobileSearchQuery.toLowerCase())
    );
    const mobileProjectSection = megaSections.find((section) => section.id === mobileProjectSectionId) || megaSections[0];
    const mobileProjectCategories = mobileProjectSection?.categories || [];
    const mobileProjectCategory =
        mobileProjectCategories.find((category) => category.id === mobileProjectCategoryId) || mobileProjectCategories[0];
    const mobileProjectItems = mobileProjectCategory?.items || [];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (megaMenuOpen && megaMenuRef.current) {
            gsap.fromTo(megaMenuRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
            );

            const leftItems = megaMenuRef.current.querySelectorAll('.mega-left-item');
            gsap.fromTo(leftItems,
                { x: -24, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out', delay: 0.12 }
            );
        }
    }, [megaMenuOpen]);

    useEffect(() => {
        if (megaMenuOpen && megaMenuRef.current) {
            const rightItems = megaMenuRef.current.querySelectorAll('.mega-right-item');
            gsap.fromTo(rightItems,
                { x: 20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, stagger: 0.12, delay: 0.08, ease: 'power2.out', overwrite: 'auto' }
            );
        }
    }, [activeMegaSectionId, activeMegaGroupId, megaMenuOpen]);

    useEffect(() => {
        return () => {
            if (megaGroupHoverTimeoutRef.current) {
                clearTimeout(megaGroupHoverTimeoutRef.current);
            }
        };
    }, []);

    const queueMegaGroupHover = (groupId) => {
        if (megaGroupHoverTimeoutRef.current) {
            clearTimeout(megaGroupHoverTimeoutRef.current);
        }

        megaGroupHoverTimeoutRef.current = setTimeout(() => {
            setActiveMegaGroupId(groupId);
            megaGroupHoverTimeoutRef.current = null;
        }, 140);
    };

    useEffect(() => {
        if (searchOpen && searchRef.current) {
            gsap.fromTo(searchRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
            );
        }
    }, [searchOpen]);

    useEffect(() => {
        if (isMobileMenuOpen && mobileMenuRef.current) {
            gsap.fromTo(mobileMenuRef.current,
                { x: '100%' },
                { x: 0, duration: 0.6, ease: 'power3.inOut' }
            );

            const items = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
            gsap.fromTo(items,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
            );

            if (mobileTopActionsRef.current) {
                gsap.fromTo(
                    mobileTopActionsRef.current,
                    { y: -18, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', delay: 0.2 }
                );
            }

            if (mobileBottomActionsRef.current) {
                gsap.fromTo(
                    mobileBottomActionsRef.current,
                    { y: 18, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', delay: 0.25 }
                );
            }
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) return;
        setMobileMenuLevel(0);
        setMobileSearchQuery('');
        setMobileProjectSectionId(megaSections[0]?.id || '');
        setMobileProjectCategoryId(megaSections[0]?.categories?.[0]?.id || '');
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (ctaButtonRef.current) {
            gsap.fromTo(
                ctaButtonRef.current,
                { y: -12, opacity: 0, scale: 0.94 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
            );
        }
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const openMobileProjectsLocations = () => {
        const defaultSection = megaSections[0];
        setMobileProjectSectionId(defaultSection?.id || '');
        setMobileProjectCategoryId(defaultSection?.categories?.[0]?.id || '');
        setMobileMenuLevel(1);
    };

    const openMobileProjectCategories = (section) => {
        setMobileProjectSectionId(section.id);
        setMobileProjectCategoryId(section?.categories?.[0]?.id || '');
        setMobileMenuLevel(2);
    };

    const openMobileProjectItems = (category) => {
        setMobileProjectCategoryId(category.id);
        setMobileMenuLevel(3);
    };

    const goBackMobilePanel = () => {
        setMobileMenuLevel((prev) => Math.max(prev - 1, 0));
    };

    const getPanelTransform = (panelIndex) => ({
        transform: `translateX(${panelIndex <= mobileMenuLevel ? 0 : 100}%)`,
    });

    const currentPathRaw = (url || '/').split('?')[0] || '/';
    const currentPath = currentPathRaw.startsWith('/') ? currentPathRaw : `/${currentPathRaw}`;

    const isNavItemActive = (item) => {
        if (item.isMega) {
            return currentPath === '/projects' || currentPath.startsWith('/projects/');
        }
        return currentPath === `/${item.page}`;
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showBackground ? 'bg-[#242424]/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
                    }`}
                onMouseLeave={() => {
                    if (megaGroupHoverTimeoutRef.current) {
                        clearTimeout(megaGroupHoverTimeoutRef.current);
                        megaGroupHoverTimeoutRef.current = null;
                    }
                    setMegaMenuOpen(false);
                    setHoveredItem(null);
                }}
            >
                <div className="mx-auto px-3 lg:px-8 h-24 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/assets/images/Logo2.png"
                            alt="Next Home Properties"
                            className="h-16 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:flex items-center gap-10">
                        {navItems.map((item) => {
                            const isActiveItem = isNavItemActive(item);

                            return (
                                <div
                                    key={item.label}
                                    className="relative group"
                                    onMouseEnter={() => {
                                        setHoveredItem(item.label);
                                        if (item.isMega) {
                                            setMegaMenuOpen(true);
                                            setActiveMegaSectionId(megaSections[0].id);
                                            setActiveMegaGroupId(megaSections[0]?.categories?.[0]?.id || '');
                                        } else {
                                            setMegaMenuOpen(false);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!item.isMega) setHoveredItem(null);
                                    }}
                                >
                                    <Link
                                        href={`/${item.page}`}
                                        className={`relative text-sm font-light tracking-[0.15em] uppercase transition-colors flex items-center gap-2 pb-2 ${isActiveItem ? 'text-white' : 'text-white/80 hover:text-white'
                                            }`}
                                    >
                                        {item.label}
                                        {item.hasDropdown && (
                                            <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        <span
                                            className={`absolute left-0 -bottom-[6px] h-px w-full origin-left bg-[#d7b55a] transition-transform duration-300 ${(hoveredItem === item.label || isActiveItem) ? 'scale-x-100' : 'scale-x-0'
                                                }`}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <IconButton
                            className="!hidden xl:!flex"
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <Search className='text-white' />
                        </IconButton>
                        <button className="hidden xl:block text-white/80 hover:text-white text-sm font-light tracking-wider">
                            BANGLA
                        </button>
                        <div ref={ctaButtonRef} className="hidden xl:block">
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/65 bg-black/35 px-6 py-2.5 text-sm font-medium tracking-[0.16em] text-white backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.32)] transition-all duration-300 hover:border-[#7DE5DD] hover:bg-[#4ECDC4]/28 hover:text-white"
                            >
                                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4ECDC4]/0 via-[#4ECDC4]/35 to-[#4ECDC4]/0 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                                <span>GET IN TOUCH</span>
                                <span className="inline-flex h-5 w-5 items-center justify-center self-center transition-transform duration-300 group-hover:translate-x-1">
                                    <img
                                        src="/assets/images/arrow-right.png"
                                        alt=""
                                        className="h-3.5 w-3.5 object-contain"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Link>
                        </div>
                        <IconButton
                            className="xl:!hidden"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className='text-white' />
                        </IconButton>
                    </div>
                </div>

                {/* Search Bar Dropdown */}
                {searchOpen && (
                    <div
                        ref={searchRef}
                        className="absolute top-full left-0 right-0 bg-[#161719] border-t border-white/10 py-8"
                    >
                        <div className="max-w-[1800px] mx-auto px-8">
                            <div className="max-w-3xl mx-auto">
                                <WebTextField
                                    mode="dark"
                                    focusColor="rgba(255,255,255,0.35)"
                                    fullWidth
                                    placeholder="Search for projects, locations, plots..."
                                    variant="outlined"
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search className="text-white/50" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setSearchOpen(false)} className="text-white/50">
                                                    <Close />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        className: "text-white text-lg"
                                    }}
                                    customSx={{
                                        '& .MuiInputBase-input': { color: 'white' },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Mega Menu */}
                {megaMenuOpen && (
                    <div
                        ref={megaMenuRef}
                        className="absolute top-full left-0 right-0 bg-[#161719] border-t border-white/10"
                    >
                        <div className="max-w-[1800px] mx-auto px-8 py-14">
                            <div className="grid grid-cols-12 gap-10">
                                <div className="col-span-3">
                                    <div className="space-y-1">
                                        {megaSections.map((section) => {
                                            const isActive = section.id === activeMegaSection.id;
                                            return (
                                                <Link
                                                    key={section.id}
                                                    href={`/${section.page}`}
                                                    className={`mega-left-item group flex items-center justify-between px-2 py-4 transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'
                                                        }`}
                                                    onMouseEnter={() => {
                                                        setActiveMegaSectionId(section.id);
                                                        setActiveMegaGroupId(section.categories?.[0]?.id || '');
                                                    }}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className={`text-sm tracking-[0.2em] ${isActive ? 'text-[#d7b55a]' : 'text-white/35'}`}>
                                                            {section.id}
                                                        </span>
                                                        <span className="text-[1.8rem] leading-none font-light tracking-[0.08em]">
                                                            {section.name}
                                                        </span>
                                                    </div>
                                                    {section.hasChildren && (
                                                        <svg className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`} viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="col-span-9 border-l border-white/10 pl-8">
                                    <div className="grid grid-cols-12 gap-10">
                                        <div className="col-span-3">
                                            <div className="space-y-1 max-w-[260px]">
                                                {activeMegaSectionGroups.map((group) => {
                                                    const isGroupActive = group.id === activeMegaGroup?.id;
                                                    return (
                                                        <button
                                                            key={group.id}
                                                            type="button"
                                                            className={`mega-right-item group flex w-full items-center justify-between rounded-md px-2 py-4 text-left uppercase transition-colors ${isGroupActive ? 'text-white' : 'text-white/65 hover:text-white'
                                                                }`}
                                                            onMouseEnter={() => queueMegaGroupHover(group.id)}
                                                        >
                                                            <span className="text-base font-light tracking-[0.12em]">
                                                                {group.name}
                                                            </span>
                                                            <svg className={`ml-4 h-5 w-5 transition-colors ${isGroupActive ? 'text-white' : 'text-white/35 group-hover:text-white/70'}`} viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="col-span-9 border-l border-white/10 pl-8">
                                            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                                                {visibleMegaGroupItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={`/${subItem.page}`}
                                                        className="mega-right-item group flex min-h-[118px] flex-col items-center justify-center gap-3 rounded-lg px-4 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06] hover:shadow-[0_10px_22px_rgba(0,0,0,0.28)]"
                                                    >
                                                        <span
                                                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-medium tracking-wider"
                                                            style={{ color: subItem.color, borderColor: `${subItem.color}80` }}
                                                        >
                                                            {subItem.code}
                                                        </span>
                                                        <span className="text-sm leading-[1.35] text-white/75 tracking-[0.06em] uppercase transition-colors group-hover:text-white">
                                                            {subItem.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>

                                            <div className="mt-7 flex items-center justify-between">
                                                <span className="text-xs tracking-[0.12em] uppercase text-white/45">
                                                    {hiddenMegaGroupItemCount > 0 ? `+${hiddenMegaGroupItemCount} More Projects` : 'Discover More Projects'}
                                                </span>
                                                <Link
                                                    href="/projects"
                                                    className="mega-right-item group inline-flex items-center gap-2 rounded-full border border-[#d7b55a]/60 bg-[#d7b55a]/10 px-5 py-2 text-xs font-medium tracking-[0.14em] uppercase text-[#f7e4af] transition-all duration-300 hover:border-[#d7b55a] hover:bg-[#d7b55a]/20 hover:text-white"
                                                >
                                                    <span>Explore All Projects</span>
                                                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
                        onClick={closeMobileMenu}
                    />
                    <div
                        ref={mobileMenuRef}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#161719] z-50 overflow-hidden"
                    >
                        <div className="flex h-full flex-col p-6">
                            <div className="flex justify-between items-center mb-5">
                                <span className="text-white text-2xl font-light tracking-[0.14em] leading-none">MENU</span>
                                <IconButton
                                    onClick={closeMobileMenu}
                                >
                                    <Close className='text-white' />
                                </IconButton>
                            </div>

                            {mobileMenuLevel === 0 && (
                                <div ref={mobileTopActionsRef} className="mb-6">
                                    <WebTextField
                                        mode="dark"
                                        focusColor="rgba(255,255,255,0.35)"
                                        value={mobileSearchQuery}
                                        onChange={(e) => setMobileSearchQuery(e.target.value)}
                                        placeholder="Search for"
                                        aria-label="Search menu items"
                                        customSx={{
                                            '& .MuiOutlinedInput-root': {
                                                minHeight: '56px',
                                                borderRadius: '0.75rem',
                                                backgroundColor: '#0f1219',
                                                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                                            },
                                            '& .MuiInputBase-input': {
                                                fontSize: '1.05rem',
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search className="text-white/75" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            )}

                            <div className="relative flex-1 overflow-hidden">
                                <div
                                    className="absolute inset-0 overflow-y-auto pr-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={getPanelTransform(0)}
                                >
                                    <div className="space-y-0">
                                        {filteredMobileItems.map((item) => {
                                            const isProjectsMega = Boolean(item.isMega);
                                            const isActiveItem = isNavItemActive(item);

                                            if (isProjectsMega) {
                                                return (
                                                    <button
                                                        key={item.label}
                                                        type="button"
                                                        className="mobile-nav-item block w-full text-left"
                                                        onClick={openMobileProjectsLocations}
                                                    >
                                                        <div className={`flex items-center justify-between py-[1.125rem] border-b ${isActiveItem ? 'border-[#d7b55a]/40' : 'border-white/10'}`}>
                                                            <span className={`text-[1.35rem] font-light tracking-[0.06em] leading-none ${isActiveItem ? 'text-[#f7e4af]' : 'text-white'}`}>
                                                                {item.label}
                                                            </span>
                                                            <svg className={`w-5 h-5 ${isActiveItem ? 'text-[#d7b55a]' : 'text-white/40'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                );
                                            }

                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={`/${item.page}`}
                                                    className="mobile-nav-item block"
                                                    onClick={closeMobileMenu}
                                                >
                                                    <div className={`flex items-center justify-between py-[1.125rem] border-b ${isActiveItem ? 'border-[#d7b55a]/40' : 'border-white/10'}`}>
                                                        <span className={`text-[1.35rem] font-light tracking-[0.06em] leading-none ${isActiveItem ? 'text-[#f7e4af]' : 'text-white'}`}>
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    {filteredMobileItems.length === 0 && (
                                        <div className="py-8 text-center text-white/50 text-sm tracking-wider">
                                            No results found
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="absolute inset-0 overflow-y-auto bg-[#161719] pr-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={getPanelTransform(1)}
                                >
                                    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                                        <button
                                            type="button"
                                            onClick={goBackMobilePanel}
                                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-white"
                                        >
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                            Back
                                        </button>
                                        <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">Projects</span>
                                    </div>

                                    <div className="space-y-0">
                                        {megaSections.map((section) => (
                                            <button
                                                key={section.id}
                                                type="button"
                                                className="block w-full text-left"
                                                onClick={() => openMobileProjectCategories(section)}
                                            >
                                                <div className="flex items-center justify-between gap-3 py-[1.125rem] border-b border-white/10">
                                                    <span className="text-white text-[1.35rem] font-light tracking-[0.06em] leading-none">
                                                        {section.name}
                                                    </span>
                                                    <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className="absolute inset-0 overflow-y-auto bg-[#161719] pr-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={getPanelTransform(2)}
                                >
                                    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                                        <button
                                            type="button"
                                            onClick={goBackMobilePanel}
                                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-white"
                                        >
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                            Back
                                        </button>
                                        <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">{mobileProjectSection?.name}</span>
                                    </div>

                                    {mobileProjectCategories.length > 0 ? (
                                        <div className="space-y-0">
                                            {mobileProjectCategories.map((category) => (
                                                <button
                                                    key={category.id}
                                                    type="button"
                                                    className="block w-full text-left"
                                                    onClick={() => openMobileProjectItems(category)}
                                                >
                                                    <div className="flex items-center justify-between py-[1.125rem] border-b border-white/10">
                                                        <span className="text-white text-[1.15rem] font-light tracking-[0.08em] leading-none uppercase">
                                                            {category.name}
                                                        </span>
                                                        <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center text-white/50 text-sm tracking-wider">
                                            No project categories found
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="absolute inset-0 overflow-y-auto bg-[#161719] pr-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={getPanelTransform(3)}
                                >
                                    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                                        <button
                                            type="button"
                                            onClick={goBackMobilePanel}
                                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-white"
                                        >
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                            Back
                                        </button>
                                        <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">
                                            {mobileProjectCategory?.name || 'Projects'}
                                        </span>
                                    </div>

                                    {mobileProjectItems.length > 0 ? (
                                        <div className="space-y-2">
                                            {mobileProjectItems.map((subItem) => (
                                                <Link
                                                    key={`${subItem.code}-${subItem.name}`}
                                                    href={`/${subItem.page || 'projects'}`}
                                                    className="group block rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                                                    onClick={closeMobileMenu}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-medium tracking-wider"
                                                            style={{ color: subItem.color, borderColor: `${subItem.color}80` }}
                                                        >
                                                            {subItem.code}
                                                        </span>
                                                        <span className="text-sm uppercase tracking-[0.08em] text-white/80 transition-colors group-hover:text-white">
                                                            {subItem.name}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center text-white/50 text-sm tracking-wider">
                                            No projects found
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div ref={mobileBottomActionsRef} className="pt-6 mt-6 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-[0.85rem] tracking-[0.12em] text-white/85 transition-colors hover:border-white/60 hover:text-white"
                                    >
                                        <Language fontSize="small" />
                                        <span>BANGLA</span>
                                    </button>
                                    <Link
                                        href="/contact"
                                        className="inline-flex h-11 items-center justify-center rounded-full border border-[#4ECDC4]/50 bg-[#4ECDC4]/12 px-3 text-center text-[0.72rem] font-medium tracking-[0.16em] text-[#7DE5DD] transition-all duration-300 hover:border-[#7DE5DD] hover:bg-[#4ECDC4]/20 hover:text-white"
                                        onClick={closeMobileMenu}
                                    >
                                        GET IN TOUCH
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
