-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('LINKEDIN', 'FACEBOOK', 'TWITTER', 'INSTAGRAM');

-- CreateEnum
CREATE TYPE "Tone" AS ENUM ('PROFESSIONAL', 'CASUAL', 'HUMOROUS', 'INSPIRATIONAL', 'EDUCATIONAL');

-- CreateTable
CREATE TABLE "SocialMediaPost" (
    "id" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "message" TEXT NOT NULL,
    "wordLimit" INTEGER NOT NULL,
    "tone" "Tone" NOT NULL,
    "generatedContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialMediaPost_pkey" PRIMARY KEY ("id")
);
