import prisma from "@/lib/prisma/prisma";
import type { Prisma } from "@/app/generated/prisma/client";

type JobWithRelations = Prisma.JobGetPayload<{
  include: {
    jobType: true;
    salaryScale: true;
    educations: true;
  };
}>;

export default async function getAllJobs(searchQuery?: string) {
  const whereClause: Prisma.JobWhereInput = searchQuery
    ? {
        OR: [
          { designation: { contains: searchQuery, mode: "insensitive" } },
          { jobType: { name: { contains: searchQuery, mode: "insensitive" } } },
          { salaryScale: { scaleName: { contains: searchQuery, mode: "insensitive" } } },
        ],
      }
    : {};

  const jobs = await prisma.job.findMany({
    where: whereClause,
    include: {
      jobType: true,
      salaryScale: true,
      educations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const now = new Date();

  return (jobs || []).map((job: JobWithRelations) => {
    let salaryText = job.salaryScale?.scaleName || "Negotiable";
    if (job.salaryScale?.minSalary && job.salaryScale?.maxSalary) {
      salaryText = `${job.salaryScale.minSalary.toLocaleString()} - ${job.salaryScale.maxSalary.toLocaleString()}/-`;
    } else if (job.salaryScale?.minSalary) {
      salaryText = `${job.salaryScale.minSalary.toLocaleString()}/-`;
    }

    const isActive =
      (!job.applicationEnd || new Date(job.applicationEnd) >= now) &&
      (!job.applicationStart || new Date(job.applicationStart) <= now);

    return {
      id: job.id,
      name: job.designation,
      jobType: job.jobType?.name || "General",
      designation: job.designation,
      vacancies: job.vacancies || 0,
      salary: salaryText,
      status: isActive ? "Active" : "Deactive",
      educations: job.educations || [],
      minAge: job.minAge,
      maxAge: job.maxAge,
      nationality: job.nationality,
      applicationStart: job.applicationStart ? new Date(job.applicationStart).toISOString().split("T")[0] : "",
      applicationEnd: job.applicationEnd ? new Date(job.applicationEnd).toISOString().split("T")[0] : "",
      detailsLink: job.detailsLink || "",
      applyLink: job.applyLink || "",
    };
  });
}