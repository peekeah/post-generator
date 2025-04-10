import { ReturnError } from "@/lib/error";
import { prisma } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const fileUpload = async (buffer: Buffer, options: Record<any, any>) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.write(buffer);
    uploadStream.end();
  });
};

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    const files = await request.formData();
    const file = files.get("avatar") as File;

    if (!file) {
      return ReturnError("File is required")
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, GIF, and WEBP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the 5MB limit.' },
        { status: 400 }
      );
    }

    const userId = token?.sub as string;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await fileUpload(buffer, {
      resource_type: 'image',
      folder: "post-generator-avatars",
      public_id: userId,
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ]
    }) as Record<string, string>;

    if (!result) {
      throw new Error();
    }

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        image: result?.secure_url
      }
    })

    return NextResponse.json({
      status: true,
      data: "Successfully updated profile picture"
    });
  } catch (err) {
    return ReturnError(err instanceof Error ? err?.message : undefined)
  }

}
