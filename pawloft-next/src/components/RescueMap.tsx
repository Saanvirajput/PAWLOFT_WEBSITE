"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js/Leaflet
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for different entities
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const caseIcon = createCustomIcon('#ff6b9d'); // Pink/Red for emergency
const volunteerIcon = createCustomIcon('#22c55e'); // Green for volunteers
const ngoIcon = createCustomIcon('#3b82f6'); // Blue for NGOs/Vets

// Mock generator for points near center
const generateMockPoints = (centerLat: number, centerLng: number, count: number, offsetScale: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    lat: centerLat + (Math.random() - 0.5) * offsetScale,
    lng: centerLng + (Math.random() - 0.5) * offsetScale,
    name: `Mock Entity ${i+1}`
  }));
};

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
};

const RescueMap = () => {
  // Center of India as initial fallback
  const [center, setCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [locationFound, setLocationFound] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
          setLocationFound(true);
        },
        (error) => {
          console.error("Error obtaining location:", error);
          // Fallback to a default city if permission denied (e.g. Bangalore)
          setCenter([12.9716, 77.5946]);
        }
      );
    }
  }, []);

  // Generate dynamic mock data based on the current center so it doesn't just show Mumbai points
  const cases = generateMockPoints(center[0], center[1], 3, 0.05);
  const volunteers = generateMockPoints(center[0], center[1], 5, 0.08);
  const ngos = generateMockPoints(center[0], center[1], 2, 0.1);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative z-10" style={{ minHeight: '500px' }}>
      <MapContainer 
        center={center} 
        zoom={locationFound ? 13 : 5} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <MapUpdater center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Coverage Circle */}
        <Circle 
          center={center} 
          pathOptions={{ fillColor: '#10B981', fillOpacity: 0.1, color: '#10B981', weight: 1, dashArray: '4' }} 
          radius={5000} // 5km coverage radius
        />

        {/* Render Cases */}
        {cases.map((c) => (
          <Marker key={`case-${c.id}`} position={[c.lat, c.lng]} icon={caseIcon}>
            <Popup className="rescue-popup text-sm">
              <strong className="text-text-primary">Emergency Request</strong><br/>
              <span className="text-danger font-semibold">Awaiting Dispatch</span>
            </Popup>
          </Marker>
        ))}

        {/* Render Volunteers */}
        {volunteers.map((v) => (
          <Marker key={`vol-${v.id}`} position={[v.lat, v.lng]} icon={volunteerIcon}>
            <Popup className="rescue-popup text-sm">
              <strong className="text-text-primary">Active Responder</strong><br/>
              <span className="text-success text-xs">On Duty</span>
            </Popup>
          </Marker>
        ))}

        {/* Render NGOs/Vets */}
        {ngos.map((n) => (
          <Marker key={`ngo-${n.id}`} position={[n.lat, n.lng]} icon={ngoIcon}>
            <Popup className="rescue-popup text-sm">
              <strong className="text-text-primary">Verified Partner</strong><br/>
              <span className="text-text-secondary">Medical Facility</span>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default RescueMap;
