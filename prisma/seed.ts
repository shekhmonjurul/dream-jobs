import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});


async function main() {
    console.log('Seeding database...');

    // 1. Create Job Types
    const govtJobType = await prisma.jobType.upsert({
        where: { name: 'Government' },
        update: {},
        create: { name: 'Government' },
    });

    const privateJobType = await prisma.jobType.upsert({
        where: { name: 'Private' },
        update: {},
        create: { name: 'Private' },
    });

    const ngoJobType = await prisma.jobType.upsert({
        where: { name: 'NGO' },
        update: {},
        create: { name: 'NGO' },
    });

    console.log('✅ Job Types seeded.');

    // 2. Create Salary Scales
    const scales = [
        { name: 'Grade 9', min: 22000, max: 53060 },
        { name: 'Grade 10', min: 16000, max: 38640 },
        { name: 'Grade 11', min: 12500, max: 30230 },
        { name: 'Grade 13', min: 11000, max: 26590 },
        { name: 'Negotiable', min: null, max: null },
    ];

    const scaleRecords: Record<string, any> = {};
    for (const s of scales) {
        scaleRecords[s.name] = await prisma.salaryScale.upsert({
            where: { scaleName: s.name },
            update: {},
            create: { scaleName: s.name, minSalary: s.min, maxSalary: s.max },
        });
    }

    console.log('✅ Salary Scales seeded.');

    // 3. Create 10 Jobs
    const jobsData = [
        {
            designation: 'Assistant Programmer',
            vacancies: 5,
            minAge: 18,
            maxAge: 30,
            jobTypeId: govtJobType.id,
            salaryScaleId: scaleRecords['Grade 9'].id,
            educations: [
                { title: 'BSc in CSE', req: 'Minimum CGPA 3.00' },
                { title: 'BSc in IT', req: 'Equivalent degree' }
            ]
        },
        {
            designation: 'Senior Software Engineer',
            vacancies: 2,
            minAge: 25,
            maxAge: 40,
            jobTypeId: privateJobType.id,
            salaryScaleId: scaleRecords['Negotiable'].id,
            educations: [
                { title: 'BSc in CSE', req: '5+ years of experience in Node.js' }
            ]
        },
        {
            designation: 'Project Coordinator',
            vacancies: 1,
            minAge: 24,
            maxAge: 35,
            jobTypeId: ngoJobType.id,
            salaryScaleId: scaleRecords['Negotiable'].id,
            educations: [
                { title: 'Masters in Social Science', req: 'Experience in field work preferred' }
            ]
        },
        {
            designation: 'Sub-Assistant Engineer',
            vacancies: 12,
            minAge: 18,
            maxAge: 30,
            jobTypeId: govtJobType.id,
            salaryScaleId: scaleRecords['Grade 10'].id,
            educations: [
                { title: 'Diploma in Engineering', req: 'Diploma in Civil or Electrical' }
            ]
        },
        {
            designation: 'Data Analyst',
            vacancies: 3,
            minAge: 22,
            maxAge: 32,
            jobTypeId: privateJobType.id,
            salaryScaleId: scaleRecords['Negotiable'].id,
            educations: [
                { title: 'BSc in Statistics/Math', req: 'Proficiency in Python and SQL' }
            ]
        },
        {
            designation: 'Office Assistant',
            vacancies: 20,
            minAge: 18,
            maxAge: 30,
            jobTypeId: govtJobType.id,
            salaryScaleId: scaleRecords['Grade 13'].id,
            educations: [
                { title: 'HSC', req: 'Must have computer typing skills' }
            ]
        },
        {
            designation: 'HR Executive',
            vacancies: 2,
            minAge: 23,
            maxAge: 30,
            jobTypeId: privateJobType.id,
            salaryScaleId: scaleRecords['Negotiable'].id,
            educations: [
                { title: 'BBA in HRM', req: 'Excellent communication skills' }
            ]
        },
        {
            designation: 'Monitoring Officer',
            vacancies: 4,
            minAge: 25,
            maxAge: 38,
            jobTypeId: ngoJobType.id,
            salaryScaleId: scaleRecords['Negotiable'].id,
            educations: [
                { title: 'Bachelors in any discipline', req: 'Willingness to travel to rural areas' }
            ]
        },
        {
            designation: 'Accountant',
            vacancies: 1,
            minAge: 22,
            maxAge: 30,
            jobTypeId: privateJobType.id,
            salaryScaleId: scaleRecords['Negotiable'].id,
            educations: [
                { title: 'B.Com / BBA in Accounting', req: 'Knowledge of Tally/ERP software' }
            ]
        },
        {
            designation: 'Medical Officer',
            vacancies: 15,
            minAge: 23,
            maxAge: 32,
            jobTypeId: govtJobType.id,
            salaryScaleId: scaleRecords['Grade 9'].id,
            educations: [
                { title: 'MBBS', req: 'Must be registered with BMDC' }
            ]
        }
    ];

    for (const job of jobsData) {
        const existing = await prisma.job.findFirst({
            where: { designation: job.designation }
        });

        if (!existing) {
            await prisma.job.create({
                data: {
                    designation: job.designation,
                    vacancies: job.vacancies,
                    minAge: job.minAge,
                    maxAge: job.maxAge,
                    nationality: 'Bangladeshi',
                    applicationStart: new Date(),
                    applicationEnd: new Date(new Date().setDate(new Date().getDate() + 30)),
                    detailsLink: `https://example.com/circular/${job.designation.toLowerCase().replace(/ /g, '_')}`,
                    applyLink: `https://example.com/apply/${job.designation.toLowerCase().replace(/ /g, '_')}`,
                    jobTypeId: job.jobTypeId,
                    salaryScaleId: job.salaryScaleId,
                    educations: {
                        create: job.educations.map(edu => ({
                            educationTitle: edu.title,
                            requirements: edu.req
                        }))
                    }
                }
            });
        }
    }

    console.log('✅ 10 Jobs with Educations seeded.');
    console.log('🎉 Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });