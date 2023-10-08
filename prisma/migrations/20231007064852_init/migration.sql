/*
  Warnings:

  - Added the required column `q_title` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "q_title" TEXT NOT NULL;
