import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileCheck2, PhoneCall, Scale, Send, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import WebLayout from '@/Layouts/WebLayout';
import MenuDropdown from '@/Components/others_animation/MenuDropdown';

const defaultFormData = {
    locality: '',
    address: '',
    landSize: '',
    roadWidth: '',
    category: '',
    facing: '',
    attractiveFeature: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
};

const categoryOptions = [
    { value: 'freehold', title: 'Freehold' },
    { value: 'leasehold', title: 'Leasehold' },
];

const attractiveFeatureOptions = [
    { value: 'lakeside', title: 'Lakeside' },
    { value: 'corner_plot', title: 'Corner Plot' },
    { value: 'park_view', title: 'Park View' },
    { value: 'main_road', title: 'Main Road' },
    { value: 'others', title: 'Others' },
];

const dropdownTheme = {
    triggerFrame: 'border-[#1f252d]/14 bg-white',
    triggerText: 'text-[#1f252d]',
    triggerPlaceholder: 'text-[#1f252d]/45',
    chevron: 'text-[#1f252d]/45',
    menuFrame: 'border-[#1f252d]/12 bg-white',
    optionTitle: 'text-[#1f252d]',
    optionTitleSelected: 'text-[#0f3f38]',
    optionDescription: 'text-[#1f252d]/60',
    optionSelectedBg: 'bg-[#0f3f38]/10',
    optionHoverBg: 'hover:bg-[#0f3f38]/[0.06] focus-visible:bg-[#0f3f38]/[0.06]',
};

const valueItems = [
    {
        title: 'Transparent Valuation',
        description: 'Get a fair, market-backed estimate before any commitment.',
        Icon: Scale,
    },
    {
        title: 'Legal & Documentation Support',
        description: 'Our team helps verify documents and streamline legal coordination.',
        Icon: ShieldCheck,
    },
    {
        title: 'Fast Expert Follow-Up',
        description: 'Receive a quick callback from our acquisition specialists.',
        Icon: PhoneCall,
    },
];

const inputBaseClass =
    'h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#1f252d] outline-none transition-colors placeholder:text-[#1f252d]/45 focus:border-[#2FA89D]/65';

function isPositiveNumber(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0;
}

function validate(formData) {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneAllowedRegex = /^[+\d\s\-()]+$/;

    if (!formData.address.trim()) nextErrors.address = 'Address is required.';
    if (!formData.landSize.trim()) {
        nextErrors.landSize = 'Land size is required.';
    } else if (!isPositiveNumber(formData.landSize)) {
        nextErrors.landSize = 'Land size must be a number greater than 0.';
    }

    if (!formData.roadWidth.trim()) {
        nextErrors.roadWidth = 'Road width is required.';
    } else if (!isPositiveNumber(formData.roadWidth)) {
        nextErrors.roadWidth = 'Road width must be a number greater than 0.';
    }

    if (!formData.category) nextErrors.category = 'Please select a category.';
    if (!formData.facing.trim()) nextErrors.facing = 'Facing is required.';
    if (!formData.ownerName.trim()) nextErrors.ownerName = 'Landowner name is required.';

    if (!formData.ownerEmail.trim()) {
        nextErrors.ownerEmail = 'Email is required.';
    } else if (!emailRegex.test(formData.ownerEmail.trim())) {
        nextErrors.ownerEmail = 'Please enter a valid email address.';
    }

    if (!formData.ownerPhone.trim()) {
        nextErrors.ownerPhone = 'Contact number is required.';
    } else {
        const digitsOnly = formData.ownerPhone.replace(/\D/g, '');
        if (!phoneAllowedRegex.test(formData.ownerPhone.trim()) || digitsOnly.length < 8 || digitsOnly.length > 15) {
            nextErrors.ownerPhone = 'Please enter a valid contact number.';
        }
    }

    return nextErrors;
}

