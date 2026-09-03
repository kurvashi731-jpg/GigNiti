'use client';

import React, { useState } from 'react';
import { MOCK_CATEGORIES, MOCK_WORKERS, Worker } from '@/lib/mockData';
import { WorkerCard } from '@/components/WorkerCard';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filter workers based on selected category
  const filteredWorkers = selectedCategory
    ? MOCK_WORKERS.filter((w) => w.categoryName.toLowerCase() === selectedCategory.toLowerCase())
    : MOCK_WORKERS;

  const handleBookClick = (workerId: string) => {
    const worker = MOCK_WORKERS.find((w) => w.id === workerId);
    if (worker) {
      setSelectedWorker(worker);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedWorker(null);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 px-4 py-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <header className="mb-10 text-center">
        <span className="text-xs font-bold tracking-widest text-[#C1622E] uppercase">
          Cooperative Services Platform (SIH Prototype)
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#1E3B2C] mt-1">
          CoopServe Marketplace
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto mt-2 text-sm">
          Fair Rotation Algorithm • Portable Welfare Passbook • Member-Owned Cooperative
        </p>
      </header>

      {/* Success Notification */}
      {bookingSuccess && (
        <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-center font-medium shadow-sm animate-fade-in">
          🎉 Service Booking Confirmed via Fair-Rotation Rules!
        </div>
      )}

      {/* Categories Filter */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#1E3B2C]">Browse Categories</h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-[#C1622E] underline font-semibold"
            >
              Show All Categories
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MOCK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                className={`p-4 rounded-xl border cursor-pointer transition text-center shadow-sm ${
                  isSelected
                    ? 'border-[#C1622E] bg-orange-50/50 ring-2 ring-[#C1622E]/20'
                    : 'border-stone-200 bg-white hover:border-[#C1622E]'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="font-semibold text-stone-800 text-sm">{cat.name}</h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-1">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workers List Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#1E3B2C]">
            {selectedCategory ? `${selectedCategory} Workers` : 'Recommended Workers'}
          </h2>
          <span className="text-xs text-stone-500">
            Sorted by Fair Workload Rotation
          </span>
        </div>

        {filteredWorkers.length === 0 ? (
          <div className="p-8 text-center bg-white border border-stone-200 rounded-xl">
            <p className="text-stone-500 text-sm">No workers available in this category currently.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} onBook={handleBookClick} />
            ))}
          </div>
        )}
      </section>

      {/* Booking Modal Popup */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Book {selectedWorker.name}</h3>
                <p className="text-xs text-emerald-700 font-medium">{selectedWorker.societyName}</p>
              </div>
              <button
                onClick={() => setSelectedWorker(null)}
                className="text-stone-400 hover:text-stone-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Service Date</label>
                <input
                  type="date"
                  required
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#C1622E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Time Slot</label>
                <select className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#C1622E]">
                  <option>Morning (09:00 AM - 12:00 PM)</option>
                  <option>Afternoon (01:00 PM - 04:00 PM)</option>
                  <option>Evening (04:00 PM - 07:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Service Address</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Enter house no, landmark, street address..."
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#C1622E]"
                ></textarea>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg text-xs space-y-1 text-stone-600">
                <div className="flex justify-between">
                  <span>Visit Charge:</span>
                  <span className="font-semibold text-stone-800">₹{selectedWorker.visitCharge}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hourly Rate:</span>
                  <span className="font-semibold text-stone-800">₹{selectedWorker.hourlyRate}/hr</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-1 font-bold text-stone-900">
                  <span>Fair Trade Total Estimate:</span>
                  <span>₹{selectedWorker.visitCharge + selectedWorker.hourlyRate}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedWorker(null)}
                  className="flex-1 py-2.5 border border-stone-300 text-stone-700 text-sm font-semibold rounded-lg hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#C1622E] text-white text-sm font-semibold rounded-lg hover:bg-[#a85223]"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}