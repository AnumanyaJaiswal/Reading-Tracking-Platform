/*
  Warnings:

  - Added the required column `updatedAt` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_ownerId_fkey";

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "bookAuthors" TEXT[],
ADD COLUMN     "bookThumbnail" TEXT,
ADD COLUMN     "bookTitle" TEXT,
ADD COLUMN     "clubMessage" TEXT,
ADD COLUMN     "googleBookId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
