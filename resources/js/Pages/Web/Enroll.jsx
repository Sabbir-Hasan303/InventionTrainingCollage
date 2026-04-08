import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import { ArrowRight, CheckCircle2, FileText, GraduationCap, Upload } from 'lucide-react'
import WebLayout from '@/Layouts/WebLayout'
import MenuDropdown from '@/Components/others_animation/MenuDropdown'

const subjectOptions = [
    { value: 'CPP20218 - Certificate II in Security Operations', title: 'CPP20218 - Certificate II in Security Operations' },
    { value: 'CHC52021 - Diploma of Community Services', title: 'CHC52021 - Diploma of Community Services' },
    { value: 'CHC43121 - Certificate IV in Disability Support', title: 'CHC43121 - Certificate IV in Disability Support' },
    { value: 'CHC33021 - Certificate III in Individual Support', title: 'CHC33021 - Certificate III in Individual Support' },
    { value: 'CHC43015 - Certificate IV in Ageing Support', title: 'CHC43015 - Certificate IV in Ageing Support' },
    { value: 'CHC30121 - Certificate III in Early Childhood Education and Care', title: 'CHC30121 - Certificate III in Early Childhood Education and Care' },
    { value: 'Other', title: 'Other' },
]

const initialForm = {
    name: '',
    email: '',
    phone: '',
    subject_to_read: '',
    career_goal_statement: '',
    previous_study: '',
    document: null,
}

