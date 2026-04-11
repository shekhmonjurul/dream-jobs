"use client"
import React from 'react';
import Sidebar from './_ui/layout/Sidebar';
import Topbar from './_ui/layout/Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#F8FAFC]">
      {/* Side Bar Section */}
      <Sidebar />

      {/* Right Side Section Box */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* top bar */}
        <Topbar />

        {/* main content */}
        <main className="flex-1 overflow-auto p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}