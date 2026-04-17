"use client"

import React, { useEffect } from 'react';
import { AlertOctagon, RefreshCw, HomeIcon } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service if present
    console.error("Application Render Boundary Caught Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-red-100 border-t-4 border-t-red-500">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 text-red-500 rounded-full animate-pulse shadow-inner">
            <AlertOctagon size={56} />
          </div>
        </div>
        
        <h1 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Oops! Something went wrong</h1>
        
        <div className="bg-slate-50 p-3 rounded-lg mb-6 border border-slate-100 text-left">
           <p className="text-slate-500 text-xs font-mono break-all leading-relaxed">
             {error?.message || "An unexpected system crash occurred."}
           </p>
        </div>

        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
          Please try again. If the problem persists, our engineering team has been notified.
        </p>

        <div className="flex flex-col gap-3">
            <button 
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 shadow-md transition-all transform hover:scale-[1.02] active:scale-95"
            >
                <RefreshCw size={18} />
                Try to Recover
            </button>
            <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
            >
                <HomeIcon size={18} />
                Go to Home
            </Link>
        </div>
      </div>
    </div>
  );
}
