"use client"
import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  Search, 
  Building, 
  LayoutDashboard, 
  Plus, 
  Bell, 
  Edit2, 
  Trash2,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
// Mock Data
const initialJobs = [
  { id: 'JOB-001', name: 'Software Engineer', company: 'Tech Corp', designation: 'Frontend Developer', vacancies: 3, salary: '$80k - $100k', status: 'Active' },
  { id: 'JOB-002', name: 'Product Manager', company: 'Innovate LLC', designation: 'Product Manager', vacancies: 1, salary: '$100k - $120k', status: 'Closed' },
  { id: 'JOB-003', name: 'UI/UX Designer', company: 'Design Pro', designation: 'Designer', vacancies: 2, salary: '$70k - $90k', status: 'Active' },
];

export default function JobsPage() {
     const primaryColor = "#07906a";
     const [jobs, setJobs] = useState(initialJobs);
     
     const filteredJobs = jobs; 

     const handleDelete = (id: string) => {
         setJobs(jobs.filter(job => job.id !== id));
     };

    return (
          <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Recent Job Postings</h2>
                <p className="text-xs text-gray-400 mt-0.5">Manage and update your published vacancies</p>
              </div>
              
              <Link 
                href={"/dashboard/jobs/new"}
                className="flex items-center gap-2 text-white px-6 py-2.5 rounded-xl font-bold transition-all text-sm shadow-lg active:scale-95"
                style={{ backgroundColor: primaryColor, boxShadow: `0 4px 14px 0 rgba(7, 144, 106, 0.3)` }}
              >
                <Plus size={18} /> Create New Job
              </Link>
            </div>
            
            {/* SCROLLABLE CONTAINER START */}
            <div 
              className="overflow-y-auto max-h-[450px] scrollbar-thin transition-all"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: `${primaryColor} #f1f1f1`
              }}
            >
              <table className="w-full text-left border-collapse">
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
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
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
                            <button onClick={() => handleDelete(job.id)} className="p-2 text-gray-400 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
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
            </div>
            {/* SCROLLABLE CONTAINER END */}

            <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Showing {filteredJobs.length} of {jobs.length} entries
              </p>
              <button className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest">
                View Full List
              </button>
            </div>
          </div>
    );
}