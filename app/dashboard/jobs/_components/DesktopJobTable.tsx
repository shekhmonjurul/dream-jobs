import React from 'react';
import { Building, Edit2, Trash2 } from 'lucide-react';
import { JobData } from './types';

interface DesktopJobTableProps {
  jobs: JobData[];
  onDelete: (id: string) => void;
}

export default function DesktopJobTable({ jobs, onDelete }: DesktopJobTableProps) {
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
                  <span className="bg-gray-100 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">{job.id}</span>
                  <span className="flex items-center gap-1 font-medium"><Building size={12}/>{job.company}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-sm text-gray-600 font-medium">{job.designation}</td>
              <td className="px-6 py-5 text-center">
                <div className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{job.vacancies}</div>
              </td>
              <td className="px-6 py-5 text-sm font-bold text-gray-800">{job.salary}</td>
              <td className="px-6 py-5">
                 <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tight ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {job.status}
                 </span>
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex justify-end gap-1">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-all"><Edit2 size={16} /></button>
                  <button onClick={() => onDelete(job.id)} className="p-2 text-gray-400 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="px-6 py-20 text-center text-gray-400">No jobs found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