export default function Enroll() {
    const [form, setForm] = useState(initialForm)
    const [submitted, setSubmitted] = useState(false)
    const [fileInputKey, setFileInputKey] = useState(0)
    const [subjectError, setSubjectError] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] ?? null
        setForm((prev) => ({ ...prev, document: file }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!form.subject_to_read) {
            setSubjectError('Please select a subject.')
            return
        }
        setSubjectError('')
        setSubmitted(true)
        setForm(initialForm)
        setFileInputKey((prev) => prev + 1)
    }

    const dropdownTheme = {
        label: 'text-[#4b5563]',
        triggerFrame: 'border-[#d1d5db] bg-[#f9fafb] shadow-none',
        triggerText: 'text-[#111827]',
        triggerPlaceholder: 'text-[#111827]',
        triggerIcon: 'text-[#6b7280]',
        chevron: 'text-[#6b7280]',
        menuFrame: 'border-[#d1d5db] bg-white',
        optionTitle: 'text-[#111827]',
        optionTitleSelected: 'text-[#111827]',
        optionDescription: 'text-[#6b7280]',
        optionIcon: 'text-[#6b7280]',
        optionIconSelected: 'text-[#111827]',
        optionSelectedBg: 'bg-[#f3f4f6]',
        optionHoverBg: 'hover:bg-[#f7f7f8] focus-visible:bg-[#f7f7f8]',
    }

    return (
        <WebLayout>
            <Head title="Enroll" />

            <section className="relative isolate min-h-[72vh] overflow-hidden pt-28 sm:pt-32">
                <img
                    src="/assets/images/learning-pathways.avif"
                    alt="Students planning their learning pathway"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(10,12,16,0.92)_16%,rgba(10,12,16,0.6)_56%,rgba(10,12,16,0.84)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(215,181,90,0.26),transparent_42%)]" />

                <div className="web-giant-container relative z-10 flex min-h-[72vh] items-end pb-14 sm:pb-20">
                    <div className="max-w-4xl">
                        <span className="mb-5 inline-flex rounded-full border border-[#d7b55a]/55 bg-[#d7b55a]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f7dda0]">
                            Enroll Now
                        </span>
                        <h1 className="mb-4 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                            Start Your Enrollment Application
                        </h1>
                        <p className="max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
                            Complete the form below to begin your enrollment process. Share your study interest,
                            career goal, previous study, and supporting document.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-light py-14 sm:py-16">
                <div className="web-giant-container">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <aside className="rounded-[1.35rem] border border-[#1d1f22]/12 bg-white p-6 shadow-[0_18px_38px_rgba(17,24,39,0.08)] sm:p-7">
                            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7b55a]/45 bg-[#d7b55a]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a6b1f]">
                                <GraduationCap className="h-3.5 w-3.5" />
                                Enrollment Guide
                            </p>

                            <h2 className="mb-3 text-2xl font-bold text-[#0f172a] sm:text-[1.8rem]">
                                What to Prepare
                            </h2>
                            <p className="mb-5 text-sm leading-relaxed text-[#3f4650]">
                                Submit accurate details to help admissions assess your application quickly.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="mt-[1px] h-4 w-4 shrink-0 text-[#8a6b1f]" />
                                    <p className="text-sm text-[#374151]">Use your active email and phone number.</p>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="mt-[1px] h-4 w-4 shrink-0 text-[#8a6b1f]" />
                                    <p className="text-sm text-[#374151]">Write a clear career path/career goal statement.</p>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="mt-[1px] h-4 w-4 shrink-0 text-[#8a6b1f]" />
                                    <p className="text-sm text-[#374151]">Upload one supporting document in the allowed format.</p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-xl border border-[#1d1f22]/10 bg-[#f8fafc] p-4">
                                <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#0f766e]">
                                    <FileText className="h-3.5 w-3.5" />
                                    Accepted Document Types
                                </p>
                                <p className="text-sm text-[#3f4650]">PDF, DOC, DOCX, JPG, JPEG, PNG</p>
                            </div>
                        </aside>

                        <article className="rounded-[1.35rem] border border-[#1d1f22]/12 bg-white p-6 shadow-[0_18px_38px_rgba(17,24,39,0.08)] sm:p-8">
                            {submitted && (
                                <p className="mb-5 rounded-lg border border-emerald-300/60 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                                    Enrollment request submitted successfully. Our admissions team will contact you soon.
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                                <label className="space-y-2 sm:col-span-1">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="h-[50px] w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                        placeholder="Enter full name"
                                    />
                                </label>

                                <label className="space-y-2 sm:col-span-1">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">Email</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="h-[50px] w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                        placeholder="name@example.com"
                                    />
                                </label>

                                <label className="space-y-2 sm:col-span-1">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">Phone</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                        className="h-[50px] w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                        placeholder="Enter phone number"
                                    />
                                </label>

                                <div className="space-y-2 sm:col-span-1">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">Subject</span>
                                    <MenuDropdown
                                        id="enroll-subject"
                                        name="subject_to_read"
                                        label="Subject"
                                        placeholder="Select a subject"
                                        options={subjectOptions}
                                        value={form.subject_to_read}
                                        onChange={(nextValue) => {
                                            setForm((prev) => ({ ...prev, subject_to_read: nextValue }))
                                            if (nextValue) setSubjectError('')
                                        }}
                                        size="md"
                                        color="slate"
                                        theme={dropdownTheme}
                                        showTriggerIcon={false}
                                        showOptionIcon={false}
                                        className="max-w-none"
                                        labelClassName="sr-only mb-0"
                                        triggerClassName="h-[50px] rounded-xl px-3 py-0 text-sm font-normal"
                                        menuClassName="rounded-xl p-1"
                                        optionClassName="rounded-lg"
                                    />
                                    {subjectError && <p className="mt-2 text-xs text-red-600">{subjectError}</p>}
                                </div>

                                <label className="space-y-2 sm:col-span-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                        Career Goal
                                    </span>
                                    <textarea
                                        name="career_goal_statement"
                                        value={form.career_goal_statement}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                        placeholder="Describe your career path or career goals"
                                    />
                                </label>

                                <label className="space-y-2 sm:col-span-1">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                                        Previous Study (Last Read Class)
                                    </span>
                                    <input
                                        type="text"
                                        name="previous_study"
                                        value={form.previous_study}
                                        onChange={handleChange}
                                        required
                                        className="h-[50px] w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 text-sm text-[#111827] placeholder:text-[#6b7280]"
                                        placeholder="e.g. Year 12, Diploma, Bachelor"
                                    />
                                </label>

                                <label className="space-y-2 sm:col-span-1">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">Academic Documents</span>
                                    <div className="flex h-[50px] cursor-pointer items-center gap-2 rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 text-sm text-[#111827]">
                                        <Upload className="h-4 w-4 text-[#6b7280]" />
                                        <span className="truncate">{form.document ? form.document.name : 'Choose a file'}</span>
                                        <input
                                            key={fileInputKey}
                                            type="file"
                                            name="document"
                                            onChange={handleFileChange}
                                            required
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            className="hidden"
                                        />
                                    </div>
                                    <p className="text-xs text-[#6b7280]">Accepted: PDF, DOC, DOCX, JPG, JPEG, PNG</p>
                                </label>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#d7b55a] px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#1d1f22] transition hover:bg-[#e4c67a]"
                                    >
                                        Submit Enrollment
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}
