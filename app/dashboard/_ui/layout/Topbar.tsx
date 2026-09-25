"use client";

import React, { useState } from "react";
import { Search, Bell, Menu, LogOut, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const primaryColor = "#07906a";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);

    const params = new URLSearchParams(searchParams.toString());
    if (val.trim()) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error: unknown) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 h-16 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        <div className="relative w-48 sm:w-80 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search jobs, designations..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:ring-2 transition-all text-sm text-black outline-none"
            style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto relative">
        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
        </button>
        <div className="hidden sm:block h-8 w-[1px] bg-gray-200 mx-1"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 overflow-hidden shrink-0 relative flex items-center justify-center text-[#07906a] font-bold">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="profile"
                width={36}
                height={36}
                unoptimized
              />
            </div>
            <span className="hidden md:block text-xs font-bold text-slate-700">
              {session?.user?.name || "Admin"}
            </span>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {isProfileOpen && (
            <>
              {/* Overlay backdrop to close dropdown on click outside */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsProfileOpen(false)}
              ></div>

              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-40 animate-in fade-in zoom-in duration-150">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-800">{session?.user?.name || "Admin User"}</p>
                  <p className="text-[11px] text-gray-400 truncate">{session?.user?.email || "admin@dreamjobs.com"}</p>
                </div>

                <div className="p-1">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 flex items-center gap-2">
                    <User size={14} /> Role: Administrator
                  </div>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-1"
                  >
                    <LogOut size={16} />
                    {isLoggingOut ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}