import Link from 'next/link';
import React from 'react';

interface SideBarProps {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    collapsed: boolean;
    primaryColor: string;
    href: string;
}

const SidebarItem = ({ icon, label, active, collapsed, primaryColor, href }: SideBarProps) => (
    <Link 
    href={href}
    className={`group relative w-full flex items-center transition-all duration-200 rounded-xl p-3 mb-1 ${active ? 'bg-[#07906a]/10 font-bold' : 'hover:bg-gray-50 text-gray-500'}`} style={{ color: active ? primaryColor : '' }}>
        <div className={`transition-all duration-300 ${collapsed ? 'mx-auto' : 'mr-3'}`}>{icon}</div>
        {!collapsed && <span className="text-sm whitespace-nowrap overflow-hidden">{label}</span>}
        {collapsed && <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 invisible group-hover:visible group-hover:opacity-100 z-50 whitespace-nowrap uppercase font-bold tracking-widest">{label}</div>}
    </Link>
);


export default SidebarItem;
