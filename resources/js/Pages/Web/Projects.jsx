import React, { useMemo, useState } from 'react';
import WebLayout from '@/Layouts/WebLayout';
import ProjectsHeroSection from '@/Components/web/Projects/ProjectsHeroSection';
import ProjectsCategorySection from '@/Components/web/Projects/ProjectsCategorySection';
import ProjectsListingSection from '@/Components/web/Projects/ProjectsListingSection';
import {
    cardMotion,
    categoryMeta,
    projects,
    statusClass,
    statusLabels,
    transactionLabels,
} from '@/Components/web/Projects/projectsData';

export default function Projects() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [status, setStatus] = useState('all');
    const [transaction, setTransaction] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState('grid');

    const filteredProjects = useMemo(() => {
        const text = query.trim().toLowerCase();

        const filtered = projects.filter((project) => {
            const matchesText =
                !text ||
                [project.title, project.description, project.location, project.type].join(' ').toLowerCase().includes(text);
            const matchesCategory = category === 'all' || project.category === category;
            const matchesStatus = status === 'all' || project.status === status;
            const matchesTransaction = transaction === 'all' || project.transaction === transaction;

            return matchesText && matchesCategory && matchesStatus && matchesTransaction;
        });

        const sorted = [...filtered];
        if (sortBy === 'price_high') sorted.sort((a, b) => b.priceValue - a.priceValue);
        if (sortBy === 'price_low') sorted.sort((a, b) => a.priceValue - b.priceValue);
        if (sortBy === 'availability') sorted.sort((a, b) => b.availablePlots - a.availablePlots);
        if (sortBy === 'featured') sorted.sort((a, b) => Number(b.featured) - Number(a.featured));

        return sorted;
    }, [query, category, status, transaction, sortBy]);

    return (
        <WebLayout>
            <div className="overflow-hidden bg-light">
                <ProjectsHeroSection
                    query={query}
                    setQuery={setQuery}
                    category={category}
                    setCategory={setCategory}
                    transaction={transaction}
                    setTransaction={setTransaction}
                    status={status}
                    setStatus={setStatus}
                    categoryMeta={categoryMeta}
                />
                <ProjectsCategorySection category={category} setCategory={setCategory} categoryMeta={categoryMeta} />
                <ProjectsListingSection
                    filteredProjects={filteredProjects}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    cardMotion={cardMotion}
                    statusClass={statusClass}
                    statusLabels={statusLabels}
                    transactionLabels={transactionLabels}
                />
            </div>
        </WebLayout>
    );
}
