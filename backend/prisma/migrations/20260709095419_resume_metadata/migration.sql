/*
  Warnings:

  - You are about to drop the column `rawText` on the `Resume` table. All the data in the column will be lost.
  - The `skills` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `fileName` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filePath` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Resume" DROP COLUMN "rawText",
ADD COLUMN     "aiConfidence" TEXT,
ADD COLUMN     "atsScore" INTEGER,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "pages" INTEGER,
ADD COLUMN     "resumeQuality" INTEGER,
ADD COLUMN     "skillsMatch" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'My Resume',
DROP COLUMN "skills",
ADD COLUMN     "skills" TEXT[];
