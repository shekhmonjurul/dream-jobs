import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma/prisma";
import { username } from "better-auth/plugins"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    signUP:{enabled:true},
    signIn:{enabled:true},
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false
    },
    plugins: [
        username()
    ],
    baseURL: process.env.BETTER_AUTH_URL,
});