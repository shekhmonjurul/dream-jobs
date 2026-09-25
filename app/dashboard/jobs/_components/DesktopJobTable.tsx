"use client";

import React, { useTransition } from "react";
import { Building, Edit2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { JobData } from "./types";
import { deleteJobAction } from "@/actions/jobs";
import { useRouter } from "next/navigation";

interface DesktopJobTableProps {
  jobs: JobData[];
}

export default function DesktopJobTable({ jobs }: DesktopJobTableProps) {
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
    <table className="hidden md:table w-full text-left border-collapse min-w-[800px]">
      <thead className="sticky top-0 z-10 bg-white">
        <tr className="bg-gray-50/80 backdrop-blur-sm text-gray-400 text-[10px] uppercase tracking-widest font-black shadow-sm">
          <th className="px-6 py-4">Job Profile</th>
          <th className="px-6 py-4">Designation</th>
          <th className="px-6 py-4 text-center">Vacancies</th>
          <th className="px-6 py-4">Salary Scale</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <tr key={job.id} className="hover:bg-[#F8FAFC] transition-colors group">
              <td className="px-6 py-5">
                <div className="font-bold text-gray-800">{job.name}</div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                  <span className="bg-gray-100 px-2 py-0.5 rounded font-bold uppercase tracking-tighter shrink-0 max-w-[80px] truncate" title={job.id}>
                    {job.id.substring(0, 8)}...
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Building size={12} />
                    {job.jobType}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 text-sm text-gray-600 font-medium">{job.designation}</td>
              <td className="px-6 py-5 text-center">
                <div className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {job.vacancies}
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-bold text-gray-800">{job.salary}</td>
              <td className="px-6 py-5">
                <span
                  className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tight ${
                    job.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/dashboard/jobs/${job.id}/edit`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50"
                    title="Edit Job"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id, job.name)}
                    disabled={isPending && deletingId === job.id}
                    className="p-2 text-gray-400 hover:text-red-600 transition-all rounded-lg hover:bg-red-50 disabled:opacity-50"
                    title="Delete Job"
                  >
                    {deletingId === job.id ? (
                      <Loader2 size={16} className="animate-spin text-red-600" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="px-6 py-20 text-center text-gray-400">
              No jobs found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
