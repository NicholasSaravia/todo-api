/*
  Warnings:

  - Made the column `bgColor` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "bgColor" SET NOT NULL;
