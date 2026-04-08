import React, { useCallback, useEffect, useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import {
    ArrowRight,
    CheckCircle2,
    CircleHelp,
    Headset,
    MessageSquareText,
    PhoneCall,
    ShieldCheck,
    Sparkles,
} from 'lucide-react'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import WebLayout from '@/Layouts/WebLayout'

const FORM_SCROLL_OFFSET = 164

const supportOptions = [
    { label: 'Email Support', value: 'email' },
    { label: 'Online Application', value: 'online-application' },
    { label: 'Others', value: 'others' },
]

const supportPillars = [
    {
        title: 'Technical Guidance',
        description: 'Ask for platform support, login help, and system-related assistance quickly.',
        icon: Headset,
    },
    {
        title: 'Student Voice',
        description: 'Share your learning experience so we can continuously improve your journey.',
        icon: MessageSquareText,
    },
    {
        title: 'Response Priority',
        description: 'Student ID based requests are reviewed first for faster and accurate support.',
        icon: ShieldCheck,
    },
]

const supportGuidelines = [
    'Include your Student ID for faster verification.',
    'Choose the support option that best matches your issue.',
    'Provide key details in your message so our team can resolve quickly.',
]

const feedbackGuidelines = [
    'Tell us what worked well in your learning experience.',
    'Share practical suggestions for classes, resources, or support.',
    'Use the subject field so your feedback reaches the right team faster.',
]

const responseNotes = [
    'Provide your details accurately for smooth follow-up.',
    'Use your official student email if available.',
    'Include key context in your message to speed up resolution.',
]

const initialSupportForm = {
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    supportOption: 'email',
    message: '',
}

const initialFeedbackForm = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
}

