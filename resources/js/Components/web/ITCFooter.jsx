import React from 'react'
import { Link } from '@inertiajs/react'
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'All Courses', path: '/courses' },
    { label: 'Students', path: '/students' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Contact', path: '/contact' },
]

const courseLinks = [
    { label: 'Certificate II in Security Operations', path: '/courses/certificate-ii-in-security-operations' },
    { label: 'Diploma of Community Services', path: '/courses/diploma-of-community-services' },
    { label: 'Certificate IV in Disability Support', path: '/courses/certificate-iv-in-disability-support' },
    { label: 'Certificate III in Individual Support', path: '/courses/certificate-iii-in-individual-support' },
    { label: 'Certificate IV in Ageing Support', path: '/courses/certificate-iv-in-ageing-support' },
    { label: 'Certificate III in Early Childhood Education', path: '/courses/certificate-iii-in-early-childhood-education-and-care' },
]

const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
]

export default function ITCFooter() {
    return (
        <footer className="relative overflow-hidden bg-dark text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#d7b55a]/12 blur-3xl" />
                <div className="absolute -right-20 top-14 h-80 w-80 rounded-full bg-[#4ecdc4]/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.08),transparent_55%)]" />
            </div>

            <div className="web-giant-container relative z-10 py-14 sm:py-16">
                <div className="mb-12 rounded-3xl border border-[#d7b55a]/25 bg-white/[0.03] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <span className="mb-4 inline-flex rounded-full border border-[#d7b55a]/55 bg-[#d7b55a]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7dda0]">
                                RTO 46008
                            </span>
                            <h2 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                                Nationally Recognised Training for Real Career Outcomes
                            </h2>
                            <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                                Build practical skills with compliant, industry-relevant qualifications delivered by
                                experienced trainers.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 self-start rounded-2xl border border-[#d7b55a]/55 bg-[#d7b55a]/12 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffe8af] transition-all duration-300 hover:border-[#e7c877] hover:bg-[#d7b55a]/20"
                        >
                            Talk to Admissions
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 xl:grid-cols-4">
                    <div className="xl:col-span-1">
                        <Link href="/" className="mb-5 inline-flex items-center gap-3">
                            <img src="/assets/images/ITC-logo.jpg" alt="Invention Training College" className="h-24 w-auto object-contain" />
                        </Link>
                        <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/65">
                            Invention Training College Pty Ltd delivers nationally recognised qualifications in community
                            services, aged care, disability, childcare, and security.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((item) => {
                                const Icon = item.icon
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        aria-label={item.label}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d7b55a]/65 hover:bg-[#d7b55a]/15 hover:text-[#f9e3ab]"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">Quick Links</h4>
                        <ul className="space-y-3 !p-0">
                            {quickLinks.map((link) => (
                                <li key={link.path} className="list-none">
                                    <Link
                                        href={link.path}
                                        className="text-sm text-white/68 transition-colors duration-300 hover:text-[#f4d489]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">Popular Courses</h4>
                        <ul className="space-y-3 !p-0">
                            {courseLinks.map((link) => (
                                <li key={link.path} className="list-none">
                                    <Link
                                        href={link.path}
                                        className="text-sm text-white/68 transition-colors duration-300 hover:text-[#f4d489]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">Contact</h4>
                        <ul className="space-y-4 !p-0">
                            <li className="list-none">
                                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                                    <MapPin className="mt-0.5 h-4 w-4 text-[#f1ce7e]" />
                                    <span className="text-sm leading-relaxed text-white/70">
                                        Suite 1, Level 1, 40 Raymond Street, Bankstown NSW 2200
                                    </span>
                                </div>
                            </li>
                            <li className="list-none">
                                <a
                                    href="tel:+61403343814"
                                    className="flex items-center gap-3 text-sm text-white/70 transition-colors duration-300 hover:text-[#f4d489]"
                                >
                                    <Phone className="h-4 w-4 text-[#f1ce7e]" />
                                    +61 403 343 814
                                </a>
                            </li>
                            <li className="list-none">
                                <a
                                    href="mailto:info@inventiontraining.edu.au"
                                    className="flex items-center gap-3 text-sm text-white/70 transition-colors duration-300 hover:text-[#f4d489]"
                                >
                                    <Mail className="h-4 w-4 text-[#f1ce7e]" />
                                    info@inventiontraining.edu.au
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-4 py-6 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between">
                    {/* <div className="flex flex-wrap items-center gap-4">
                        <Link href="/privacy" className="transition-colors duration-300 hover:text-white/80">
                            Privacy Policy
                        </Link>
                        <span className="hidden text-[#d7b55a] sm:inline">|</span>
                        <Link href="/assessment-policy" className="transition-colors duration-300 hover:text-white/80">
                            Assessment Policy
                        </Link>
                        <span className="hidden text-[#d7b55a] sm:inline">|</span>
                        <Link href="/terms" className="transition-colors duration-300 hover:text-white/80">
                            Terms and Conditions
                        </Link>
                    </div> */}
                    <p className="mb-0">Copyright {new Date().getFullYear()} Invention Training College Pty Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
