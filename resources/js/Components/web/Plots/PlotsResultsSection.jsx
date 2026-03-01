import React from 'react';
import { Grid3X3, List } from 'lucide-react';
import PlotListCard from './PlotListCard';
import PlotGridCard from './PlotGridCard';

export default function PlotsResultsSection({ filteredPlots, viewMode, onViewModeChange, cardMotion }) {
    return (
        <div>
            <style>{`
                @keyframes plotsArrowNudge {
                    0% { transform: translateX(0); }
                    50% { transform: translateX(6px); }
                    100% { transform: translateX(0); }
                }
                .plots-arrow-anim {
                    animation: plotsArrowNudge 1.2s ease-in-out infinite;
                }
            `}</style>

            <div className="mb-6 rounded-2xl border border-black/10 bg-white p-2.5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="hidden md:inline-flex rounded-xl border border-black/10 bg-[#fbfbf8] p-1">
                        <button
                            type="button"
                            onClick={() => onViewModeChange('list')}
                            aria-label="Switch to list view"
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                                viewMode === 'list' ? 'bg-[#1a1a1a] text-white' : 'text-[#1f252d]/65 hover:bg-[#f1eee6]'
                            }`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onViewModeChange('grid')}
                            aria-label="Switch to grid view"
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                                viewMode === 'grid' ? 'bg-[#1a1a1a] text-white' : 'text-[#1f252d]/65 hover:bg-[#f1eee6]'
                            }`}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                    </div>

                    <p className="card-description-sm text-[#1f252d]/70 m-0">
                        Showing <span className="card-description-sm font-medium text-[#1f252d]">{filteredPlots.length}</span> plots
                    </p>
                </div>
            </div>

            {filteredPlots.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-black/20 bg-white p-10 text-center">
                    <h3 className="text-2xl font-light text-[#1d1f22]">No plots found</h3>
                    <p className="mt-2 text-[#1d1f22]/60">Try changing filter options to discover more listings.</p>
                </div>
            ) : viewMode === 'list' ? (
                <div className="space-y-5">
                    {filteredPlots.map((plot, index) => (
                        <PlotListCard key={plot.id} plot={plot} index={index} cardMotion={cardMotion} />
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                    {filteredPlots.map((plot, index) => (
                        <PlotGridCard key={plot.id} plot={plot} index={index} cardMotion={cardMotion} />
                    ))}
                </div>
            )}
        </div>
    );
}
