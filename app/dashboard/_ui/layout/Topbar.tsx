"use client"
import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';

export default function Topbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const primaryColor = "#07906a";

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10 h-16">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search jobs, IDs..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 transition-all text-sm text-black outline-none"
              style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative"><Bell size={20} /></button>
            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="profile" />
              </div>
            </div>
          </div>
        </header>
    )
}