export default function Landowner() {
    const [formData, setFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const setField = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
            if (!prev[key]) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate(formData);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            toast.error('Please correct the highlighted fields.');
            return;
        }

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 900));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData(defaultFormData);
        toast.success('Land details submitted successfully.');
    };

    return (
        <WebLayout>
            <div className="overflow-hidden bg-light">
                <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-40">
                    <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2200&q=80"
                        alt="Landowner partnership"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#111317]/90" />

                    <div className="web-giant-container relative">
                        <motion.div
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            className="mx-auto max-w-4xl text-center"
                        >
                            <p className="hero-sub-title text-[#7de5dd]">For Landowners</p>
                            <h1 className="hero-title mt-5 text-[#fffce1]">Partner With Next Home Properties</h1>
                            <p className="hero-description mx-auto mt-6 max-w-3xl text-white/80">
                                Share your land details with our acquisition team for structured evaluation, planning support,
                                and fast response from experienced real estate professionals.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="relative -mt-10 pb-12 md:-mt-14 md:pb-14">
                    <div className="web-giant-container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45 }}
                            className="grid gap-4 rounded-[24px] border border-[#0f3f38]/10 bg-[linear-gradient(180deg,#ffffff_0%,#f6f5ef_100%)] p-5 shadow-[0_22px_46px_rgba(15,23,42,0.1)] md:grid-cols-3 md:gap-5 md:p-7"
                        >
                            {valueItems.map((item) => (
                                <article key={item.title} className="rounded-2xl border border-[#1f252d]/10 bg-white/90 p-5">
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f3f38]/[0.09] text-[#0f3f38]">
                                        <item.Icon className="h-5 w-5" />
                                    </div>
                                    <h2 className="card-title-sm mt-4 text-[#1d1f22]">{item.title}</h2>
                                    <p className="card-description-sm mt-2 text-[#1d1f22]/70">{item.description}</p>
                                </article>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="relative pb-24 md:pb-28">
                    <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#2FA89D]/10 blur-3xl" />
                    <div className="pointer-events-none absolute -right-20 top-52 h-72 w-72 rounded-full bg-[#c99855]/10 blur-3xl" />

                    <div className="web-giant-container relative">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="overflow-visible rounded-[28px] border border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7f5ef_100%)] p-5 shadow-[0_22px_52px_rgba(15,23,42,0.08)] md:p-8 lg:p-10"
                        >
                            <div className="mb-8">
                                <p className="section-sub-title text-[#6e5d2e]">Landowner Form</p>
                                <h2 className="card-title-sm mt-2 text-[#1d1f22]">Tell Us About Your Land</h2>
                                <p className="card-description-sm mt-2 max-w-3xl text-[#1d1f22]/70">
                                    Fill out the details below and our team will reach out with the next steps.
                                </p>
                            </div>

                            {isSubmitted && (
                                <div className="mb-8 rounded-2xl border border-[#2FA89D]/35 bg-[#2FA89D]/[0.1] p-4 md:p-5">
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#0f3f38]" />
                                            <p className="card-description-sm text-[#0f3f38]">
                                                Your land details were submitted successfully. Our team will contact you soon.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsSubmitted(false)}
                                            className="inline-flex items-center gap-2 rounded-xl border border-[#0f3f38]/25 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#0f3f38] transition-colors hover:bg-[#0f3f38]/[0.06]"
                                        >
                                            <FileCheck2 className="h-3.5 w-3.5" />
                                            Submit Another
                                        </button>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-8">
                                    <p className="card-title-sm text-[#1d1f22]">Land Information</p>
                                    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        <div>
                                            <input
                                                type="text"
                                                value={formData.locality}
                                                onChange={(event) => setField('locality', event.target.value)}
                                                placeholder="Locality"
                                                className={`${inputBaseClass} border-[#1f252d]/14`}
                                            />
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                value={formData.address}
                                                onChange={(event) => setField('address', event.target.value)}
                                                placeholder="Address*"
                                                className={`${inputBaseClass} ${errors.address ? 'border-red-500/80' : 'border-[#1f252d]/14'}`}
                                            />
                                            {errors.address && <p className="mt-1.5 text-xs text-red-600">{errors.address}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                value={formData.landSize}
                                                onChange={(event) => setField('landSize', event.target.value)}
                                                placeholder="Size Of The Land In Kathas*"
                                                className={`${inputBaseClass} ${errors.landSize ? 'border-red-500/80' : 'border-[#1f252d]/14'}`}
                                            />
                                            {errors.landSize && <p className="mt-1.5 text-xs text-red-600">{errors.landSize}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                value={formData.roadWidth}
                                                onChange={(event) => setField('roadWidth', event.target.value)}
                                                placeholder="Width Of The Road In Front (In Feet)*"
                                                className={`${inputBaseClass} ${errors.roadWidth ? 'border-red-500/80' : 'border-[#1f252d]/14'}`}
                                            />
                                            {errors.roadWidth && <p className="mt-1.5 text-xs text-red-600">{errors.roadWidth}</p>}
                                        </div>

                                        <div>
                                            <MenuDropdown
                                                value={formData.category}
                                                onChange={(nextValue) => setField('category', nextValue)}
                                                options={categoryOptions}
                                                label="Category"
                                                name="land-category"
                                                placeholder="Select Category*"
                                                showTriggerIcon={false}
                                                showOptionIcon={false}
                                                size="md"
                                                theme={dropdownTheme}
                                                className="relative z-30 max-w-none"
                                                labelClassName="sr-only mb-0"
                                                triggerClassName={`h-12 rounded-xl text-sm shadow-none ${errors.category ? '!border-red-500/80' : ''}`}
                                                menuClassName="rounded-xl p-1.5"
                                                optionClassName="rounded-lg"
                                            />
                                            {errors.category && <p className="mt-1.5 text-xs text-red-600">{errors.category}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                value={formData.facing}
                                                onChange={(event) => setField('facing', event.target.value)}
                                                placeholder="Facing*"
                                                className={`${inputBaseClass} ${errors.facing ? 'border-red-500/80' : 'border-[#1f252d]/14'}`}
                                            />
                                            {errors.facing && <p className="mt-1.5 text-xs text-red-600">{errors.facing}</p>}
                                        </div>

                                        <div>
                                            <MenuDropdown
                                                value={formData.attractiveFeature}
                                                onChange={(nextValue) => setField('attractiveFeature', nextValue)}
                                                options={attractiveFeatureOptions}
                                                label="Attractive Features"
                                                name="land-feature"
                                                placeholder="Attractive Features (If Any)"
                                                showTriggerIcon={false}
                                                showOptionIcon={false}
                                                size="md"
                                                theme={dropdownTheme}
                                                className="relative z-30 max-w-none"
                                                labelClassName="sr-only mb-0"
                                                triggerClassName="h-12 rounded-xl text-sm shadow-none"
                                                menuClassName="rounded-xl p-1.5"
                                                optionClassName="rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="card-title-sm text-[#1d1f22]">Landowners Information</p>
                                    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        <div>
                                            <input
                                                type="text"
                                                value={formData.ownerName}
                                                onChange={(event) => setField('ownerName', event.target.value)}
                                                placeholder="Name Of The Landowner*"
                                                className={`${inputBaseClass} ${errors.ownerName ? 'border-red-500/80' : 'border-[#1f252d]/14'}`}
                                            />
                                            {errors.ownerName && <p className="mt-1.5 text-xs text-red-600">{errors.ownerName}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="email"
                                                value={formData.ownerEmail}
                                                onChange={(event) => setField('ownerEmail', event.target.value)}
                                                placeholder="Email ID*"
                                                className={`${inputBaseClass} ${errors.ownerEmail ? 'border-red-500/80' : 'border-[#1f252d]/14'}`}
                                            />
                                            {errors.ownerEmail && <p className="mt-1.5 text-xs text-red-600">{errors.ownerEmail}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                value={formData.ownerPhone}
                                                onChange={(event) => setField('ownerPhone', event.target.value)}
                                                placeholder="Contact Number*"
                                                className={`${inputBaseClass} ${errors.ownerPhone ? 'border-red-500/80' : 'border-[#1f252d]/14'}`}
                                            />
                                            {errors.ownerPhone && <p className="mt-1.5 text-xs text-red-600">{errors.ownerPhone}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-start">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0f3f38] px-7 text-sm font-medium tracking-[0.12em] text-white transition-colors hover:bg-[#0c342f] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </section>
            </div>
        </WebLayout>
    );
}
