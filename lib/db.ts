import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/utils";

// Extend the default session type to include user ID
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      try {
        // Check if the user already has a subscription
        const existingSubscription = await prisma.subscription.findFirst({
          where: { userId: user.id },
        });

        if (existingSubscription) {
          return;
        }

        // Get the free plan from the Plan table
        const freePlan = await prisma.plan.findFirst({
          where: { name: "Free" },
        });

        if (!freePlan) {
          console.error("No free plan found in the database.");
          return;
        }

        // Create a subscription for the new user
        await prisma.subscription.create({
          data: {
            userId: user.id,
            planId: freePlan.id,
            status: "ACTIVE",
            startDate: new Date(),
          },
        });

        console.log(`Subscription created for user ${user.id}`);
      } catch (err) {
        console.error("Error creating subscription:", err);
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
