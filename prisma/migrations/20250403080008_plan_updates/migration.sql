/*
  Warnings:

  - You are about to drop the column `features` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "features",
ADD COLUMN     "postLimit" INTEGER NOT NULL DEFAULT 5;
