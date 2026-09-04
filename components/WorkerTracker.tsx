"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CUSTOMER_LOCATION } from "@/lib/mockData";
import dynamic from 'next/dynamic';

const workerIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:18px;height:18px;background:#C1622E;border:3px solid white;border-radius:50%;box-shadow:0 0 8px rgba(193,98,46,0.6);"></div>`,
  iconSize: [18, 18],
});

const customerIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:14px;height:14px;background:#1E3B2C;border:3px solid white;border-radius:50%;"></div>`,
  iconSize: [14, 14],
});


export default function WorkerTracker({
  startLat,
  startLng,
  workerName,
}: {
  startLat: number;
  startLng: number;
  workerName: string;
}) {
  const [progress, setProgress] = useState(0); // 0 = just started, 1 = arrived

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 1 ? 1 : p + 0.02));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const currentLat = startLat + (CUSTOMER_LOCATION.latitude - startLat) * progress;
  const currentLng = startLng + (CUSTOMER_LOCATION.longitude - startLng) * progress;
  const etaMinutes = Math.max(1, Math.round((1 - progress) * 12));
  const arrived = progress >= 1;

  return (
    <div>
      <div className="flex justify-between items-center px-1 pb-2">
        <span className="text-sm font-semibold text-ink">
          {arrived ? `${workerName} has arrived` : `${workerName} is on the way`}
        </span>
        {!arrived && (
          <span className="text-xs text-terracotta-dark font-medium">
            Arriving in {etaMinutes} min
          </span>
        )}
      </div>

      <div className="rounded-2xl overflow-hidden border border-line" style={{ height: "260px" }}>
        <MapContainer center={[currentLat, currentLng]} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline
            positions={[
              [startLat, startLng],
              [CUSTOMER_LOCATION.latitude, CUSTOMER_LOCATION.longitude],
            ]}
            pathOptions={{ color: "#C1622E", dashArray: "6 8", weight: 2 }}
          />
          <Marker position={[currentLat, currentLng]} icon={workerIcon}>
            <Popup>{workerName}</Popup>
          </Marker>
          <Marker
            position={[CUSTOMER_LOCATION.latitude, CUSTOMER_LOCATION.longitude]}
            icon={customerIcon}
          >
            <Popup>Your location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}