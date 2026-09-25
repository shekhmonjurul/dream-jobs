"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Calendar,
  Link as LinkIcon,
  GraduationCap,
  DollarSign,
  PlusCircle,
  CheckCircle2,
  Users,
  FileText,
  Trash2,
  Plus,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import FormField from "../../_ui/components/FormField";
import FormSection from "../../_ui/components/FormSection";
import { createJobAction } from "@/actions/jobs";

const NewJobPage = () => {
  const primaryColor = "#07906a";
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    jobType: "Government",
    scaleName: "Grade 9",
    minSalary: "",
    maxSalary: "",
    designation: "",
    vacancies: "",
    minAge: "18",
    maxAge: "30",
    nationality: "Bangladeshi",
    applicationStart: "",
    applicationEnd: "",
    detailsLink: "",
    applyLink: "",
  });

  const [educations, setEducations] = useState<Array<{ educationTitle: string; requirements: string }>>([
    { educationTitle: "", requirements: "" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index: number, field: "educationTitle" | "requirements", value: string) => {
    setEducations((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addEducation = () => {
    setEducations((prev) => [...prev, { educationTitle: "", requirements: "" }]);
  };

  const removeEducation = (index: number) => {
    if (educations.length === 1) return;
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const payload = {
      jobType: formData.jobType,
      scaleName: formData.scaleName,
      minSalary: formData.minSalary ? parseInt(formData.minSalary, 10) : null,
      maxSalary: formData.maxSalary ? parseInt(formData.maxSalary, 10) : null,
      designation: formData.designation,
      vacancies: formData.vacancies ? parseInt(formData.vacancies, 10) : null,
      minAge: formData.minAge ? parseInt(formData.minAge, 10) : 18,
      maxAge: formData.maxAge ? parseInt(formData.maxAge, 10) : 30,
      nationality: formData.nationality || "Bangladeshi",
      applicationStart: formData.applicationStart || null,
      applicationEnd: formData.applicationEnd || null,
      detailsLink: formData.detailsLink || null,
      applyLink: formData.applyLink || null,
      educations: educations.filter((e) => e.educationTitle.trim() !== ""),
    };

    if (payload.educations.length === 0) {
      setStatus("error");
      setErrorMessage("Please enter at least one educational qualification.");
      return;
    }

    const res = await createJobAction(payload);

    if (res.success) {
      setStatus("success");
      setTimeout(() => {
        router.push("/dashboard/jobs");
      }, 1500);
    } else {
      setStatus("error");
      setErrorMessage(res.error || "Failed to create job.");
    }
  };

  const inputStyles =
    "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#07906a]/10 focus:border-[#07906a] focus:bg-white outline-none transition-all duration-200 placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-[#f8fafc] p-2 sm:py-8 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#07906a] font-semibold mb-4 transition-colors text-sm"
        >
          <ArrowLeft size={18} /> Back to Jobs List
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          {/* Header Section */}
          <div
            style={{ backgroundColor: primaryColor }}
            className="px-5 py-6 md:px-8 md:py-10 text-white relative overflow-hidden rounded-t-2xl md:rounded-t-3xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <PlusCircle size={120} />
            </div>
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 md:gap-3">
                <PlusCircle className="w-8 h-8 md:w-9 md:h-9" />
                Job Post Creator
              </h1>
              <p className="mt-2 text-green-50 font-medium text-sm md:text-lg">
                Post new job vacancies to the portal
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-5 md:p-12 space-y-8 md:space-y-12">
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium text-sm">
                ❌ {errorMessage}
              </div>
            )}

            {/* Basic Info */}
            <FormSection title="Basic Information" icon={Briefcase}>
              <FormField label="Job Type">
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className={inputStyles}
                >
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="NGO">NGO</option>
                  <option value="Autonomous">Autonomous</option>
                </select>
              </FormField>
              <FormField label="Scale / Grade">
                <input
                  type="text"
                  name="scaleName"
                  value={formData.scaleName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Grade 9, Grade 10"
                  className={inputStyles}
                />
              </FormField>
              <FormField label="Designation">
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Assistant Programmer"
                  className={inputStyles}
                />
              </FormField>
              <FormField label="Total Vacancies" icon={Users}>
                <input
                  type="number"
                  name="vacancies"
                  value={formData.vacancies}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 45"
                  className={inputStyles}
                />
              </FormField>
            </FormSection>

            {/* Salary & Eligibility */}
            <FormSection title="Salary & Eligibility" icon={DollarSign}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Min Salary (BDT)">
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="e.g. 22000"
                    className={inputStyles}
                  />
                </FormField>
                <FormField label="Max Salary (BDT)">
                  <input
                    type="number"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="e.g. 53060"
                    className={inputStyles}
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Min Age">
                  <input
                    type="number"
                    name="minAge"
                    value={formData.minAge}
                    onChange={handleChange}
                    placeholder="18"
                    className={inputStyles}
                  />
                </FormField>
                <FormField label="Max Age">
                  <input
                    type="number"
                    name="maxAge"
                    value={formData.maxAge}
                    onChange={handleChange}
                    placeholder="30"
                    className={inputStyles}
                  />
                </FormField>
              </div>
            </FormSection>

            {/* Timeline & Links */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <Calendar size={20} className="text-[#07906a]" />
                  <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Timeline</h2>
                </div>
                <FormField label="Application Start Date">
                  <input
                    type="date"
                    name="applicationStart"
                    value={formData.applicationStart}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </FormField>
                <FormField label="Application End Date">
                  <input
                    type="date"
                    name="applicationEnd"
                    value={formData.applicationEnd}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </FormField>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <LinkIcon size={20} className="text-[#07906a]" />
                  <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">External Links</h2>
                </div>
                <FormField label="Circular Details URL">
                  <input
                    type="url"
                    name="detailsLink"
                    value={formData.detailsLink}
                    onChange={handleChange}
                    placeholder="https://..."
                    className={inputStyles}
                  />
                </FormField>
                <FormField label="Direct Apply URL">
                  <input
                    type="url"
                    name="applyLink"
                    value={formData.applyLink}
                    onChange={handleChange}
                    placeholder="https://..."
                    className={inputStyles}
                  />
                </FormField>
              </div>
            </section>

            {/* Dynamic Educational Qualifications */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} className="text-[#07906a]" />
                  <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Qualifications</h2>
                </div>
                <button
                  type="button"
                  onClick={addEducation}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#07906a] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200"
                >
                  <Plus size={14} /> Add Education Requirement
                </button>
              </div>

              {educations.map((edu, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Requirement #{index + 1}
                    </span>
                    {educations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md"
                        title="Remove requirement"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <FormField label="Education Degree / Title">
                    <input
                      type="text"
                      value={edu.educationTitle}
                      onChange={(e) => handleEducationChange(index, "educationTitle", e.target.value)}
                      required
                      placeholder="e.g. B.Sc in CSE, Masters, HSC Pass"
                      className={inputStyles}
                    />
                  </FormField>
                  <FormField label="Specific Requirements / Conditions" icon={FileText}>
                    <textarea
                      value={edu.requirements}
                      onChange={(e) => handleEducationChange(index, "requirements", e.target.value)}
                      rows={2}
                      placeholder="e.g. Minimum CGPA 3.00, 2 years experience"
                      className={`${inputStyles} resize-none`}
                    ></textarea>
                  </FormField>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              {status === "success" ? (
                <div className="bg-green-50 border-2 border-green-200 p-6 rounded-2xl flex flex-col items-center gap-2 text-green-700 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={40} />
                  <span className="font-bold text-xl text-center">Job Post Published Successfully!</span>
                  <span className="text-sm">Redirecting to jobs list...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full text-white py-5 px-8 rounded-2xl font-black text-xl shadow-xl shadow-green-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                >
                  {status === "loading" ? (
                    <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <PlusCircle size={24} />
                      Publish Job Now
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

export default NewJobPage;