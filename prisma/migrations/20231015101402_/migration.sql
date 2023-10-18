/*
  Warnings:

  - Added the required column `authorId` to the `Responds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Responds" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Responds" ADD CONSTRAINT "Responds_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
