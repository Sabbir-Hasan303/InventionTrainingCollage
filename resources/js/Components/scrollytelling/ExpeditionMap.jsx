import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import { waypointsData } from "./waypointsData";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapUpdater({ activeIndex }) {
    const map = useMap();

    useEffect(() => {
        if (activeIndex >= 0 && activeIndex < waypointsData.length) {
            const location = waypointsData[activeIndex].location;
            map.flyTo([location.lat, location.lng], 6, {
                duration: 1.5
            });
        }
    }, [activeIndex, map]);

    return null;
}

export default function ExpeditionMap({ activeWaypointIndex }) {
    const pathCoordinates = waypointsData.map(wp => [wp.location.lat, wp.location.lng]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border-4" style={{ borderColor: '#d1a878' }}>
            <MapContainer
                center={[42.5, -100]}
                zoom={4}
                scrollWheelZoom={false}
                zoomControl={true}
                className="w-full h-full"
                style={{ background: '#f5e6d3' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    opacity={0.7}
                />

                {/* Journey path */}
                <Polyline
                    positions={pathCoordinates}
                    color="#a05d34"
                    weight={4}
                    opacity={0.8}
                    dashArray="10, 10"
                />

                {/* Waypoint markers */}
                {waypointsData.map((waypoint, index) => {
                    const isActive = index === activeWaypointIndex;
                    const isPassed = index <= activeWaypointIndex;

                    const customIcon = L.divIcon({
                        className: 'custom-marker',
                        html: `
              <div style="
                width: ${isActive ? '24px' : '16px'};
                height: ${isActive ? '24px' : '16px'};
                background-color: ${isPassed ? '#a05d34' : '#d1a878'};
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                ${isActive ? 'animation: pulse 2s infinite;' : ''}
              "></div>
              <style>
                @keyframes pulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.2); }
                }
              </style>
            `,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                    });

                    return (
                        <Marker
                            key={index}
                            position={[waypoint.location.lat, waypoint.location.lng]}
                            icon={customIcon}
                        >
                            <Popup>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    <h3 className="font-bold text-lg" style={{ color: '#a05d34' }}>
                                        {waypoint.title}
                                    </h3>
                                    <p className="text-sm" style={{ color: '#4a4a4a' }}>
                                        {waypoint.year}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                <MapUpdater activeIndex={activeWaypointIndex} />
            </MapContainer>
        </div>
    );
}
