import prisma from "@/lib/prisma/prisma";


export default async function getAllJobs() {
    const jobs = await prisma.job.findMany({
        include: {
            jobType: true,
            salaryScale: true,
        }
    });
    return (jobs || []).map((job: any) => ({

        id: job.id,
        name: job.designation,
        jobType: job.jobType?.name,
        designation: job.designation,
        vacancies: job.vacancies || 0,
        salary: job.salaryScale?.minSalary + "-" + job.salaryScale?.maxSalary,
        status: job.applicationStart < new Date() && job.applicationEnd > new Date() ? "Active" : "Deactive",

    }));
}