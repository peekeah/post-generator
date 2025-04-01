import { ReturnError } from "@/lib/error";
import { prisma } from "@/lib/utils"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {

    const token = await getToken({ req: request });

    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: token?.sub,
        status: "ACTIVE"
      }
    })

    return NextResponse.json({
      status: true,
      data: subscription
    })
  } catch (err: unknown) {
    console.log("error:", err)
    return ReturnError(err instanceof Error ? err?.message : undefined)
  }
}


export async function POST(request: Request) {
  try {
    const {
      id,
      planId,
      // other vars
    }: {
      id: string, planId: string
    } = await request.json();

    if (!id) throw new Error("validation error")

    // Purchase logic here
    const purchase = await prisma.subscription.findUnique({
      where: {
        id, status: "ACTIVE"
      }
    })

    if (!purchase) {
      prisma.subscription.create({
        data: {
          userId: id,
          planId,
          status: "ACTIVE"
        }
      })
    } else {
      prisma.$transaction([
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
            userId: id,
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

