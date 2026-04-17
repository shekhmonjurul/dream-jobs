"use client"
import React, { useState } from 'react';
import {
    Briefcase,
    Users,
    DollarSign,
    Search,
    Building,
    LayoutDashboard,
    Plus,
    Bell,
    Edit2,
    Trash2,
    CheckCircle,
    Clock,
    TrendingUp,
    Calendar,
    X
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import Image from 'next/image';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const primaryColor: string = "#07906a";
    return (
        <aside
            className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-transform duration-300 ease-in-out z-50 fixed md:sticky top-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${isCollapsed ? 'md:w-20 w-70' : 'w-80'}`}
        >
            <div className={`p-6 flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <div 
                    onClick={() => setIsCollapsed(!isCollapsed)} 
                    className={`flex items-center cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start gap-2.5'}`}
                >
                    <div className="shrink-0 overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">

                        <Image src="/logo.png" alt="Logo" className=" object-contain pointer-events-none" width={40} height={40} />
                    </div>
                    {!isCollapsed && (
                        <div className="flex items-center font-black text-2xl tracking-tight overflow-hidden whitespace-nowrap" style={{ color: primaryColor }}>
                            DREAM JOBS
                        </div>
                    )}
                </div>
                
                {/* Mobile Close Button */}
                <button 
                  className="md:hidden text-gray-400 hover:bg-gray-100 p-1.5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} collapsed={isCollapsed} primaryColor={primaryColor} href="/dashboard" />
                <SidebarItem icon={<Briefcase size={20} />} label="All Jobs" active={activeTab === 'all-jobs'} collapsed={isCollapsed} primaryColor={primaryColor} href="/dashboard/jobs" />
            </nav>
        </aside>
    )
}