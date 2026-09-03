import React from 'react';
import { Worker } from '@/lib/mockData';

interface WorkerCardProps {
  worker: Worker;
  onBook: (workerId: string) => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onBook }) => {
  return (
    <div className="border border-stone-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-stone-900">{worker.name}</h3>
          {/* Society Badge - Cooperative Identity */}
          <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
            🏛️ {worker.societyName}
          </span>
        </div>
        {worker.verified && (
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
            ✓ Verified
          </span>
        )}
      </div>

      <p className="text-sm text-stone-600 mb-4 line-clamp-2">{worker.bio}</p>

      <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 mb-4 text-center text-xs">
        <div>
          <span className="block text-stone-400">Rating</span>
          <span className="font-bold text-stone-800">★ {worker.ratingAvg}</span>
        </div>
        <div>
          <span className="block text-stone-400">Experience</span>
          <span className="font-bold text-stone-800">{worker.experienceYears} yrs</span>
        </div>
        <div>
          <span className="block text-stone-400">Rate</span>
          <span className="font-bold text-stone-800">₹{worker.hourlyRate}/hr</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-stone-500">
          Fair Rotation: <strong className="text-stone-700">{worker.jobsThisWeek} jobs this week</strong>
        </span>
        <button
          onClick={() => onBook(worker.id)}
          className="px-4 py-2 bg-[#C1622E] hover:bg-[#a85223] text-white text-sm font-semibold rounded-lg transition"
        >
          Book Worker
        </button>
      </div>
    </div>
  );
};