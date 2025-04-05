import { ReturnError } from "@/lib/error"
import { prisma } from "@/lib/utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";

const schema = z.object({
  name: z.string().nullable().optional(),
  email: z.string(),
  company: z.string().nullable().optional(),
  bio: z.string().nullable().optional()
});

const cleanString = (value?: string | null) => {
  return value === "" ? null : value;
}

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const token = await getToken({ req })
    const userData = await schema.parseAsync(reqBody)

    await prisma.user.update({
      where: {
        id: token?.sub
      },
      data: {
        name: cleanString(userData.name),
        email: userData.email,
        company: cleanString(userData.company),
        bio: cleanString(userData.bio)
      }
    })

    return NextResponse.json({
      status: true,
      message: "User updated successfully"
    })

  } catch (err) {
    console.log("err:", err)
    return ReturnError(err instanceof Error ? err?.message : undefined)
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });
    const user = await prisma.user.findUnique({
      where: { id: token?.sub }
    })

    return NextResponse.json({
      status: true,
      data: user
    })

  } catch (err) {
    console.log("err:", err)
    return ReturnError(err instanceof Error ? err?.message : undefined)
  }
}
