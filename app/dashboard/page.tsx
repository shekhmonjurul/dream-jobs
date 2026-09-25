import React from "react";
import prisma from "@/lib/prisma/prisma";
import { Briefcase, CheckCircle2, AlertCircle, Plus, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import DesktopJobTable from "./jobs/_components/DesktopJobTable";
import getAllJobs from "./_backend/getAllJobs";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const now = new Date();

  const totalJobs = await prisma.job.count();

  const activeJobs = await prisma.job.count({
    where: {
      AND: [
        { OR: [{ applicationEnd: null }, { applicationEnd: { gte: now } }] },
        { OR: [{ applicationStart: null }, { applicationStart: { lte: now } }] },
      ],
    },
  });

  const deactiveJobs = totalJobs - activeJobs;

  const vacanciesAggregate = await prisma.job.aggregate({
    _sum: { vacancies: true },
  });
  const totalVacancies = vacanciesAggregate._sum.vacancies || 0;

  const jobsList = await getAllJobs(params.q);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#07906a] to-[#045c44] text-white p-6 sm:p-8 rounded-2xl md:rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Admin Dashboard</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Overview of live circulars, vacancies, and portal performance
          </p>
        </div>
        <Link
          href="/dashboard/jobs/new"
          className="flex items-center gap-2 bg-white text-[#07906a] px-5 py-3 rounded-xl font-bold shadow hover:bg-emerald-50 transition-all text-sm shrink-0"
        >
          <Plus size={18} /> Post New Job
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Jobs</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{totalJobs}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Briefcase size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Jobs</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{activeJobs}</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expired / Closed</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{deactiveJobs}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <AlertCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Vacancies</p>
            <h3 className="text-2xl font-black text-blue-600 mt-1">{totalVacancies.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* Recent Job Postings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">
            {params.q ? `Postings matching "${params.q}"` : "Recent Postings"}
          </h2>
          <Link
            href="/dashboard/jobs"
            className="text-xs font-bold text-[#07906a] hover:underline flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <DesktopJobTable jobs={jobsList.slice(0, 5)} />
      </div>
    </div>
  );
}