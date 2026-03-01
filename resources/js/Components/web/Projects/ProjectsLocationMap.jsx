import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapUpdater({ projects, activeProjectId }) {
    const map = useMap();

    useEffect(() => {
        if (!projects.length) return;

        const activeProject = projects.find((item) => item.id === activeProjectId) || projects[0];
        const point = activeProject?.coordinates;
        if (!point) return;

        map.invalidateSize();
        map.flyTo([point.lat, point.lng], 12, {
            duration: 1.15,
            animate: true,
        });

        const timer = setTimeout(() => map.invalidateSize(), 200);
        return () => clearTimeout(timer);
    }, [activeProjectId, map, projects]);

    return null;
}

function buildMarker(isActive) {
    return L.divIcon({
        className: 'project-location-marker',
        html: `<span style="
            display:block;
            width:${isActive ? '22px' : '14px'};
            height:${isActive ? '22px' : '14px'};
            border-radius:999px;
            border:2px solid rgba(255,255,255,0.95);
            background:${isActive ? '#2FA89D' : '#6b7280'};
            box-shadow:${isActive ? '0 0 0 7px rgba(47,168,157,0.24), 0 8px 20px rgba(15,23,42,0.38)' : '0 4px 10px rgba(15,23,42,0.32)'};
            transition:all .25s ease;
        "></span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
    });
}

export default function ProjectsLocationMap({ projects, activeProjectId }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const validProjects = useMemo(
        () => projects.filter((item) => item.coordinates?.lat && item.coordinates?.lng),
        [projects]
    );

    const activeProject = validProjects.find((item) => item.id === activeProjectId) || validProjects[0];
    const center = activeProject?.coordinates || { lat: 23.8103, lng: 90.4125 };

    if (!isClient) {
        return <div className="h-full w-full bg-[#18324f]" />;
    }

    return (
        <div className="relative z-0 h-full w-full overflow-hidden bg-[#18324f]">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={11}
                scrollWheelZoom={false}
                zoomControl
                className="relative z-0 h-full w-full"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {validProjects.map((project) => (
                    <Marker
                        key={project.id}
                        position={[project.coordinates.lat, project.coordinates.lng]}
                        icon={buildMarker(project.id === activeProject?.id)}
                    />
                ))}

                <MapUpdater projects={validProjects} activeProjectId={activeProject?.id} />
            </MapContainer>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0f172a]/55 to-transparent" />
        </div>
    );
}
