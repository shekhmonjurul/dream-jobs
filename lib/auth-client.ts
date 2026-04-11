import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins"
export const { signIn, signUp, signOut, useSession } = createAuthClient({
    plugins: [
        usernameClient()
    ],
    baseURL: "http://localhost:3000",
});