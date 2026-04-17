"use client"
import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const primaryColor = "#07906a";

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10 h-16 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button 
              onClick={onMenuClick}
              className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden md:block relative w-96">
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
          </div>
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative"><Bell size={20} /></button>
            <div className="hidden sm:block h-8 w-[1px] bg-gray-200 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="profile" />
              </div>
            </div>
          </div>
        </header>
    )
}