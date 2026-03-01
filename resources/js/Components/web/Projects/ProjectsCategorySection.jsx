import React from 'react';
import { Building2, House, Landmark, Layers3, Trees } from 'lucide-react';
import { projects } from './projectsData';

const iconMap = {
    Layers3,
    House,
    Building2,
    Trees,
    Landmark,
};

export default function ProjectsCategorySection({ category, setCategory, categoryMeta }) {
    return (
        <section className="border-b border-black/10 bg-[#f6f4ee] py-7 md:pb-7 md:pt-20">
            <div className="web-giant-container">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
                    {categoryMeta.map((item) => {
                        const Icon = iconMap[item.icon] || Layers3;
                        const active = category === item.id;
                        const count =
                            item.id === 'all'
                                ? projects.length
                                : projects.filter((project) => project.category === item.id).length;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setCategory(item.id)}
                                className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                                    active
                                        ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-[0_14px_28px_rgba(17,24,39,0.22)]'
                                        : 'border-black/10 bg-white text-[#1f252d] hover:border-[#1f252d]/35'
                                }`}
                            >
                                <span
                                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${
                                        active ? 'border-white/20 bg-white/10' : 'border-black/10 bg-[#f8f7f3]'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate text-sm font-medium">{item.label}</span>
                                    <span className={`block text-xs ${active ? 'text-white/65' : 'text-[#1f252d]/60'}`}>
                                        {count} listings
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
