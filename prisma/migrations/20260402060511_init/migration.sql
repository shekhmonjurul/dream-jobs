-- CreateTable
CREATE TABLE "JobType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalaryScale" (
    "id" SERIAL NOT NULL,
    "scaleName" TEXT NOT NULL,
    "minSalary" INTEGER,
    "maxSalary" INTEGER,

    CONSTRAINT "SalaryScale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "vacancies" INTEGER,
    "minAge" INTEGER DEFAULT 18,
    "maxAge" INTEGER DEFAULT 30,
    "nationality" TEXT NOT NULL DEFAULT 'Bangladeshi',
    "applicationStart" TIMESTAMP(3),
    "applicationEnd" TIMESTAMP(3),
    "detailsLink" TEXT,
    "applyLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobTypeId" INTEGER NOT NULL,
    "salaryScaleId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobEducation" (
    "id" SERIAL NOT NULL,
    "educationTitle" TEXT NOT NULL,
    "requirements" TEXT,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "JobEducation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobType_name_key" ON "JobType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SalaryScale_scaleName_key" ON "SalaryScale"("scaleName");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_jobTypeId_fkey" FOREIGN KEY ("jobTypeId") REFERENCES "JobType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_salaryScaleId_fkey" FOREIGN KEY ("salaryScaleId") REFERENCES "SalaryScale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobEducation" ADD CONSTRAINT "JobEducation_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