export default function CurrentStudents() {
    const [supportForm, setSupportForm] = useState(initialSupportForm)
    const [feedbackForm, setFeedbackForm] = useState(initialFeedbackForm)
    const [supportSubmitted, setSupportSubmitted] = useState(false)
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

    const scrollToForm = useCallback((targetId, syncHash = true) => {
        const target = document.getElementById(targetId)
        if (!target) return

        if (syncHash && window.location.hash !== `#${targetId}`) {
            window.history.replaceState(null, '', `#${targetId}`)
        }

        const smoother = ScrollSmoother.get()
        if (smoother) {
            smoother.scrollTo(target, true, `top top+=${FORM_SCROLL_OFFSET}`)
            return
        }

        const top = target.getBoundingClientRect().top + window.pageYOffset - FORM_SCROLL_OFFSET
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }, [])

    useEffect(() => {
        let timeoutId

        const scrollFromHash = () => {
            const hash = window.location.hash.replace('#', '')
            if (!hash) return
            scrollToForm(hash, false)
        }

        const frameId = requestAnimationFrame(() => {
            timeoutId = window.setTimeout(scrollFromHash, 60)
        })

        const handleHashChange = () => scrollFromHash()
        window.addEventListener('hashchange', handleHashChange)

        return () => {
            cancelAnimationFrame(frameId)
            if (timeoutId) window.clearTimeout(timeoutId)
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [scrollToForm])

    const handleSupportChange = (event) => {
        const { name, value } = event.target
        setSupportForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleFeedbackChange = (event) => {
        const { name, value } = event.target
        setFeedbackForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSupportSubmit = (event) => {
        event.preventDefault()
        setSupportSubmitted(true)
        setSupportForm(initialSupportForm)
    }

    const handleFeedbackSubmit = (event) => {
        event.preventDefault()
        setFeedbackSubmitted(true)
        setFeedbackForm(initialFeedbackForm)
    }

    return (
        <WebLayout>
            <Head title="Current Students" />

            <section className="relative isolate overflow-hidden bg-[#10151f] pt-28 sm:pt-32">
                <img
                    src="/assets/images/learning-pathways.avif"
                    alt="Current students at Invention Training"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(8,12,20,0.9)_18%,rgba(8,12,20,0.62)_56%,rgba(8,12,20,0.84)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(215,181,90,0.28),transparent_42%)]" />

                <div className="web-giant-container relative z-10 flex min-h-[68vh] items-end pb-14 sm:pb-20">
                    <div className="max-w-4xl">
                        <span className="mb-5 inline-flex rounded-full border border-[#d7b55a]/55 bg-[#d7b55a]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                            Current Students
                        </span>
                        <h1 className="mb-4 text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
                            Student Support and Feedback Hub
                        </h1>
                        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
                            Submit the right form, provide key details, and we will follow up as soon as possible.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => scrollToForm('student-it-support')}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#d7b55a] px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#1d1f22] transition hover:bg-[#e4c67a]"
                            >
                                Student IT Support
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToForm('student-feedback')}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:border-white/60 hover:bg-white/10"
                            >
                                Student Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light py-14 sm:py-16">
                <div className="web-giant-container">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {supportPillars.map((item) => {
                            const Icon = item.icon
                            return (
                                <article
                                    key={item.title}
                                    className="rounded-2xl border border-[#1d1f22]/12 bg-white p-5 shadow-[0_18px_40px_rgba(17,24,39,0.08)]"
                                >
                                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#1d1f22] text-white">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <h2 className="mb-2 text-xl font-bold text-[#1d1f22]">{item.title}</h2>
                                    <p className="text-sm leading-relaxed text-[#4b5563]">{item.description}</p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section
                id="student-it-support"
                style={{ scrollMarginTop: `${FORM_SCROLL_OFFSET}px` }}
                className="bg-light py-14 sm:py-16"
            >
                <div className="web-giant-container">
                    <div className="mb-8 max-w-3xl">
                        <h2 className="text-3xl font-bold leading-tight text-[#0f172a] sm:text-[2.15rem]">
                            Students IT Support
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
                        <aside className="overflow-hidden rounded-[1.35rem] border border-[#d7b55a]/25 bg-white shadow-[0_16px_34px_rgba(17,24,39,0.09)]">
                            <img
                                src="/assets/images/training-provider2.png"
                                alt="Students receiving technical support"
                                className="h-56 w-full object-cover sm:h-64"
                            />
                            <div className="p-6 sm:p-7">
                                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7b55a]/45 bg-[#d7b55a]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a6b1f]">
                                    <Headset className="h-3.5 w-3.5" />
                                    Support Request
                                </p>
                                <p className="mb-4 text-sm leading-relaxed text-[#374151]">
                                    Raise technical issues related to student systems, account access, online application,
                                    or other IT concerns. Our team will review and follow up.
                                </p>
                                <div className="space-y-2.5">
                                    {supportGuidelines.map((item) => (
                                        <div key={item} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="mt-[1px] h-4 w-4 shrink-0 text-[#8a6b1f]" />
                                            <p className="text-sm text-[#374151]">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        <article className="rounded-[1.35rem] border border-[#d1d5db] bg-white p-6 shadow-[0_16px_34px_rgba(17,24,39,0.09)] sm:p-8">
                            {supportSubmitted && (
                                <p className="mb-4 rounded-lg border border-emerald-300/60 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                                    Your IT support request has been recorded.
                                </p>
                            )}

                            <form onSubmit={handleSupportSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <label className="space-y-1.5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Full Name
                                        </span>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={supportForm.fullName}
                                            onChange={handleSupportChange}
                                            required
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="Enter full name"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Email
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={supportForm.email}
                                            onChange={handleSupportChange}
                                            required
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="name@example.com"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Phone Number
                                        </span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={supportForm.phone}
                                            onChange={handleSupportChange}
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="Enter phone number"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Student ID (Required)
                                        </span>
                                        <input
                                            type="text"
                                            name="studentId"
                                            value={supportForm.studentId}
                                            onChange={handleSupportChange}
                                            required
                                            className="w-full rounded-xl border border-[#d7b55a]/55 bg-[#fffaf0] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="Enter student ID"
                                        />
                                    </label>

                                    <fieldset className="space-y-2 sm:col-span-2">
                                        <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Support Option
                                        </legend>
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                            {supportOptions.map((option) => (
                                                <label
                                                    key={option.value}
                                                    className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] transition ${supportForm.supportOption === option.value
                                                        ? 'border-[#d7b55a] bg-[#fff6de] text-[#8a6b1f]'
                                                        : 'border-[#d1d5db] bg-[#f9fafb] text-[#4b5563] hover:border-[#9ca3af]'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="supportOption"
                                                        value={option.value}
                                                        checked={supportForm.supportOption === option.value}
                                                        onChange={handleSupportChange}
                                                        className="sr-only"
                                                    />
                                                    {option.label}
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>

                                    <label className="space-y-1.5 sm:col-span-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">Message</span>
                                        <textarea
                                            name="message"
                                            value={supportForm.message}
                                            onChange={handleSupportChange}
                                            required
                                            rows={5}
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="Describe your issue or support request"
                                        />
                                    </label>
                                </div>



                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#d7b55a] px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#1d1f22] transition hover:bg-[#e4c67a]"
                                >
                                    Submit IT Support
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </form>
                        </article>
                    </div>
                </div>
            </section>

            <section
                id="student-feedback"
                style={{ scrollMarginTop: `${FORM_SCROLL_OFFSET}px` }}
                className="bg-light py-14 sm:py-16"
            >
                <div className="web-giant-container">
                    <div className="mb-8 max-w-3xl">
                        <h2 className="text-3xl font-bold leading-tight text-[#0f172a] sm:text-[2.15rem]">
                            Student Feedback
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
                        <article className="rounded-[1.35rem] border border-[#d1d5db] bg-white p-6 shadow-[0_16px_34px_rgba(17,24,39,0.09)] sm:p-8">
                            {feedbackSubmitted && (
                                <p className="mb-4 rounded-lg border border-cyan-300/50 bg-cyan-100 px-3 py-2 text-sm text-cyan-800">
                                    Thank you, your feedback has been received.
                                </p>
                            )}

                            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <label className="space-y-1.5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Full Name
                                        </span>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={feedbackForm.fullName}
                                            onChange={handleFeedbackChange}
                                            required
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="Enter full name"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Email
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={feedbackForm.email}
                                            onChange={handleFeedbackChange}
                                            required
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="name@example.com"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Phone Number
                                        </span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={feedbackForm.phone}
                                            onChange={handleFeedbackChange}
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="Enter phone number"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                            Subject
                                        </span>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={feedbackForm.subject}
                                            onChange={handleFeedbackChange}
                                            required
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="Subject"
                                        />
                                    </label>

                                    <label className="space-y-2 sm:col-span-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">Message</span>
                                        <textarea
                                            name="message"
                                            value={feedbackForm.message}
                                            onChange={handleFeedbackChange}
                                            required
                                            rows={7}
                                            className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                            placeholder="Share your experience, suggestion, or concern"
                                        />
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#4ecdc4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#10151f] transition hover:bg-[#68dbd3]"
                                >
                                    Submit Feedback
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </form>
                        </article>

                        <aside className="overflow-hidden rounded-[1.35rem] border border-[#cbd5e1] bg-white shadow-[0_16px_34px_rgba(17,24,39,0.09)]">
                            <img
                                src="/assets/images/learning-pathways.avif"
                                alt="Students sharing feedback"
                                className="h-56 w-full object-cover sm:h-64"
                            />
                            <div className="p-6 sm:p-7">
                                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#4ecdc4]/45 bg-[#4ecdc4]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#0b7f77]">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Share Your Voice
                                </p>
                                <p className="mb-4 text-sm leading-relaxed text-[#374151]">
                                    Your feedback helps us improve training quality, student support, and overall learning
                                    experience for current and future students.
                                </p>
                                <div className="space-y-2.5">
                                    {feedbackGuidelines.map((item) => (
                                        <div key={item} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="mt-[1px] h-4 w-4 shrink-0 text-[#0b7f77]" />
                                            <p className="text-sm text-[#374151]">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="bg-light py-14 sm:py-16">
                <div className="web-giant-container">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <article className="rounded-[1.35rem] border border-[#1d1f22]/10 bg-white p-6 shadow-[0_18px_38px_rgba(17,24,39,0.08)] sm:p-7">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6b1f]">
                                Before You Submit
                            </p>
                            <h3 className="mb-4 text-2xl font-bold text-[#1d1f22] sm:text-[1.8rem]">
                                Tips for Faster Resolution
                            </h3>

                            <div className="space-y-3">
                                {responseNotes.map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#d7b55a]" />
                                        <p className="text-sm leading-relaxed text-[#374151] sm:text-base">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <aside className="rounded-[1.35rem] border border-[#1d1f22]/10 bg-[#1a1f29] p-6 shadow-[0_18px_40px_rgba(17,24,39,0.14)] sm:p-7">
                            <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                                <CircleHelp className="h-4 w-4" />
                                Need Urgent Help?
                            </p>
                            <h3 className="mb-3 text-2xl font-bold text-white">Reach Student Services</h3>
                            <p className="mb-6 text-sm leading-relaxed text-white/75">
                                For urgent academic or administrative support, contact the college directly while your
                                online request is being processed.
                            </p>

                            <div className="space-y-3">
                                <a
                                    href="tel:+0492050353"
                                    className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/85 transition hover:border-white/35"
                                >
                                    <PhoneCall className="h-4 w-4 text-[#f7dda0]" />
                                    +0492 050 353
                                </a>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#d7b55a] px-4 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#1d1f22] transition hover:bg-[#e4c67a]"
                                >
                                    Contact
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}
