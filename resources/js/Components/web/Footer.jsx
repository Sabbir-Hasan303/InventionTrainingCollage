import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { IconButton } from '@mui/material';
import {
    FacebookRounded,
    Twitter,
    Instagram,
    LinkedIn,
    YouTube,
} from '@mui/icons-material';
import WebTextField from '@/Components/WebTextField';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerGroups = [
    {
        title: 'About',
        items: [
            { label: 'Our Story', href: '/about' },
            { label: 'Leadership Team', href: '/about' },
            { label: 'Social Responsibility', href: '/about' },
            { label: 'Careers', href: '/contact' },
        ],
    },
    {
        title: 'Projects',
        items: [
            { label: 'Dhaka', href: '/projects' },
            { label: 'Gazipur', href: '/projects' },
            { label: 'Munshiganj', href: '/projects' },
            { label: 'Narayanganj', href: '/projects' },
            { label: 'Chattogram', href: '/projects' },
        ],
    },
    {
        title: 'Explore',
        items: [
            { label: 'Plots', href: '/plots' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Support',
        items: [
            { label: 'News & Media', href: '/contact' },
            { label: 'FAQs', href: '/contact' },
            { label: 'Investor Relations', href: '/contact' },
            { label: 'Help Desk', href: '/contact' },
        ],
    },
];

const socialLinks = [
    { icon: YouTube, href: '#', label: 'YouTube' },
    { icon: FacebookRounded, href: '#', label: 'Facebook' },
    { icon: LinkedIn, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
        if (!footerRef.current) return undefined;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.footer-section',
                { y: 36, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.09,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 82%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden bg-dark text-white"
        >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(215,181,90,0.16),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(78,205,196,0.12),transparent_35%)]" />

            <div className="px-6 md:px-8">
                <div className="footer-section flex flex-col gap-8 border-b border-[#d7b55a]/35 py-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                        <h2 className="mb-3 text-[21px] font-semibold leading-[27.7188px] uppercase tracking-[1.9351px] text-[#f5deb1]">
                            Get News & Updates
                        </h2>
                        <h3 className="mb-0 text-base leading-6 font-light tracking-[0.04em] text-white">
                            Stay ahead with the latest from Next Home Properties.
                        </h3>
                    </div>

                    <form className="w-full max-w-xl">
                        <div className="flex rounded-full border border-white/25 bg-white/90 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                            <WebTextField
                                type="email"
                                placeholder="Enter your email"
                                mode="light"
                                variant="outlined"
                                customSx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        minHeight: '48px',
                                        backgroundColor: 'transparent',
                                        borderRadius: '9999px',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        '&:hover fieldset': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: 'none',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        px: '20px',
                                        py: 0,
                                        fontSize: '0.875rem',
                                        color: '#0e1117',
                                        '&::placeholder': {
                                            color: '#5f636d',
                                            opacity: 1,
                                        },
                                    },
                                }}
                            />
                            <button
                                type="button"
                                className="h-12 shrink-0 rounded-full bg-[#31343b] px-6 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#1f2229]"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-2 xl:grid-cols-5">
                    <div className="footer-section xl:col-span-1">
                        <Link href="/" className="mb-5 inline-flex items-center">
                            <img
                                src="/assets/images/Logo2.png"
                                alt="Next Home Properties"
                                className="h-20 w-auto object-contain"
                            />
                        </Link>
                        <p className="max-w-xs text-base leading-6 font-light text-[rgba(255,255,255,0.6)] capitalize tracking-[0.04em]">
                            Crafting premium communities with modern planning, clean design, and
                            long-term value for families and investors.
                        </p>
                    </div>

                    {footerGroups.map((group) => (
                        <div key={group.title} className="footer-section">
                            <h4 className="mb-5 text-base leading-6 font-semibold uppercase tracking-[1.4851px] text-white">
                                {group.title}
                            </h4>
                            <ul className="space-y-3 !p-0">
                                {group.items.map((item) => (
                                    <li key={item.label} className="list-none">
                                        <Link
                                            href={item.href}
                                            className="text-base leading-6 font-light text-[rgba(255,255,255,0.6)] capitalize tracking-[0.04em] transition-colors duration-300 hover:text-[#EBC03F]"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="footer-section flex flex-col gap-5 border-t border-white/10 py-7 md:flex-row md:items-center md:justify-between">
                    <p className="text-[21px] font-semibold leading-[30px] uppercase tracking-[1.9351px] text-white/80">
                        Follow us on social media
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        {socialLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                                <IconButton
                                    key={item.label}
                                    component="a"
                                    href={item.href}
                                    aria-label={item.label}
                                    className="!h-8 !w-8 !rounded-lg !bg-[#D2AB43] !text-[#111318] transition-all duration-300 hover:!bg-[#E2BE62] hover:!-translate-y-0.5"
                                >
                                    <Icon sx={{ fontSize: 18 }} />
                                </IconButton>
                            );
                        })}
                    </div>
                </div>

                <div className="footer-section flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/privacy" className="transition-colors hover:text-white/80">
                            Privacy Policy
                        </Link>
                        <span className="hidden text-[#d7b55a] sm:inline">•</span>
                        <Link href="/terms" className="transition-colors hover:text-white/80">
                            Terms of Use
                        </Link>
                    </div>
                    <p className="mb-0">© {new Date().getFullYear()} Next Home Properties</p>
                </div>
            </div>
        </footer>
    );
}
