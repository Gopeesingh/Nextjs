import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github"
import { prisma} from "@/lib"

if(!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET){
    throw new Error('Missing github client id or client secret');
}

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({user,session}){
            if(session && user){
                session.user.id = user.id
            }
            return session
        }
    }
})


// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import GitHubProvider from "next-auth/providers/github";
// import { prisma } from "@/lib";

// if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
//   throw new Error("Missing GitHub Client ID or Client Secret");
// }

// export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     // ✅ Add user ID to JWT token
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id;
//       }
//       return token;
//     },
//     // ✅ Correctly assign user ID to session
//     async session({ session, token }) {
//       if (session.user && token.sub) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
// });

