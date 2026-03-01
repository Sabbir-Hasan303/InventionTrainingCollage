import React from 'react';
import { RotateCcw } from 'lucide-react';
import MenuDropdown from '@/Components/others_animation/MenuDropdown';

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

const dropdownMenuBaseClassName = '!z-[120] rounded-xl p-1.5';
const dropdownMenuScrollableClassName =
    'max-h-64 overflow-y-auto [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:#c99855_#ece8dc] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#ece8dc] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#c99855] [&::-webkit-scrollbar-thumb:hover]:bg-[#b98a4d]';
const dropdownOptionClassName = 'rounded-lg';
const DROPDOWN_SCROLL_THRESHOLD = 6;

function getDropdownMenuClassName(options) {
    const shouldScroll = options.length > DROPDOWN_SCROLL_THRESHOLD;
    return shouldScroll
        ? `${dropdownMenuBaseClassName} ${dropdownMenuScrollableClassName}`
        : dropdownMenuBaseClassName;
}

export default function PlotsFiltersSidebar({
    filters,
    locationOptions,
    propertyTypeOptions,
    purposeOptions,
    amenityOptions,
    onFilterChange,
    onClearFilters,
}) {
    return (
        <aside className="relative z-40 h-fit">
            <div className="overflow-visible rounded-[26px] border border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8f6f0_100%)] shadow-[0_24px_55px_rgba(15,23,42,0.14)]">
                <div className="flex items-center justify-between bg-light-dark px-5 py-4">
                    <h2 className="card-title-sm text-white">Find Your Preferred Plot</h2>
                </div>

                <div className="space-y-4 p-5">
                    <div>
                        <label htmlFor="plot-keyword" className="mb-2 block text-sm font-medium text-[#1f252d]">
                            Keyword
                        </label>
                        <input
                            id="plot-keyword"
                            type="text"
                            value={filters.keyword}
                            onChange={(event) => onFilterChange('keyword', event.target.value)}
                            placeholder="Search title, location, or feature"
                            className="h-12 w-full rounded-xl border border-[#1f252d]/12 bg-[#fbfbf8] px-4 text-sm text-[#1f252d] outline-none transition-colors placeholder:text-[#1f252d]/45 focus:border-[#2FA89D]/65"
                        />
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium text-[#1f252d]">Location</p>
                        <MenuDropdown
                            value={filters.location}
                            onChange={(nextValue) => onFilterChange('location', nextValue)}
                            options={locationOptions}
                            label="Location"
                            name="plot-location-filter"
                            placeholder="Select location"
                            showTriggerIcon={false}
                            showOptionIcon={false}
                            size="md"
                            theme={dropdownTheme}
                            className="max-w-none"
                            labelClassName="sr-only mb-0"
                            triggerClassName="h-12 rounded-xl text-sm shadow-none"
                            menuClassName={getDropdownMenuClassName(locationOptions)}
                            optionClassName={dropdownOptionClassName}
                        />
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium text-[#1f252d]">Property Type</p>
                        <MenuDropdown
                            value={filters.propertyType}
                            onChange={(nextValue) => onFilterChange('propertyType', nextValue)}
                            options={propertyTypeOptions}
                            label="Property Type"
                            name="plot-type-filter"
                            placeholder="Select property type"
                            showTriggerIcon={false}
                            showOptionIcon={false}
                            size="md"
                            theme={dropdownTheme}
                            className="max-w-none"
                            labelClassName="sr-only mb-0"
                            triggerClassName="h-12 rounded-xl text-sm shadow-none"
                            menuClassName={getDropdownMenuClassName(propertyTypeOptions)}
                            optionClassName={dropdownOptionClassName}
                        />
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium text-[#1f252d]">Purpose</p>
                        <MenuDropdown
                            value={filters.purpose}
                            onChange={(nextValue) => onFilterChange('purpose', nextValue)}
                            options={purposeOptions}
                            label="Purpose"
                            name="plot-purpose-filter"
                            placeholder="Select purpose"
                            showTriggerIcon={false}
                            showOptionIcon={false}
                            size="md"
                            theme={dropdownTheme}
                            className="max-w-none"
                            labelClassName="sr-only mb-0"
                            triggerClassName="h-12 rounded-xl text-sm shadow-none"
                            menuClassName={getDropdownMenuClassName(purposeOptions)}
                            optionClassName={dropdownOptionClassName}
                        />
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium text-[#1f252d]">Amenities</p>
                        <MenuDropdown
                            value={filters.amenity}
                            onChange={(nextValue) => onFilterChange('amenity', nextValue)}
                            options={amenityOptions}
                            label="Amenities"
                            name="plot-amenity-filter"
                            placeholder="Select amenity"
                            showTriggerIcon={false}
                            showOptionIcon={false}
                            size="md"
                            theme={dropdownTheme}
                            className="max-w-none"
                            labelClassName="sr-only mb-0"
                            triggerClassName="h-12 rounded-xl text-sm shadow-none"
                            menuClassName={getDropdownMenuClassName(amenityOptions)}
                            optionClassName={dropdownOptionClassName}
                        />
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#c99855] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b98a4d]"
                    >
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="inline-flex w-full items-center justify-center gap-2 text-sm text-[#1f252d]/70 transition-colors hover:text-[#0f3f38]"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Clear all filters
                    </button>
                </div>
            </div>
        </aside>
    );
}
