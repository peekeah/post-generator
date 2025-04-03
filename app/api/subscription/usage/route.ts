import { ReturnError } from "@/lib/error"
import { prisma } from "@/lib/utils"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

const calculateUsage = async (userId: string) => {
  const userPosts = await prisma.socialMediaPost.findMany({
    where: {
      userId,
      createdAt: {
        gte: new Date(new Date().setDate(1)), // First day of current month
        lt: new Date(new Date().setMonth(new Date().getMonth() + 1, 1))
      }
    }
  })

  const montlyPostCount = userPosts.length;

  const subscription = await prisma.subscription.findUniqueOrThrow({
    where: {
      userId,
      status: "ACTIVE"
    }
  })

  const currentPlan = await prisma.plan.findFirstOrThrow({
    where: {
      id: subscription.planId
    }
  })


}
export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req })

  } catch (err) {
    console.log("error:", err)
    return ReturnError(err instanceof Error ? err?.message : undefined)
  }
}
