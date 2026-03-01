import React from "react";

const statCards = [
    { title: "Global Reach", value: "85", suffix: "+", label: "offices worldwide" },
    { title: "Local Expertise", value: "1,500", suffix: "+", label: "employees" },
    { title: "Our Impact", value: "248", suffix: "+", label: "projects done" },
];

export default function FolderStructure() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row">
                <div
                    className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-[url('https://picsum.photos/seed/business/900/1050')] bg-cover lg:flex-1"
                >
                    <div className="relative grid w-[220px] gap-12">
                        <div className="h-[60px] rounded-br-2xl bg-dark" />

                        <div className="absolute right-[-30px] top-0 h-[30px] w-[30px] scale-y-[-1] bg-dark [clip-path:path('M0_0_Q0,30_30,30_L0,30_Z')]" />

                        <div className="absolute bottom-[-30px] left-0 h-[30px] w-[30px] scale-y-[-1] bg-dark [clip-path:path('M0_0_Q0,30_30,30_L0,30_Z')]" />
                    </div>
                </div>

                <div className="grid w-full gap-8 sm:grid-cols-2 lg:flex-1">
                    {statCards.map((card) => (
                        <article key={card.title} className="flex flex-col rounded-3xl bg-gray-100 p-10">
                            <h6 className="relative mb-4 inline-block pb-4 text-xs font-semibold uppercase tracking-wide text-gray-800">
                                {card.title}
                                <span className="absolute inset-x-0 bottom-0 border-b border-gray-800/10" />
                            </h6>

                            <div className="mt-auto">
                                <div className="flex items-start">
                                    <span className="text-5xl font-extrabold leading-tight text-gray-900">{card.value}</span>
                                    <span className="py-2 align-super text-4xl font-bold text-red-400">{card.suffix}</span>
                                </div>
                                <p className="text-sm text-gray-600">{card.label}</p>
                            </div>
                        </article>
                    ))}

                    <article className="min-h-[150px] rounded-3xl bg-gray-100 bg-[url('https://picsum.photos/seed/people/600/600')] bg-cover p-10" />
                </div>
            </div>
        </div>
    );
}
