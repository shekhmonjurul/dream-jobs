"use client";

import React, { useState } from "react";
import { Search, GraduationCap, User, Globe, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [maxEducation, setMaxEducation] = useState(searchParams.get("maxEducation") || "");
  const [age, setAge] = useState(searchParams.get("age") || "");
  const [nationality, setNationality] = useState(searchParams.get("nationality") || "Bangladeshi");
  const [others, setOthers] = useState(searchParams.get("others") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    params.set("searched", "true");
    if (maxEducation) params.set("maxEducation", maxEducation);
    if (age) params.set("age", age);
    if (nationality) params.set("nationality", nationality);
    if (others) params.set("others", others);

    router.push(`/?${params.toString()}`);
  };

  const handleReset = () => {
    setMaxEducation("");
    setAge("");
    setNationality("Bangladeshi");
    setOthers("");
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <GraduationCap size={16} className="text-emerald-600" /> Qualification
          </label>
          <select
            name="maxEducation"
            value={maxEducation}
            onChange={(e) => setMaxEducation(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 bg-white"
          >
            <option value="">All Qualifications</option>
            <option value="SSC">SSC / Equivalent</option>
            <option value="HSC">HSC / Diploma</option>
            <option value="BSc">B.Sc / Honours / Graduation</option>
            <option value="Masters">Masters / Above</option>
            <option value="MBBS">MBBS</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User size={16} className="text-emerald-600" /> Your Age
          </label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Age (e.g. 24)"
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Globe size={16} className="text-emerald-600" /> Nationality
          </label>
          <input
            type="text"
            name="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Bangladeshi"
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Keywords / Designation</label>
          <input
            type="text"
            name="others"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
            placeholder="Ex: Programmer, Officer"
            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl sm:rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search size={18} /> Search Available Jobs
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </form>
  );
}
