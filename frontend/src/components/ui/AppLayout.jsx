import React from 'react';
import Navbar from '../Navbar';

export default function AppLayout({ activeTab, setActiveTab, children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* Persistent Shared Header Nav */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main View Container */}
        <main className="pb-16">
          {children}
        </main>
      </div>

      {/* Shared Persistent Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-xs text-slate-500">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900">
              Placement<span className="text-[#635BFF]">Mentor</span> AI
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 font-medium">Dual-Engine ML (Random Forest + YOLO26-Pose)</span>
          </div>
          <div className="text-slate-400">
            © {new Date().getFullYear()} PlacementMentor AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
