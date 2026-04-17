"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Calendar, 
  Link as LinkIcon, 
  GraduationCap, 
  DollarSign, 
  CheckCircle2,
  Users,
  FileText,
  Save,
  Pencil,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

import FormField from '../../../_ui/components/FormField';
import FormSection from '../../../_ui/components/FormSection';

const EditJobPage = () => {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const primaryColor = '#07906a';
  const [status, setStatus] = useState('fetching'); // 'fetching', 'idle', 'loading', 'success'
  const [formData, setFormData] = useState({
    jobType: '', scaleName: '', minSalary: '', maxSalary: '',
    designation: '', vacancies: '', minAge: '', maxAge: '',
    applicationStart: '', applicationEnd: '', detailsLink: '',
    applyLink: '', educationTitle: '', requirements: ''
  });

  useEffect(() => {
    // Simulate fetching the job details from an API
    const fetchJob = async () => {
      setStatus('fetching');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data populated based on ID
      setFormData({
        jobType: 'govt', 
        scaleName: '9th Grade', 
        minSalary: '22000', 
        maxSalary: '53060',
        designation: 'Assistant Programmer', 
        vacancies: '45', 
        minAge: '21', 
        maxAge: '30',
        applicationStart: '2024-03-01', 
        applicationEnd: '2024-03-30', 
        detailsLink: 'https://mopa.teletalk.com.bd',
        applyLink: 'https://alljobs.teletalk.com.bd', 
        educationTitle: 'B.Sc in CSE/ICT', 
        requirements: 'Experience in Next.js preferred.'
      });
      setStatus('idle');
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API Delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    console.log('Updated Form Data:', formData);
    setStatus('success');
    
    setTimeout(() => {
      router.push('/dashboard/jobs');
    }, 2000);
  };

  const inputStyles = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#07906a]/10 focus:border-[#07906a] focus:bg-white outline-none transition-all duration-200 placeholder:text-gray-400";

  if (status === 'fetching') {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#07906a]/30 border-t-[#07906a] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-2 sm:py-12 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link href="/dashboard/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#07906a] font-medium mb-4 transition-colors">
          <ArrowLeft size={18} /> Back to Jobs
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          
          {/* Header Section */}
          <div style={{ backgroundColor: primaryColor }} className="px-5 py-6 md:px-8 md:py-10 text-white relative overflow-hidden rounded-t-2xl md:rounded-t-3xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Pencil size={120} />
            </div>
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 md:gap-3">
                <Pencil className="w-8 h-8 md:w-9 md:h-9" />
                Job Post Editor
              </h1>
              <p className="mt-2 text-green-50 font-medium text-sm md:text-lg">Update job vacancies details</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-5 md:p-12 space-y-8 md:space-y-12">
            
            {/* Basic Info */}
            <FormSection title="Basic Information" icon={Briefcase}>
              <FormField label="Job Type">
                <select name="jobType" value={formData.jobType} onChange={handleChange} required className={inputStyles}>
                  <option value="">Choose Type</option>
                  <option value="govt">Government</option>
                  <option value="private">Private</option>
                </select>
              </FormField>
              <FormField label="Scale / Grade">
                <input type="text" name="scaleName" value={formData.scaleName} onChange={handleChange} required placeholder="e.g. 9th Grade" className={inputStyles} />
              </FormField>
              <FormField label="Designation">
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} required placeholder="e.g. Senior Officer" className={inputStyles} />
              </FormField>
              <FormField label="Total Vacancies" icon={Users}>
                <input type="number" name="vacancies" value={formData.vacancies} onChange={handleChange} required placeholder="00" className={inputStyles} />
              </FormField>
            </FormSection>

            {/* Salary & Eligibility */}
            <FormSection title="Salary & Eligibility" icon={DollarSign}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Min Salary"><input type="number" name="minSalary" value={formData.minSalary} onChange={handleChange} placeholder="Min" className={inputStyles} /></FormField>
                <FormField label="Max Salary"><input type="number" name="maxSalary" value={formData.maxSalary} onChange={handleChange} placeholder="Max" className={inputStyles} /></FormField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Min Age"><input type="number" name="minAge" value={formData.minAge} onChange={handleChange} placeholder="18" className={inputStyles} /></FormField>
                <FormField label="Max Age"><input type="number" name="maxAge" value={formData.maxAge} onChange={handleChange} placeholder="30" className={inputStyles} /></FormField>
              </div>
            </FormSection>

            {/* Timeline & Links */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <Calendar size={20} className="text-[#07906a]" />
                  <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Timeline</h2>
                </div>
                <FormField label="Start Date"><input type="date" name="applicationStart" value={formData.applicationStart} onChange={handleChange} required className={inputStyles} /></FormField>
                <FormField label="End Date"><input type="date" name="applicationEnd" value={formData.applicationEnd} onChange={handleChange} required className={inputStyles} /></FormField>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <LinkIcon size={20} className="text-[#07906a]" />
                  <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">External Links</h2>
                </div>
                <FormField label="Circular Details URL"><input type="url" name="detailsLink" value={formData.detailsLink} onChange={handleChange} placeholder="https://..." className={inputStyles} /></FormField>
                <FormField label="Direct Apply URL"><input type="url" name="applyLink" value={formData.applyLink} onChange={handleChange} placeholder="https://..." className={inputStyles} /></FormField>
              </div>
            </section>

            {/* Education & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <GraduationCap size={20} className="text-[#07906a]" />
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Qualifications</h2>
              </div>
              <FormField label="Minimum Educational Qualification">
                <input type="text" name="educationTitle" value={formData.educationTitle} onChange={handleChange} required placeholder="e.g. Honours in any discipline" className={inputStyles} />
              </FormField>
              <FormField label="Detailed Requirements" icon={FileText}>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Skills, Experience, or other conditions..." className={`${inputStyles} resize-none`}></textarea>
              </FormField>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              {status === 'success' ? (
                <div className="bg-green-50 border-2 border-green-200 p-6 rounded-2xl flex flex-col items-center gap-2 text-green-700 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={40} />
                  <span className="font-bold text-xl text-center">Job Post Updated Successfully!</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full text-white py-5 px-8 rounded-2xl font-black text-xl shadow-xl shadow-green-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={24} />
                      Update Now
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;
