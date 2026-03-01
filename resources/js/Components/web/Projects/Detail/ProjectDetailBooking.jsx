import React, { useEffect, useMemo, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

const EVENT_TYPES = {
    video: {
        label: 'Video Chat',
        namespace: '15min',
        defaultLink: 'sabbir303/15min',
        ui: {
            layout: 'month_view',
            theme: 'light',
            hideEventTypeDetails: false,
            cssVarsPerTheme: {
                light: { 'cal-brand': '#292929' },
                dark: { 'cal-brand': '#fafafa' },
            },
        },
        config: {
            layout: 'month_view',
            useSlotsViewOnSmallScreens: true,
            theme: 'light',
        },
    },
    inPerson: {
        label: 'In-Person Tour',
        namespace: 'physical-tour',
        defaultLink: 'sabbir303/physical-tour',
        ui: {
            layout: 'month_view',
            theme: 'light',
            hideEventTypeDetails: false,
        },
        config: {
            layout: 'month_view',
            useSlotsViewOnSmallScreens: true,
        },
    },
};

export default function ProjectDetailBooking({ project }) {
    const [selectedType, setSelectedType] = useState('video');
    const activeEvent = EVENT_TYPES[selectedType];
    const calLink =
        selectedType === 'inPerson'
            ? import.meta.env.VITE_CAL_COM_IN_PERSON_LINK || activeEvent.defaultLink
            : import.meta.env.VITE_CAL_COM_LINK || activeEvent.defaultLink;
    const embedKey = useMemo(() => `${project.slug}-${activeEvent.namespace}-${selectedType}`, [project.slug, activeEvent.namespace, selectedType]);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const cal = await getCalApi({ namespace: activeEvent.namespace });
            if (!isMounted) return;

            cal('ui', activeEvent.ui);
        })();

        return () => {
            isMounted = false;
        };
    }, [activeEvent]);

    return (
        <section className="my-14 w-full rounded-[2rem] bg-dark p-4 sm:p-8 lg:p-10">
            <div
                className="relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-[2.4rem] bg-[#f6f7fb] p-5 [clip-path:polygon(0_0,96.8%_0,100%_8.8%,100%_100%,0_100%)] sm:p-8 md:[clip-path:polygon(0_0,92.8%_0,100%_14%,100%_100%,0_100%)] lg:p-10 lg:[clip-path:polygon(0_0,87.8%_0,100%_17.8%,100%_100%,0_100%)]"
            >
                <div className="relative z-[1] mx-auto max-w-5xl">
                    <h2 className="text-center text-[2rem] font-medium leading-tight text-[#131417] sm:text-[2.35rem]">
                        Book Your Session Today!
                    </h2>

                    <div className="mt-5 flex justify-center">
                        <div className="inline-flex rounded-xl border border-[#d3d8e3] bg-white/85 p-1 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
                            <button
                                type="button"
                                onClick={() => setSelectedType('video')}
                                className={`rounded-lg px-4 py-2 text-xs font-medium tracking-[0.12em] transition-colors ${
                                    selectedType === 'video'
                                        ? 'bg-[#12141a] text-white'
                                        : 'text-[#1d252d]/75 hover:bg-[#eef1f6]'
                                }`}
                            >
                                {EVENT_TYPES.video.label}
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedType('inPerson')}
                                className={`rounded-lg px-4 py-2 text-xs font-medium tracking-[0.12em] transition-colors ${
                                    selectedType === 'inPerson'
                                        ? 'bg-[#12141a] text-white'
                                        : 'text-[#1d252d]/75 hover:bg-[#eef1f6]'
                                }`}
                            >
                                {EVENT_TYPES.inPerson.label}
                            </button>
                        </div>
                    </div>

                    <div className="mt-7 overflow-hidden rounded-2xl border border-[#d4d9e4] bg-white shadow-[0_8px_26px_rgba(16,24,40,0.08)]">
                        <Cal
                            key={embedKey}
                            namespace={activeEvent.namespace}
                            calLink={calLink}
                            style={{ width: '100%', minHeight: '600px', overflow: 'scroll' }}
                            config={activeEvent.config}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
