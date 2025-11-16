import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    useSecureCookies: process.env.NODE_ENV === "production",
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "이메일을 입력해주세요" },
                password: { label: "Password", type: "password", placeholder: "비밀번호를 입력해주세요" },
            },
            async authorize(credentials) {
                const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                });
                if (!user.ok) {
                    throw new Error("Failed to login");
                }
                return user.json();
            },
        }),
    ],
});