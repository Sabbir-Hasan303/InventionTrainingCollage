import { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Input } from '@/Components/ui/input'
import { Textarea } from '@/Components/ui/textarea'
import { CheckCircle2, Send } from 'lucide-react'
import MenuDropdown from '@/Components/others_animation/MenuDropdown'

export default function EnquiryForm({ courseCode, courseTitle, variant = 'inline' }) {
    const [submitted, setSubmitted] = useState(false)
    const [clientErrors, setClientErrors] = useState({})
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        course_code: courseCode ?? '',
        message: '',
    })

    const courseOptions = [
        { value: 'CPP20218', title: 'CPP20218 - Certificate II in Security Operations' },
        { value: 'CHC52021', title: 'CHC52021 - Diploma of Community Services' },
        { value: 'CHC43121', title: 'CHC43121 - Certificate IV in Disability Support' },
        { value: 'CHC33021', title: 'CHC33021 - Certificate III in Individual Support' },
        { value: 'CHC43015', title: 'CHC43015 - Certificate IV in Ageing Support' },
        { value: 'CHC30121', title: 'CHC30121 - Cert III in Early Childhood Education and Care' },
    ]

    useEffect(() => {
        if (courseCode) {
            setData('course_code', courseCode)
        }
    }, [courseCode, setData])

    const handleSubmit = (e) => {
        e.preventDefault()
        const nextErrors = {}

        if (!data.first_name?.trim()) nextErrors.first_name = 'First name is required.'
        if (!data.last_name?.trim()) nextErrors.last_name = 'Last name is required.'
        if (!data.email?.trim()) nextErrors.email = 'Email address is required.'
        if (!data.phone?.trim()) nextErrors.phone = 'Phone number is required.'
        if (!data.course_code?.trim()) nextErrors.course_code = 'Course selection is required.'

        setClientErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) {
            setSubmitted(false)
            return
        }

        post('/contact/enquiry', {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true)
                setClientErrors({})
                reset()
                if (courseCode) {
                    setData('course_code', courseCode)
                }
                window.setTimeout(() => setSubmitted(false), 4000)
            },
            onError: () => {
                setSubmitted(false)
            },
        })
    }

    const getFieldError = (field) => clientErrors[field] ?? errors[field]
    const firstClientError = Object.values(clientErrors).find(Boolean)
    const firstBackendError = Object.values(errors).find(Boolean)
    const topError = firstClientError ?? firstBackendError

    const cardClass =
        variant === 'standalone'
            ? 'rounded-3xl border border-white/80 bg-[#f6f6f6] p-6 shadow-[0_28px_56px_rgba(0,0,0,0.42)] sm:p-10'
            : 'rounded-[1.4rem] border border-[#1d1f22]/12 bg-white p-6 shadow-[0_12px_28px_rgba(0,0,0,0.10)] sm:p-7'

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${cardClass} text-center`}
            >
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d7b55a] text-[#1d1f22]">
                    <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className={`mb-2 text-xl font-bold ${variant === 'standalone' ? 'text-[#111827]' : 'text-[#1d1f22]'}`}>Thank You</h3>
                <p className={`text-sm ${variant === 'standalone' ? 'text-[#5c6676]' : 'text-[#4a4f56]'}`}>
                    Your enquiry has been submitted successfully. Our team will contact you shortly.
                </p>
            </motion.div>
        )
    }

    const inputClass =
        variant === 'standalone'
            ? 'h-11 border-[#d6d6d6] bg-white text-[#0f1726] placeholder:text-[#62708a] focus-visible:ring-[#d7b55a]/40'
            : 'h-11 border-[#1d1f22]/15 bg-white text-[#1d1f22] placeholder:text-[#7a8087] focus-visible:ring-[#d7b55a]/40'

    const textareaClass =
        variant === 'standalone'
            ? 'min-h-[110px] border-[#d6d6d6] bg-white text-[#0f1726] placeholder:text-[#62708a] focus-visible:ring-[#d7b55a]/40'
            : 'min-h-[110px] border-[#1d1f22]/15 bg-white text-[#1d1f22] placeholder:text-[#7a8087] focus-visible:ring-[#d7b55a]/40'

    const dropdownTheme =
        variant === 'standalone'
            ? {
                  label: 'text-transparent',
                  triggerFrame: 'border-[#d6d6d6] bg-white shadow-none',
                  triggerText: 'text-[#0f1726]',
                  triggerPlaceholder: 'text-[#0f1726]',
                  triggerIcon: 'text-[#6b7280]',
                  chevron: 'text-[#6b7280]',
                  menuFrame: 'border-[#d6d6d6] bg-white',
                  optionTitle: 'text-[#0f1726]',
                  optionTitleSelected: 'text-[#0f1726]',
                  optionDescription: 'text-[#6b7280]',
                  optionIcon: 'text-[#6b7280]',
                  optionIconSelected: 'text-[#0f1726]',
                  optionSelectedBg: 'bg-[#f3f4f6]',
                  optionHoverBg: 'hover:bg-[#f7f7f8] focus-visible:bg-[#f7f7f8]',
              }
            : {
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

    return (
        <form onSubmit={handleSubmit} noValidate className={cardClass}>
            <h3 className={`mb-1 text-2xl font-bold ${variant === 'standalone' ? 'text-[#111827]' : 'text-[#1d1f22]'}`}>
                {courseTitle ? `Enquire About ${courseTitle}` : 'Make an Enquiry'}
            </h3>
            <p className={`mb-6 text-sm ${variant === 'standalone' ? 'text-[#5c6676]' : 'text-[#4a4f56]'}`}>
                Fill in your details and we will get back to you with course guidance.
            </p>
            {topError && (
                <p className="mb-4 rounded-lg border border-red-300/60 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {topError}
                </p>
            )}

            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                            First Name <span className="text-red-600">*</span>
                        </span>
                        <Input
                            name="first_name"
                            value={data.first_name}
                            onChange={(event) => {
                                setData('first_name', event.target.value)
                                clearErrors('first_name')
                                setClientErrors((prev) => {
                                    const next = { ...prev }
                                    delete next.first_name
                                    return next
                                })
                            }}
                            placeholder="First name"
                            required
                            className={inputClass}
                        />
                        {getFieldError('first_name') && <p className="text-xs text-red-600">{getFieldError('first_name')}</p>}
                    </label>

                    <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                            Last Name <span className="text-red-600">*</span>
                        </span>
                        <Input
                            name="last_name"
                            value={data.last_name}
                            onChange={(event) => {
                                setData('last_name', event.target.value)
                                clearErrors('last_name')
                                setClientErrors((prev) => {
                                    const next = { ...prev }
                                    delete next.last_name
                                    return next
                                })
                            }}
                            placeholder="Last name"
                            required
                            className={inputClass}
                        />
                        {getFieldError('last_name') && <p className="text-xs text-red-600">{getFieldError('last_name')}</p>}
                    </label>
                </div>

                <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                        Email Address <span className="text-red-600">*</span>
                    </span>
                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(event) => {
                            setData('email', event.target.value)
                            clearErrors('email')
                            setClientErrors((prev) => {
                                const next = { ...prev }
                                delete next.email
                                return next
                            })
                        }}
                        placeholder="Email address"
                        required
                        className={inputClass}
                    />
                    {getFieldError('email') && <p className="text-xs text-red-600">{getFieldError('email')}</p>}
                </label>

                <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                        Phone Number <span className="text-red-600">*</span>
                    </span>
                    <Input
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={(event) => {
                            setData('phone', event.target.value)
                            clearErrors('phone')
                            setClientErrors((prev) => {
                                const next = { ...prev }
                                delete next.phone
                                return next
                            })
                        }}
                        placeholder="Phone number"
                        required
                        className={inputClass}
                    />
                    {getFieldError('phone') && <p className="text-xs text-red-600">{getFieldError('phone')}</p>}
                </label>

                {courseCode ? (
                    <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                            Course <span className="text-red-600">*</span>
                        </span>
                        <Input value={`${courseCode} - ${courseTitle}`} readOnly className={inputClass} />
                    </label>
                ) : (
                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                            Course <span className="text-red-600">*</span>
                        </span>
                        <MenuDropdown
                            id="enquiry-course"
                            name="course_code"
                            label="Course"
                            labelClassName="sr-only"
                            placeholder="Select a course"
                            options={courseOptions}
                            value={data.course_code}
                            onChange={(nextValue) => {
                                setData('course_code', nextValue)
                                clearErrors('course_code')
                                setClientErrors((prev) => {
                                    const next = { ...prev }
                                    delete next.course_code
                                    return next
                                })
                            }}
                            size="md"
                            color="slate"
                            theme={dropdownTheme}
                            showTriggerIcon={false}
                            showOptionIcon={false}
                            className="max-w-none"
                            triggerClassName="h-11 rounded-md py-0 text-sm font-normal"
                            menuClassName="rounded-md p-1"
                            optionClassName="rounded-md"
                        />
                        {getFieldError('course_code') && (
                            <p className="text-xs text-red-600">{getFieldError('course_code')}</p>
                        )}
                    </div>
                )}

                <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b5563]">
                        Message
                    </span>
                    <Textarea
                        name="message"
                        value={data.message}
                        onChange={(event) => setData('message', event.target.value)}
                        placeholder="Your message"
                        rows={4}
                        className={textareaClass}
                    />
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f4c324] px-5 py-3 text-base font-medium text-[#161616] transition-all duration-300 hover:bg-[#ffd14d]"
                >
                    {processing ? 'Submitting...' : 'Submit Enquiry'}
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
            </div>
        </form>
    )
}
