import { getServerSession } from "next-auth/next"

import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { User } from "@prisma/client";
import prisma from "@/app/libs/prismadb"
export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser(): Promise<(Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}) | null> {
  try {
    const session = await getSession()
    
    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }
  } catch (error: any) {
    return null
  }
}