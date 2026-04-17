"use client"
import React from 'react';
import { Search, GraduationCap, User, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would serialize the form data to URL parameters here
    // For now, we visually trigger the 'submitted' state by adding a query param
    router.push('/?searched=true');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <GraduationCap size={16} /> Max Education
          </label>
          <select 
            name="maxEducation"
            required
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          >
            <option value="">Select Education</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="Graduation">Graduation</option>
            <option value="Masters">Masters/Above</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <User size={16} /> Age
          </label>
          <input 
            type="number" 
            name="age"
            placeholder="Enter Age"
            required
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Globe size={16} /> Nationality
          </label>
          <input 
            type="text" 
            name="nationality"
            defaultValue="Bangladeshi"
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 text-slate-500">Others / Skills</label>
          <input 
            type="text" 
            name="others"
            placeholder="Ex: Height, Experience"
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          type="submit" 
          className="w-full md:w-auto px-12 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <Search size={18} /> Search Available Jobs
        </button>
      </div>
    </form>
  );
}
