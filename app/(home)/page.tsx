import { Search, Calendar, ExternalLink, Briefcase, Info, CheckCircle2, Users, Banknote, ListFilter, LayoutGrid } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import SearchForm from './_components/SearchForm';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Home({ searchParams }: { searchParams: Promise<{ searched?: string }> }) {
  const params = await searchParams;
  const submitted = params.searched === 'true';

  // Mock Data
  const jobs = [
    {
      id: 1, designation: "Assistant Programmer", vacancies: 45, salary: "22,000 - 53,060/-",
      req_edu: "B.Sc in CSE/ICT", req_age: "21-30 Years", req_nationality: "Bangladeshi",
      start: "2024-03-01", end: "2024-03-30", link: "https://mopa.teletalk.com.bd",
    },
    {
      id: 2, designation: "Senior Officer", vacancies: 250, salary: "22,000 - 53,060/-",
      req_edu: "Masters Degree (Any)", req_age: "22-30 Years", req_nationality: "Bangladeshi",
      start: "2024-02-15", end: "2024-03-15", link: "https://erecruitment.bb.org.bd",
    },
    {
      id: 3, designation: "Sub-Inspector", vacancies: 800, salary: "16,000 - 38,640/-",
      req_edu: "Graduate (Any)", req_age: "19-27 Years", req_nationality: "Bangladeshi",
      start: "2024-03-10", end: "2024-04-05", link: "https://police.teletalk.com.bd",
    },
    {
      id: 4, designation: "Administrative Officer", vacancies: 120, salary: "16,000 - 38,640/-",
      req_edu: "Masters in Admin/Arts", req_age: "21-30 Years", req_nationality: "Bangladeshi",
      start: "2024-03-05", end: "2024-03-25", link: "https://bpsc.teletalk.com.bd",
    },
    {
      id: 5, designation: "Office Assistant", vacancies: 1500, salary: "9,300 - 22,490/-",
      req_edu: "HSC Pass", req_age: "18-30 Years", req_nationality: "Bangladeshi",
      start: "2024-03-20", end: "2024-04-20", link: "https://dpe.teletalk.com.bd",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#07906a] to-[#045c44] text-white py-12 px-4 flex flex-col items-center text-center shadow-lg">
        <h1 className="text-4xl font-black mb-2 tracking-tight">DREAM JOBS</h1>
        <p className="text-emerald-50 opacity-90 tracking-widest uppercase font-semibold text-sm">Elevate Your Career</p>
      </header>

      <main className="max-w-7xl mx-auto px-1 sm:px-4 -mt-8 pb-20">
        {/* Search Form Section */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 md:p-8 mb-10 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Search className="text-emerald-600" size={24} />
              Eligibility Form
            </h2>
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <LayoutGrid size={18} className="text-emerald-600" />
              <span className="text-sm font-medium text-slate-600">Total Jobs:</span>
              <span className="text-sm font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-100">{jobs.length}</span>
            </div>
          </div>
          
          {/* Extracted Interactive Form components (Client Side) */}
          <SearchForm />
        </section>

        {/* Results Grid Section */}
        {submitted && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-emerald-600 pl-4">
              <h3 className="text-2xl font-bold text-slate-800">
                Available Jobs for You
              </h3>
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm w-fit">
                <ListFilter size={16} />
                Total Found: {jobs.length}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl border border-slate-100 flex flex-col transition-all group overflow-hidden">
                  <div className="p-5 bg-[#07906a] text-white border-b border-[#07906a]/20">
                    <div className="flex justify-between items-start mb-2">
                       <div className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        Govt Job
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-50">
                        <Users size={14} className="text-white" /> {job.vacancies} Vacancies
                      </div>
                    </div>
                    <h4 className="font-bold text-lg leading-tight h-14 line-clamp-2 text-white mt-1">
                      {job.designation}
                    </h4>
                  </div>

                  <div className="p-5 flex-1 space-y-4">
                    <div className="bg-slate-50 group-hover:bg-[#07906a]/5 p-2 rounded-lg border border-slate-100 transition-colors">
                      <div className="flex items-center gap-2 text-[#07906a] font-bold text-[11px] whitespace-nowrap overflow-hidden">
                        <Banknote size={14} className="shrink-0" />
                        <span>Scale: {job.salary}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100 pb-1">Requirements</p>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span><b>Edu:</b> {job.req_edu}</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span><b>Age:</b> {job.req_age}</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span><b>Nat:</b> {job.req_nationality}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between gap-2 pt-2 border-t border-slate-100">
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase">Starts</p>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                          <Calendar size={12} className="text-emerald-500" />
                          {job.start}
                        </div>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-[10px] text-red-400 uppercase">Deadline</p>
                        <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-red-600">
                          <Calendar size={12} />
                          {job.end}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <a 
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 py-2 px-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all border border-slate-200"
                      >
                        <Info size={14} /> Details
                      </a>
                      <a 
                        href={job.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 py-2 px-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                      >
                         Apply <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!submitted && (
          <div className="text-center py-20 opacity-40">
            <Briefcase size={64} className="mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">Form fillup kore job khujun</p>
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        &copy; 2024 Govt Job Search Portal | Careers Search
      </footer>
    </div>
  );
}