import React from 'react';
import { Star } from 'lucide-react';

export default function PlotRating({ value }) {
    const filled = Math.round(value);

    return (
        <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-semibold text-[#c99855]">{value.toFixed(1)}</span>
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                        key={index}
                        className={`h-3.5 w-3.5 ${index < filled ? 'fill-[#c99855] text-[#c99855]' : 'text-[#9ca3af]'}`}
                    />
                ))}
            </div>
        </div>
    );
}
