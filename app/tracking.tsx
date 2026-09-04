"use client";

import dynamic from "next/dynamic";
import { MOCK_WORKERS } from "@/lib/mockData";

const WorkerTracker = dynamic(() => import("@/components/WorkerTracker"), { ssr: false });

export default function TrackingPage() {
  const worker = MOCK_WORKERS[0]; // Ramesh Kumar, for the demo

  return (
    <main className="min-h-screen bg-cream max-w-md mx-auto px-5 pt-8 pb-10">
      <h1 className="font-display text-2xl text-ink mb-1">Booking confirmed</h1>
      <p className="text-sm text-muted mb-5">Track your worker in real time.</p>

      <WorkerTracker
        startLat={worker.latitude}
        startLng={worker.longitude}
        workerName={worker.name}
      />
    </main>
  );
}