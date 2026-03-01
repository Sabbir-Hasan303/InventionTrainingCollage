import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function FocusUpdater({ project }) {
    const map = useMap();

    useEffect(() => {
        if (!project?.coordinates) return;
        map.flyTo([project.coordinates.lat, project.coordinates.lng], 12, {
            animate: true,
            duration: 1,
        });
    }, [map, project]);

    return null;
}

function createMarker(color) {
    return L.divIcon({
        className: 'project-map-pin',
        html: `<span style="display:block;width:16px;height:16px;border-radius:999px;background:${color};border:2px solid #fff;box-shadow:0 6px 15px rgba(15,23,42,0.3);"></span>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
}

const PARALLAX_BG =
    'https://media.gettyimages.com/id/1623509694/photo/multi-color-leaves-in-neighbourhood-park-at-weston-road-and-major-mackenzie-dr-woodbridge.jpg?s=2048x2048&w=gi&k=20&c=F4B2tg8A6cyjsHNS5VtpN2n1w_YAKsK25e2XIZ563Xc=';

function getPlaceTone(type = '') {
    const normalized = type.toLowerCase();

    if (normalized.includes('transport')) return { chip: '#86d8ff', ring: 'rgba(134,216,255,0.34)' };
    if (normalized.includes('education')) return { chip: '#b7f3cf', ring: 'rgba(183,243,207,0.34)' };
    if (normalized.includes('health')) return { chip: '#ffd2b6', ring: 'rgba(255,210,182,0.34)' };
    if (normalized.includes('retail')) return { chip: '#e5d0ff', ring: 'rgba(229,208,255,0.34)' };

    return { chip: '#9feadf', ring: 'rgba(159,234,223,0.34)' };
}

export default function ProjectDetailMapSection({ project }) {
    const [isClient, setIsClient] = useState(false);
    const nearby = useMemo(() => project.nearbyPlaces || [], [project.nearbyPlaces]);
    const hasCoordinates = Number.isFinite(project?.coordinates?.lat) && Number.isFinite(project?.coordinates?.lng);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <section className="my-14">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20">
                <div
                    className="absolute inset-0 bg-cover bg-fixed"
                    style={{ backgroundImage: `url(${PARALLAX_BG})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(6,13,24,0.88)_0%,rgba(0,0,0,0.1)_52%,rgba(0,0,0,0.1)_100%)]" />
                {/* <div className="absolute inset-0 [background-image:linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:42px_42px] opacity-25" /> */}

                <div className="relative web-giant-container px-5 py-20">
                    <div className="flex flex-col gap-4 border-b border-white/20 pb-7 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <span className="inline-flex items-center rounded-full border border-[#8fe4ff]/40 bg-[#8fe4ff]/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#b8f0ff]">
                                Neighborhood Overview
                            </span>
                            <h2 className="mt-4 text-[1.95rem] font-light leading-tight text-white sm:text-[2.3rem]">
                                Around <span className="font-medium text-[#9be3ff]">{project?.title || 'This Project'}</span>
                            </h2>
                        </div>
                    </div>

                    <div className="mt-7 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                        <div className="rounded-[1.5rem] border border-white/25 bg-[rgba(8,14,28,0.55)] p-3 backdrop-blur-sm sm:p-4">
                            <div className="relative z-0 h-[330px] overflow-hidden rounded-[1.15rem] border border-white/20 bg-[#16304a] sm:h-[400px] lg:h-[470px]">
                                {isClient && hasCoordinates ? (
                                    <MapContainer
                                        center={[project.coordinates.lat, project.coordinates.lng]}
                                        zoom={12}
                                        scrollWheelZoom={false}
                                        className="relative z-0 h-full w-full"
                                    >
                                        <TileLayer
                                            attribution="&copy; OpenStreetMap contributors"
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[project.coordinates.lat, project.coordinates.lng]} icon={createMarker('#2FA89D')}>
                                            <Popup>{project.title}</Popup>
                                        </Marker>
                                        {nearby.map((place, index) => (
                                            <Marker
                                                key={place.name}
                                                position={[
                                                    project.coordinates.lat + (index + 1) * 0.008 * (index % 2 === 0 ? 1 : -1),
                                                    project.coordinates.lng + (index + 1) * 0.008 * (index % 2 === 0 ? -1 : 1),
                                                ]}
                                                icon={createMarker('#d6a15f')}
                                            >
                                                <Popup>{place.name}</Popup>
                                            </Marker>
                                        ))}
                                        <FocusUpdater project={project} />
                                    </MapContainer>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[#16304a] text-sm text-white/65">
                                        Map is not available for this location.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:auto-rows-fr">
                            {nearby.length > 0 ? (
                                nearby.map((place) => {
                                    const tone = getPlaceTone(place.type);
                                    return (
                                        <article
                                            key={place.name}
                                            className="group rounded-[1.2rem] border border-white/20 bg-[#1D1F22] p-4 text-white backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <p className="text-[0.66rem] uppercase tracking-[0.24em] text-white/65">{place.type}</p>
                                                <span
                                                    className="inline-block h-2.5 w-2.5 rounded-full"
                                                    style={{ background: tone.chip, boxShadow: `0 0 0 5px ${tone.ring}` }}
                                                />
                                            </div>
                                            <p className="mt-3 text-[1rem] leading-6 text-white/95">{place.name}</p>
                                            <p className="mt-5 inline-flex items-center gap-2 text-sm text-white/72">
                                                <MapPin className="h-4 w-4 text-[#6de0cb]" />
                                                {place.distance} away
                                            </p>
                                        </article>
                                    );
                                })
                            ) : (
                                <div className="rounded-[1.2rem] border border-dashed border-white/30 bg-[rgba(9,17,32,0.45)] p-6 text-sm text-white/70 sm:col-span-2">
                                    Nearby places are not available yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
