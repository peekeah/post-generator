import { ReturnError } from "@/lib/error";
import { prisma } from "@/lib/utils"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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

  const activeSubscription = await prisma.subscription.findFirstOrThrow({
    where: {
      userId,
      status: "ACTIVE"
    }
  })

  const currentPlan = await prisma.plan.findUniqueOrThrow({
    where: {
      id: activeSubscription.planId
    }
  });

  return {
    totalUsage: montlyPostCount,
    postLimit: currentPlan.postLimit,
  }
}

export async function GET(request: NextRequest) {
  try {

    const token = await getToken({ req: request });

    if (!token?.sub) {
      throw new Error()
    }

    const subscription = await prisma.subscription.findFirstOrThrow({
      where: {
        userId: token?.sub,
        status: "ACTIVE"
      }
    })

    const usage = calculateUsage(token?.sub)

    return NextResponse.json({
      status: true,
      data: { subscription, usage }
    })
  } catch (err: unknown) {
    console.log("error:", err)
    return ReturnError(err instanceof Error ? err?.message : undefined)
  }
}


export async function POST(request: NextRequest) {
  try {
    const {
      planId,
    }: {
      id: string, planId: string
    } = await request.json();

    if (!planId) return ReturnError("PlanId is required", 403)

    const token = await getToken({ req: request });
    if (!token?.sub) return ReturnError("Unauthorized", 401)

    // Purchase logic here
    const purchase = await prisma.subscription.findFirstOrThrow({
      where: {
        userId: token?.sub,
        status: "ACTIVE"
      }
    })

    if (!purchase) {
      await prisma.subscription.create({
        data: {
          userId: token?.sub,
          planId,
          status: "ACTIVE"
        }
      })
    } else {
      await prisma.$transaction([
        prisma.subscription.update({
          where: {
            id: purchase.id,
          },
          data: {
            status: "EXPIRED"
          }
        }),
        prisma.subscription.create({
          data: {
            userId: token.sub,
            planId,
            status: "ACTIVE"
          }
        })
      ])

      return Response.json({
        status: true,
        data: "Successfully subscribed to the plan"
      })
    }

  } catch (err) {
    console.log("ee:", err)
    return ReturnError(err instanceof Error ? err?.message : undefined)
  }
}

