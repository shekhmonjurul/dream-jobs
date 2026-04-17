"use client"
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import DesktopJobTable from './_components/DesktopJobTable';
import MobileJobList from './_components/MobileJobList';
import { JobData } from './_components/types';

// Mock Data
const initialJobs: JobData[] = [
  { id: 'JOB-001', name: 'Software Engineer', company: 'Tech Corp', designation: 'Frontend Developer', vacancies: 3, salary: '$80k - $100k', status: 'Active' },
  { id: 'JOB-002', name: 'Product Manager', company: 'Innovate LLC', designation: 'Product Manager', vacancies: 1, salary: '$100k - $120k', status: 'Closed' },
  { id: 'JOB-003', name: 'UI/UX Designer', company: 'Design Pro', designation: 'Designer', vacancies: 2, salary: '$70k - $90k', status: 'Active' },
];

export default function JobsPage() {
    const primaryColor = "#07906a";
    const [jobs, setJobs] = useState<JobData[]>(initialJobs);
     
    // Added for potential future search/filter logic
    const filteredJobs = jobs; 

    const handleDelete = (id: string) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    return (
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 md:p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Recent Job Postings</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Manage and update your published vacancies</p>
            </div>
            
            <Link 
              href={"/dashboard/jobs/new"}
              className="flex justify-center items-center gap-2 text-white px-6 py-3 w-full sm:w-auto rounded-xl font-bold transition-all text-sm shadow-lg active:scale-95 hover:brightness-110"
              style={{ backgroundColor: primaryColor, boxShadow: `0 4px 14px 0 rgba(7, 144, 106, 0.3)` }}
            >
              <Plus size={18} /> Create New Job
            </Link>
          </div>
          
          {/* SCROLLABLE CONTAINER START */}
          <div 
            className="overflow-auto max-h-[500px] w-full scrollbar-thin transition-all"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: `${primaryColor} #f1f1f1`
            }}
          >
            {/* Desktop View */}
            <DesktopJobTable jobs={filteredJobs} onDelete={handleDelete} />

            {/* Mobile View */}
            <MobileJobList jobs={filteredJobs} onDelete={handleDelete} />
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