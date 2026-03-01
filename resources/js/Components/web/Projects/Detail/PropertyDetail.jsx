import React from 'react';

function formatCategory(value) {
    if (!value) return '-';
    return value
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

export default function ProjectDetail({ project }) {
    const detailsLeft = [
        ['Property Id', project?.id || '-'],
        ['Price Info', project?.priceLabel || '-'],
        ['Property Lot Size', project?.sizeSqft ? `${project.sizeSqft} ft2` : '-'],
        ['Bedrooms', project?.bedrooms ?? '-'],
        ['Status', project?.status ? project.status.charAt(0).toUpperCase() + project.status.slice(1) : '-'],
        ['Category', formatCategory(project?.category)],
    ];

    const detailsRight = [
        ['Type', project?.type || '-'],
        ['Transaction', project?.transaction ? project.transaction.charAt(0).toUpperCase() + project.transaction.slice(1) : '-'],
        ['Bathrooms', project?.bathrooms ?? '-'],
        ['Total Plots', project?.totalPlots ?? '-'],
        ['Available Plots', project?.availablePlots ?? '-'],
        ['Location', project?.location || '-'],
    ];

    return (
        <div className='my-12'>
            <div className='my-6'>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-[1.5rem] font-medium leading-tight text-[#11161d] sm:text-[1.7rem]">Property Details</h2>
                </div>

                <div className="grid gap-x-10 gap-y-0 md:grid-cols-2">
                    <div>
                        {detailsLeft.map(([label, value]) => (
                            <div key={label} className="flex items-center justify-between border-b border-black/10 py-3.5 text-sm">
                                <p className="pr-4 text-[#2a3a58] m-0">{label}:</p>
                                <p className="text-right text-[#11161d] m-0">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        {detailsRight.map(([label, value]) => (
                            <div key={label} className="flex items-center justify-between border-b border-black/10 py-3.5 text-sm">
                                <p className="pr-4 text-[#2a3a58] m-0">{label}:</p>
                                <p className="text-right text-[#11161d] m-0">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
