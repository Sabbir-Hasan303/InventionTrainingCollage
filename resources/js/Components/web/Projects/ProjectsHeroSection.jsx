import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import MenuDropdown from '@/Components/others_animation/MenuDropdown';

export default function ProjectsHeroSection({
    query,
    setQuery,
    category,
    setCategory,
    transaction,
    setTransaction,
    status,
    setStatus,
    categoryMeta,
}) {
    const categoryOptions = categoryMeta.map((item) => ({
        value: item.id,
        title: item.label,
    }));

    const transactionOptions = [
        { value: 'all', title: 'Sell or Rent' },
        { value: 'sale', title: 'For Sale' },
        { value: 'rent', title: 'For Rent' },
    ];

    const statusOptions = [
        { value: 'all', title: 'Property Status' },
        { value: 'active', title: 'Active' },
        { value: 'upcoming', title: 'Upcoming' },
        { value: 'booked', title: 'Booked' },
    ];

    const dropdownTheme = {
        triggerFrame: 'border-[#1f252d]/12 bg-[#fbfbf8]',
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

    return (
        <section className="relative overflow-visible pt-32 pb-10 md:pt-40 md:pb-0">
            <img
                src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=2200&q=80"
                alt="Luxury property background"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/50" />

            <div className="web-giant-container relative md:min-h-[440px]">
                <div className="mx-auto max-w-4xl text-center md:pt-14 md:pb-36">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                    >
                        <h1 className="hero-title text-[#fffce1]">
                            Discover Signature Land & Property Projects
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl hero-description text-white/80">
                            A totally reworked browsing experience with focused search, category discovery, and visual listings.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.14 }}
                    className="relative z-30 mx-auto mt-10 max-w-6xl rounded-[26px] border border-white/15 bg-white p-3 shadow-[0_24px_55px_rgba(17,24,39,0.22)] md:absolute md:bottom-[-30px] md:left-0 md:right-0 md:mt-0 md:translate-y-1/2"
                >
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
                        <label className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1f252d]/45" />
                            <input
                                type="text"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Enter address, area, or project name"
                                className="h-12 w-full rounded-xl border border-[#1f252d]/12 bg-[#fbfbf8] pl-11 pr-3 text-sm text-[#1f252d] outline-none transition-colors placeholder:text-[#1f252d]/45 focus:border-[#2FA89D]/65"
                            />
                        </label>

                        <MenuDropdown
                            value={category}
                            onChange={(nextValue) => setCategory(nextValue)}
                            options={categoryOptions}
                            label="Category"
                            name="category-filter"
                            placeholder="All Types"
                            showTriggerIcon={false}
                            showOptionIcon={false}
                            size="md"
                            theme={dropdownTheme}
                            className="max-w-none"
                            labelClassName="sr-only mb-0"
                            triggerClassName="h-12 rounded-xl text-sm shadow-none"
                            menuClassName="rounded-xl p-1.5"
                            optionClassName="rounded-lg"
                        />

                        <MenuDropdown
                            value={transaction}
                            onChange={(nextValue) => setTransaction(nextValue)}
                            options={transactionOptions}
                            label="Transaction Type"
                            name="transaction-filter"
                            placeholder="Sell or Rent"
                            showTriggerIcon={false}
                            showOptionIcon={false}
                            size="md"
                            theme={dropdownTheme}
                            className="max-w-none"
                            labelClassName="sr-only mb-0"
                            triggerClassName="h-12 rounded-xl text-sm shadow-none"
                            menuClassName="rounded-xl p-1.5"
                            optionClassName="rounded-lg"
                        />

                        <MenuDropdown
                            value={status}
                            onChange={(nextValue) => setStatus(nextValue)}
                            options={statusOptions}
                            label="Property Status"
                            name="status-filter"
                            placeholder="Property Status"
                            showTriggerIcon={false}
                            showOptionIcon={false}
                            size="md"
                            theme={dropdownTheme}
                            className="max-w-none"
                            labelClassName="sr-only mb-0"
                            triggerClassName="h-12 rounded-xl text-sm shadow-none"
                            menuClassName="rounded-xl p-1.5"
                            optionClassName="rounded-lg"
                        />

                        <button
                            type="button"
                            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0f3f38] px-6 text-sm font-medium text-white transition-colors hover:bg-[#0c342f]"
                        >
                            Search
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
