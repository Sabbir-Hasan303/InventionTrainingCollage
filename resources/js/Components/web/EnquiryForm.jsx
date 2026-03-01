import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/Components/ui/input'
import { Textarea } from '@/Components/ui/textarea'
import { CheckCircle2, Send } from 'lucide-react'
import MenuDropdown from '@/Components/others_animation/MenuDropdown'

export default function EnquiryForm({ courseCode, courseTitle, variant = 'inline' }) {
    const [submitted, setSubmitted] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState('')

    const courseOptions = [
        { value: 'CPP20218', title: 'CPP20218 - Certificate II in Security Operations' },
        { value: 'CHC52021', title: 'CHC52021 - Diploma of Community Services' },
        { value: 'CHC43121', title: 'CHC43121 - Certificate IV in Disability Support' },
        { value: 'CHC33021', title: 'CHC33021 - Certificate III in Individual Support' },
        { value: 'CHC43015', title: 'CHC43015 - Certificate IV in Ageing Support' },
        { value: 'CHC30121', title: 'CHC30121 - Cert III in Early Childhood Education and Care' },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 4000)
    }

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
        <form onSubmit={handleSubmit} className={cardClass}>
            <h3 className={`mb-1 text-2xl font-bold ${variant === 'standalone' ? 'text-[#111827]' : 'text-[#1d1f22]'}`}>
                {courseTitle ? `Enquire About ${courseTitle}` : 'Make an Enquiry'}
            </h3>
            <p className={`mb-6 text-sm ${variant === 'standalone' ? 'text-[#5c6676]' : 'text-[#4a4f56]'}`}>
                Fill in your details and we will get back to you with course guidance.
            </p>

            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input placeholder="First Name *" required className={inputClass} />
                    <Input placeholder="Last Name *" required className={inputClass} />
                </div>

                <Input type="email" placeholder="Email Address *" required className={inputClass} />
                <Input type="tel" placeholder="Phone Number *" required className={inputClass} />

                {courseCode ? (
                    <Input value={`${courseCode} - ${courseTitle}`} readOnly className={inputClass} />
                ) : (
                    <MenuDropdown
                        id="enquiry-course"
                        name="course_code"
                        label="Course"
                        labelClassName="sr-only"
                        placeholder="Select a course (optional)"
                        options={courseOptions}
                        value={selectedCourse}
                        onChange={(nextValue) => setSelectedCourse(nextValue)}
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
                )}

                <Textarea placeholder="Your message" rows={4} className={textareaClass} />

                <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f4c324] px-5 py-3 text-base font-medium text-[#161616] transition-all duration-300 hover:bg-[#ffd14d]"
                >
                    Submit Enquiry
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
            </div>
        </form>
    )
}
