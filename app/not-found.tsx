import React from 'react';
import Link from 'next/link';
import { SearchX, HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[#07906a]/10 text-[#07906a] rounded-full shadow-inner">
            <SearchX size={64} />
          </div>
        </div>
        
        <h1 className="text-5xl font-black text-slate-800 mb-2 font-sans tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-700 mb-4 uppercase tracking-wider text-sm">Page Not Found</h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          The destination you are trying to reach either doesn't exist or has been moved. Let's get you back to finding your dream job!
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-[#07906a] to-[#045c44] text-white font-bold rounded-2xl hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-md shadow-[#07906a]/20"
        >
          <HomeIcon size={20} />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
