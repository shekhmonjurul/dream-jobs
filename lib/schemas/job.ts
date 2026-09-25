import { z } from "zod";

export const educationSchema = z.object({
  educationTitle: z.string().min(1, "Education title is required"),
  requirements: z.string().optional(),
});

export const jobSchema = z.object({
  jobType: z.string().min(1, "Job type is required"),
  scaleName: z.string().min(1, "Scale / Grade is required"),
  minSalary: z.number().nullable().optional(),
  maxSalary: z.number().nullable().optional(),
  designation: z.string().min(1, "Designation is required"),
  vacancies: z.number().nullable().optional(),
  minAge: z.number().nullable().optional(),
  maxAge: z.number().nullable().optional(),
  nationality: z.string().default("Bangladeshi"),
  applicationStart: z.string().nullable().optional(),
  applicationEnd: z.string().nullable().optional(),
  detailsLink: z.string().nullable().optional(),
  applyLink: z.string().nullable().optional(),
  educations: z.array(educationSchema).min(1, "At least one education requirement is needed"),
});

export type JobInput = z.infer<typeof jobSchema>;
