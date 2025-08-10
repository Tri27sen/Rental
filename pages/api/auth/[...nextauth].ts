import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import prisma from "@/app/libs/prismadb"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
console.log("wroking for authentication and authorization")
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        console.log("inside the next-auth-----------",credentials)

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        console.log("the user is ....",user)
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials")
        }
        if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
          throw new Error("Missing GitHub OAuth credentials in .env file");
        }
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
          throw new Error("Missing Google OAuth credentials in .env file");
        }
        if (!process.env.NEXTAUTH_SECRET) {
          throw new Error("Missing NEXTAUTH_SECRET in .env file");
        }
        
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }
        return user
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Fix for the redirect URL - safer implementation
      if (url.startsWith("/") || url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    // Allow account linking for users with the same email
    async signIn({ user, account, profile, email, credentials }) {
      // For credential sign in, always allow
     
      
      // For OAuth sign in (Google, GitHub), check if user exists with same email
      if (account && profile && profile.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email as string },
          include: { accounts: true }
        });

        // If user exists but has no account for this provider, link the accounts
        if (existingUser) {
          // Check if they already have an account with this provider
          const existingAccount = existingUser.accounts.find(
            (acc) => acc.provider === account.provider
          );
          
          // If they don't have an account with this provider yet, create one
          if (!existingAccount) {
            try {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token || "",
                  refresh_token: account.refresh_token || "",
                  expires_at: account.expires_at || null,
                  token_type: account.token_type || "",
                  scope: account.scope || "",
                  id_token: account.id_token || "",
                  session_state: account.session_state || ""
                }
              });
            } catch (error) {
              console.error("Error linking account:", error);
              return false;
            }
          }
          
          // Return the existing user instead of creating a new one
          user.id = existingUser.id;
          return true;
        }
      }
      
      return true;
    },
    
    // Add the session callback to include user information
    /*
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },*/
    
    // Add JWT callback to include user ID in token
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  
  pages: {
    signIn: "/",
    error: "/error",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
