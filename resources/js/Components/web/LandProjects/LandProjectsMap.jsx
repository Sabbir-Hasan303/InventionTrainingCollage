import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapUpdater({ projects, activeIndex }) {
    const map = useMap();

    useEffect(() => {
        if (!projects.length) return;
        const point = projects[activeIndex]?.location;
        if (!point) return;

        map.invalidateSize();
        map.flyTo([point.lat, point.lng], 12, {
            duration: 1.25,
            animate: true,
        });

        const timer = setTimeout(() => map.invalidateSize(), 220);
        return () => clearTimeout(timer);
    }, [activeIndex, map, projects]);

    return null;
}

export default function LandProjectsMap({ projects, activeIndex }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const pathCoordinates = projects.map((item) => [item.location.lat, item.location.lng]);
    const defaultCenter = projects[0]?.location || { lat: 23.8103, lng: 90.4125 };

    if (!isClient) {
        return <div className="h-full w-full rounded-2xl bg-[#1a273d]" />;
    }

    return (
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-[#1a273d] shadow-[0_24px_48px_rgba(7,10,18,0.35)]">
            <style>{`@keyframes landProjectPulse { 0% { transform: scale(1); } 50% { transform: scale(1.24); } 100% { transform: scale(1); } }`}</style>

            <MapContainer
                center={[defaultCenter.lat, defaultCenter.lng]}
                zoom={11}
                scrollWheelZoom={false}
                zoomControl={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Polyline
                    positions={pathCoordinates}
                    color="#d8b36d"
                    weight={4}
                    opacity={0.85}
                    dashArray="10, 8"
                />

                {projects.map((project, index) => {
                    const isActive = index === activeIndex;
                    const isPast = index < activeIndex;

                    const icon = L.divIcon({
                        className: 'land-project-marker',
                        html: `<span style="
                            display:block;
                            width:${isActive ? '24px' : '14px'};
                            height:${isActive ? '24px' : '14px'};
                            border-radius:999px;
                            border:2px solid rgba(255,255,255,0.95);
                            background:${isActive ? '#f2c572' : isPast ? '#d8b36d' : '#6f778a'};
                            box-shadow:${isActive ? '0 0 0 8px rgba(216,179,109,0.24), 0 4px 14px rgba(10,18,34,0.38)' : '0 4px 12px rgba(10,18,34,0.3)'};
                            animation:${isActive ? 'landProjectPulse 1.7s ease-in-out infinite' : 'none'};
                            transition:all .25s ease;
                        "></span>`,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12],
                    });

                    return (
                        <Marker
                            key={project.id}
                            position={[project.location.lat, project.location.lng]}
                            icon={icon}
                        />
                    );
                })}

                <MapUpdater projects={projects} activeIndex={activeIndex} />
            </MapContainer>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d1728]/45 to-transparent" />
        </div>
    );
}
