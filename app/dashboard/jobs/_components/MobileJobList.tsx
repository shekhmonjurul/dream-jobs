"use client";

import React, { useTransition } from "react";
import { Building, Edit2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { JobData } from "./types";
import { deleteJobAction } from "@/actions/jobs";
import { useRouter } from "next/navigation";

interface MobileJobListProps {
  jobs: JobData[];
}

export default function MobileJobList({ jobs }: MobileJobListProps) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    startTransition(async () => {
      const res = await deleteJobAction(id);
      setDeletingId(null);
      if (!res.success) {
        alert(res.error || "Failed to delete job.");
      } else {
        router.refresh();
      }
    });
  };

  return (
    <div className="md:hidden flex flex-col gap-3 sm:gap-4 bg-[#F8FAFC] p-3 sm:p-4 rounded-b-2xl">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl px-4 py-4 sm:p-5 shadow-sm flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 relative"
          >
            {/* Left Section (Profile) */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="font-bold text-gray-800 text-base">{job.name}</div>
              <div className="text-sm text-gray-600 font-medium mt-0.5">{job.designation}</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2">
                <span className="bg-gray-100 px-2 py-0.5 rounded font-bold uppercase tracking-tighter truncate max-w-[80px]">
                  {job.id.substring(0, 8)}...
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Building size={12} />
                  {job.jobType}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-start sm:items-end justify-between gap-3 min-w-[130px] pt-3 border-t sm:border-t-0 border-gray-100 sm:pt-0">
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full">
                <div className="flex items-center gap-1.5">
                  <div
                    className="inline-flex items-center justify-center text-xs font-bold text-gray-600 bg-gray-100 h-6 px-2 rounded-full"
                    title="Vacancies"
                  >
                    {job.vacancies} <span className="text-[10px] ml-1 font-normal uppercase">Vac.</span>
                  </div>
                  <span
                    className={`text-[9px] px-2 h-6 flex items-center justify-center rounded-full font-black uppercase tracking-tight ${
                      job.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="flex gap-1 border-l border-gray-100 pl-2">
                  <Link
                    href={`/dashboard/jobs/${job.id}/edit`}
                    className="p-1.5 text-gray-400 hover:text-blue-600 transition-all rounded-md bg-gray-50"
                  >
                    <Edit2 size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id, job.name)}
                    disabled={isPending && deletingId === job.id}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-all rounded-md bg-gray-50 disabled:opacity-50"
                  >
                    {deletingId === job.id ? (
                      <Loader2 size={14} className="animate-spin text-red-600" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-xs font-black text-gray-800 bg-green-50 text-[#07906a] px-3 py-1.5 rounded-lg border border-green-100 whitespace-nowrap self-start sm:self-end">
                {job.salary}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 text-gray-400">No jobs found.</div>
      )}
    </div>
  );
}
