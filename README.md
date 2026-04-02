📑 Dream Jobs - Govt. Job Finder Portal

Dream Jobs হলো একটি আধুনিক এবং কিউরেটেড জব এগ্রিগেটর প্ল্যাটফর্ম। এর মূল লক্ষ্য হলো প্রথাগত জব পোর্টালগুলোর জটিলতা কমিয়ে একজন প্রার্থীকে তার Salary Grade, Education, এবং Age অনুযায়ী সরাসরি সার্কুলার খুঁজে পেতে সাহায্য করা।

🎯 প্রজেক্ট ভিশন (The Core Mission)

বাংলাদেশি চাকরিপ্রার্থীদের জন্য একটি সহজবোধ্য ইন্টারফেস তৈরি করা, যেখানে তারা কয়েক ক্লিকেই তাদের যোগ্যতার সাথে সামঞ্জস্যপূর্ণ সরকারি ও স্বায়ত্তশাসিত প্রতিষ্ঠানের চাকরির খবর পেতে পারে। এটি মূলত একটি Curated Job Aggregator হিসেবে কাজ করবে।

🛠 টেক স্ট্যাক (Tech Stack)

Frontend: Next.js 15 (App Router), Tailwind CSS, Lucide React (Icons).

Backend: Next.js Server Actions.

Database & ORM: PostgreSQL, Prisma ORM.

Authentication: Better Auth (with Email Whitelisting).

Form Handling: React Hook Form & Zod (Validation).

Deployment: Vercel.

🗄 ডাটাবেস আর্কিটেকচার (Database Schema)

আমরা রিলেশনাল ডাটাবেস হিসেবে PostgreSQL এবং Prisma ORM ব্যবহার করছি। আমাদের ডাটাবেস মডেলগুলো নিচে সংক্ষেপে বর্ণনা করা হলো:

JobType: জবের ক্যাটাগরি (যেমন: Government, Private)।

SalaryScale: সরকারি চাকরির গ্রেডসমূহ (যেমন: Grade 9, Grade 10)।

Job: এটি সেন্ট্রাল টেবিল যেখানে পদের নাম, শূন্যপদ, বয়সসীমা এবং ডেডলাইন থাকে।

JobEducation: একটি জবে একাধিক শিক্ষাগত যোগ্যতার প্রয়োজন হতে পারে (যেমন: BSc in CSE, HSC)।

Prisma Schema Snippet:

model Job {
  id               String         @id @default(uuid())
  designation      String         // পদের নাম
  vacancies        Int?
  minAge           Int?           @default(18)
  maxAge           Int?           @default(30)
  nationality      String         @default("Bangladeshi")
  applicationStart DateTime?
  applicationEnd   DateTime?
  detailsLink      String?        // সার্কুলার ইমেজ বা পিডিএফ লিংক
  applyLink        String?        // সরাসরি আবেদনের লিংক
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt

  // Foreign Keys
  jobTypeId        Int
  jobType          JobType        @relation(fields: [jobTypeId], references: [id])
  salaryScaleId    Int
  salaryScale      SalaryScale    @relation(fields: [salaryScaleId], references: [id])
  
  // Relation to Education
  educations       JobEducation[]
}


🚀 মূল ফিচারসমূহ (Core Features)

১. পাবলিক পেজ (Public Pages)

Home Page (/): ইউজারদের ইনপুট অনুযায়ী URL Search Params ব্যবহার করে স্মার্ট ফিল্টারিং। (e.g., /?grade=9&type=govt)

Job Details Page: জবের সব প্রয়োজনীয় তথ্য এবং সরাসরি আবেদন করার লিংক।

২. অ্যাডমিন ড্যাশবোর্ড (Admin Panel)

Manage Jobs: চাকরির তালিকা দেখা, এডিট করা এবং ডিলিট করার ব্যবস্থা।

Dynamic Job Creation Form: react-hook-form এবং zod ব্যবহার করে সিকিউর ফর্ম ভ্যালিডেশন।

Education Multi-input: একটি জবের জন্য 'Add More' বাটনের মাধ্যমে ডাইনামিকালি একাধিক শিক্ষাগত যোগ্যতা যোগ করার সুবিধা।

৩. সিকিউরিটি (Security & Auth)

Better Auth Implementation: আধুনিক অথেন্টিকেশন সিস্টেম।

Admin Whitelisting: শুধুমাত্র অনুমোদিত অ্যাডমিন ইমেইল দিয়ে লগইন করার সুবিধা।

Role-based Middleware: ড্যাশবোর্ড সুরক্ষিত রাখতে মিডলওয়্যার ব্যবহার করে ইউজার রোল ভেরিফিকেশন।

📂 প্রজেক্ট ফোল্ডার স্ট্রাকচার (Folder Structure)

├── app/                # UI & Routing (Next.js App Router)
│   ├── (root)/         # Public Pages (Home, Job Details)
│   ├── dashboard/      # Admin Dashboard Pages
│   └── api/            # API Routes
├── actions/            # Next.js Server Actions (CRUD logic)
├── components/         # Reusable UI Components (Button, Card, Form)
├── lib/                # Core Shared Logic (Prisma setup, Auth config)
├── prisma/             # Database Schema & Migrations
└── public/             # Static Assets (Images, Icons)


🛠 লোকাল সেটআপ গাইড (Setup Instruction)

১. রিপোজিটরি ক্লোন করুন:

git clone [https://github.com/your-username/dream-jobs.git](https://github.com/your-username/dream-jobs.git)
cd dream-jobs


২. ডিপেন্ডেন্সি ইনস্টল করুন:

npm install


৩. এনভায়রনমেন্ট ফাইল (.env) সেটআপ করুন:

DATABASE_URL="your-postgresql-url"
BETTER_AUTH_SECRET="your-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"


৪. ডাটাবেস মাইগ্রেশন এবং জেনারেট করুন:

npx prisma migrate dev --name init
npx prisma generate


৫. প্রজেক্ট রান করুন:

npm run dev


Created with ❤️ by Muslim Innovations

CEO & Co-founder: Munjurul Islam