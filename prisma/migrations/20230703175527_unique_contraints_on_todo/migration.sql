/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Todo_id_projectId_key";

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_id_userId_key" ON "Todo"("id", "userId");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
