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
    Calendar
} from 'lucide-react';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const primaryColor: string = "#07906a";
    return (
        <aside
            className={`bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out z-20 ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            <div
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`p-6 cursor-pointer flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-start gap-2'}`}
            >
                <div className="p-1.5 rounded-lg text-white shrink-0 shadow-sm" style={{ backgroundColor: primaryColor }}>
                    <Briefcase size={20} />
                </div>
                {!isCollapsed && (
                    <div className="flex items-center gap-2 font-bold text-2xl overflow-hidden whitespace-nowrap" style={{ color: primaryColor }}>
                        Dream Jobs
                    </div>
                )}
            </div>

            <nav className="flex-1 px-3 space-y-1">
                <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} collapsed={isCollapsed} primaryColor={primaryColor} href="/dashboard" />
                <SidebarItem icon={<Briefcase size={20} />} label="All Jobs" active={activeTab === 'all-jobs'} collapsed={isCollapsed} primaryColor={primaryColor} href="/dashboard/jobs" />
            </nav>
        </aside>
    )
}