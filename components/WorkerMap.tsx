"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CUSTOMER_LOCATION, MOCK_WORKERS, getDistanceKm } from "@/lib/mockData";

// Leaflet's default marker icons don't load correctly in Next.js — fix it manually.
const customerIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:16px;height:16px;background:#C1622E;border:3px solid white;border-radius:50%;box-shadow:0 0 0 2px #C1622E;"></div>`,
  iconSize: [16, 16],
});

const workerIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:14px;height:14px;background:#1E3B2C;border:2px solid white;border-radius:50%;"></div>`,
  iconSize: [14, 14],
});

export default function WorkerMap({ categoryName }: { categoryName?: string }) {
  const workers = categoryName
    ? MOCK_WORKERS.filter((w) => w.categoryName === categoryName)
    : MOCK_WORKERS;

  return (
    <div className="rounded-2xl overflow-hidden border border-line" style={{ height: "280px" }}>
      <MapContainer
        center={[CUSTOMER_LOCATION.latitude, CUSTOMER_LOCATION.longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[CUSTOMER_LOCATION.latitude, CUSTOMER_LOCATION.longitude]} icon={customerIcon}>
          <Popup>Your location</Popup>
        </Marker>

        {workers.map((w) => {
          const distance = getDistanceKm(
            CUSTOMER_LOCATION.latitude,
            CUSTOMER_LOCATION.longitude,
            w.latitude,
            w.longitude
          );
          return (
            <Marker key={w.id} position={[w.latitude, w.longitude]} icon={workerIcon}>
              <Popup>
                <b>{w.name}</b>
                <br />
                {w.societyName}
                <br />
                {distance} km away
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}