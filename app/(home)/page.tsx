import {
  Search,
  Calendar,
  ExternalLink,
  Briefcase,
  Info,
  CheckCircle2,
  Users,
  Banknote,
  ListFilter,
  LayoutGrid,
} from "lucide-react";
import type { Metadata } from "next";
import SearchForm from "./_components/SearchForm";
import { Suspense } from "react";
import { getPublicJobsAction } from "@/actions/jobs";

export const metadata: Metadata = {
  title: "Dream Jobs - Govt. & Top Career Opportunities",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    searched?: string;
    maxEducation?: string;
    age?: string;
    nationality?: string;
    others?: string;
  }>;
}) {
  const params = await searchParams;
  const isSearched = params.searched === "true";

  // Fetch jobs from Prisma database
  const res = await getPublicJobsAction({
    maxEducation: params.maxEducation,
    age: params.age,
    nationality: params.nationality,
    others: params.others,
  });

  const jobsList = res.success && res.data ? res.data : [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#07906a] to-[#045c44] text-white py-12 px-4 flex flex-col items-center text-center shadow-lg relative">
        <h1 className="text-3xl sm:text-5xl font-black mb-2 tracking-tight">DREAM JOBS</h1>
        <p className="text-emerald-50 opacity-90 tracking-widest uppercase font-semibold text-xs sm:text-sm">
          Elevate Your Career • Curated Bangladesh Job Portal
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 -mt-8 pb-20">
        {/* Search Form Section */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-10 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <Search className="text-emerald-600" size={24} />
              Eligibility Job Search
            </h2>
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <LayoutGrid size={18} className="text-emerald-600" />
              <span className="text-sm font-medium text-slate-600">Total Available Jobs:</span>
              <span className="text-sm font-bold text-emerald-700 bg-white px-2.5 py-0.5 rounded border border-emerald-100">
                {jobsList.length}
              </span>
            </div>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading search...</div>}>
            <SearchForm />
          </Suspense>
        </section>

        {/* Results Grid Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-emerald-600 pl-4">
            <h3 className="text-2xl font-bold text-slate-800">
              {isSearched ? "Filtered Search Results" : "Latest Job Openings"}
            </h3>
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm w-fit">
              <ListFilter size={16} />
              Showing {jobsList.length} Job{jobsList.length === 1 ? "" : "s"}
            </div>
          </div>

          {jobsList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {jobsList.map((job) => {
                let salaryDisplay = job.salaryScale?.scaleName || "Negotiable";
                if (job.salaryScale?.minSalary && job.salaryScale?.maxSalary) {
                  salaryDisplay = `${job.salaryScale.minSalary.toLocaleString()} - ${job.salaryScale.maxSalary.toLocaleString()}/-`;
                }

                const startDate = job.applicationStart
                  ? new Date(job.applicationStart).toISOString().split("T")[0]
                  : "N/A";
                const endDate = job.applicationEnd
                  ? new Date(job.applicationEnd).toISOString().split("T")[0]
                  : "N/A";

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl border border-slate-100 flex flex-col transition-all group overflow-hidden"
                  >
                    <div className="p-5 bg-[#07906a] text-white border-b border-[#07906a]/20">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                          {job.jobType?.name || "Job"}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-50">
                          <Users size={14} className="text-white" /> {job.vacancies || 0} Vacancies
                        </div>
                      </div>
                      <h4 className="font-bold text-lg leading-tight h-14 line-clamp-2 text-white mt-1">
                        {job.designation}
                      </h4>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="bg-slate-50 group-hover:bg-[#07906a]/5 p-2 rounded-lg border border-slate-100 transition-colors">
                        <div className="flex items-center gap-2 text-[#07906a] font-bold text-[11px] whitespace-nowrap overflow-hidden">
                          <Banknote size={14} className="shrink-0" />
                          <span>Scale: {salaryDisplay}</span>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100 pb-1">
                          Requirements
                        </p>
                        <ul className="space-y-1.5">
                          {job.educations && job.educations.length > 0 ? (
                            job.educations.map((edu: { educationTitle: string; requirements?: string | null }, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                                <span>
                                  <b>Edu:</b> {edu.educationTitle}{" "}
                                  {edu.requirements ? `(${edu.requirements})` : ""}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                              <span>Graduate / Specified Degree</span>
                            </li>
                          )}
                          <li className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span>
                              <b>Age:</b> {job.minAge || 18} - {job.maxAge || 30} Years
                            </span>
                          </li>
                          <li className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span>
                              <b>Nat:</b> {job.nationality || "Bangladeshi"}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex justify-between gap-2 pt-2 border-t border-slate-100">
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 uppercase">Starts</p>
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                            <Calendar size={12} className="text-emerald-500" />
                            {startDate}
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[10px] text-red-400 uppercase">Deadline</p>
                          <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-red-600">
                            <Calendar size={12} />
                            {endDate}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <a
                          href={job.detailsLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 py-2 px-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all border border-slate-200"
                        >
                          <Info size={14} /> Details
                        </a>
                        <a
                          href={job.applyLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 py-2 px-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                        >
                          Apply <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Briefcase size={64} className="mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-bold text-slate-600">No matching jobs found</p>
              <p className="text-sm text-slate-400 mt-1">Try resetting search filters or changing keywords.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} Dream Jobs Portal | Muslim Innovations
      </footer>
    </div>
  );
}