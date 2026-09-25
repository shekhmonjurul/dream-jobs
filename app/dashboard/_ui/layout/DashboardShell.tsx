"use client";

import React, { useState, Suspense } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex bg-[#F8FAFC] relative">
      {/* Side Bar Section */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Right Side Section Box */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 w-full sm:w-auto">
        {/* top bar with Suspense boundary */}
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
          <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        </Suspense>

        {/* main content */}
        <main className="flex-1 overflow-auto p-2 sm:p-4 md:p-6 min-h-[calc(100vh-4rem)] bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
