"use server";

import prisma from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { jobSchema, JobInput } from "@/lib/schemas/job";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Prisma } from "@/app/generated/prisma/client";

async function verifyAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized. Please log in to perform this action.");
  }
  return session;
}

export async function createJobAction(input: JobInput) {
  try {
    await verifyAuth();
    const validated = jobSchema.parse(input);

    // 1. Find or create JobType
    let jobTypeRecord = await prisma.jobType.findFirst({
      where: { name: { equals: validated.jobType, mode: "insensitive" } },
    });

    if (!jobTypeRecord) {
      jobTypeRecord = await prisma.jobType.create({
        data: { name: validated.jobType },
      });
    }

    // 2. Find or create SalaryScale
    let salaryScaleRecord = await prisma.salaryScale.findFirst({
      where: { scaleName: { equals: validated.scaleName, mode: "insensitive" } },
    });

    if (!salaryScaleRecord) {
      salaryScaleRecord = await prisma.salaryScale.create({
        data: {
          scaleName: validated.scaleName,
          minSalary: validated.minSalary ?? null,
          maxSalary: validated.maxSalary ?? null,
        },
      });
    } else if (validated.minSalary !== undefined || validated.maxSalary !== undefined) {
      salaryScaleRecord = await prisma.salaryScale.update({
        where: { id: salaryScaleRecord.id },
        data: {
          minSalary: validated.minSalary ?? salaryScaleRecord.minSalary,
          maxSalary: validated.maxSalary ?? salaryScaleRecord.maxSalary,
        },
      });
    }

    // 3. Create Job with Educations
    const newJob = await prisma.job.create({
      data: {
        designation: validated.designation,
        vacancies: validated.vacancies ?? null,
        minAge: validated.minAge ?? 18,
        maxAge: validated.maxAge ?? 30,
        nationality: validated.nationality || "Bangladeshi",
        applicationStart: validated.applicationStart ? new Date(validated.applicationStart) : null,
        applicationEnd: validated.applicationEnd ? new Date(validated.applicationEnd) : null,
        detailsLink: validated.detailsLink || null,
        applyLink: validated.applyLink || null,
        jobTypeId: jobTypeRecord.id,
        salaryScaleId: salaryScaleRecord.id,
        educations: {
          create: validated.educations.map((edu) => ({
            educationTitle: edu.educationTitle,
            requirements: edu.requirements || null,
          })),
        },
      },
    });

    revalidatePath("/dashboard/jobs");
    revalidatePath("/");
    return { success: true, data: newJob };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create job";
    console.error("Error creating job:", error);
    return { success: false, error: message };
  }
}

export async function updateJobAction(jobId: string, input: JobInput) {
  try {
    await verifyAuth();
    const validated = jobSchema.parse(input);

    // 1. Find or create JobType
    let jobTypeRecord = await prisma.jobType.findFirst({
      where: { name: { equals: validated.jobType, mode: "insensitive" } },
    });

    if (!jobTypeRecord) {
      jobTypeRecord = await prisma.jobType.create({
        data: { name: validated.jobType },
      });
    }

    // 2. Find or create SalaryScale
    let salaryScaleRecord = await prisma.salaryScale.findFirst({
      where: { scaleName: { equals: validated.scaleName, mode: "insensitive" } },
    });

    if (!salaryScaleRecord) {
      salaryScaleRecord = await prisma.salaryScale.create({
        data: {
          scaleName: validated.scaleName,
          minSalary: validated.minSalary ?? null,
          maxSalary: validated.maxSalary ?? null,
        },
      });
    }

    // 3. Delete existing educations and update job with new educations
    await prisma.jobEducation.deleteMany({
      where: { jobId },
    });

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        designation: validated.designation,
        vacancies: validated.vacancies ?? null,
        minAge: validated.minAge ?? 18,
        maxAge: validated.maxAge ?? 30,
        nationality: validated.nationality || "Bangladeshi",
        applicationStart: validated.applicationStart ? new Date(validated.applicationStart) : null,
        applicationEnd: validated.applicationEnd ? new Date(validated.applicationEnd) : null,
        detailsLink: validated.detailsLink || null,
        applyLink: validated.applyLink || null,
        jobTypeId: jobTypeRecord.id,
        salaryScaleId: salaryScaleRecord.id,
        educations: {
          create: validated.educations.map((edu) => ({
            educationTitle: edu.educationTitle,
            requirements: edu.requirements || null,
          })),
        },
      },
    });

    revalidatePath("/dashboard/jobs");
    revalidatePath("/");
    return { success: true, data: updatedJob };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update job";
    console.error("Error updating job:", error);
    return { success: false, error: message };
  }
}

export async function deleteJobAction(jobId: string) {
  try {
    await verifyAuth();
    await prisma.job.delete({
      where: { id: jobId },
    });

    revalidatePath("/dashboard/jobs");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete job";
    console.error("Error deleting job:", error);
    return { success: false, error: message };
  }
}

export async function getJobByIdAction(jobId: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        jobType: true,
        salaryScale: true,
        educations: true,
      },
    });

    if (!job) return { success: false, error: "Job not found" };
    return { success: true, data: job };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch job";
    return { success: false, error: message };
  }
}

export async function getPublicJobsAction(searchParams?: {
  maxEducation?: string;
  age?: string;
  nationality?: string;
  others?: string;
}) {
  try {
    const whereClause: Prisma.JobWhereInput = {};

    if (searchParams?.nationality) {
      whereClause.nationality = {
        contains: searchParams.nationality,
        mode: "insensitive",
      };
    }

    if (searchParams?.age) {
      const ageNum = parseInt(searchParams.age, 10);
      if (!isNaN(ageNum)) {
        whereClause.AND = [
          { OR: [{ minAge: null }, { minAge: { lte: ageNum } }] },
          { OR: [{ maxAge: null }, { maxAge: { gte: ageNum } }] },
        ];
      }
    }

    if (searchParams?.maxEducation) {
      whereClause.educations = {
        some: {
          educationTitle: {
            contains: searchParams.maxEducation,
            mode: "insensitive",
          },
        },
      };
    }

    if (searchParams?.others) {
      whereClause.OR = [
        { designation: { contains: searchParams.others, mode: "insensitive" } },
        {
          educations: {
            some: {
              requirements: { contains: searchParams.others, mode: "insensitive" },
            },
          },
        },
      ];
    }

    const jobs = await prisma.job.findMany({
      where: whereClause,
      include: {
        jobType: true,
        salaryScale: true,
        educations: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: jobs };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch jobs";
    console.error("Error fetching public jobs:", error);
    return { success: false, error: message };
  }
}
