/*
  Warnings:

  - You are about to drop the column `origindId` on the `Route` table. All the data in the column will be lost.
  - Added the required column `originId` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_origindId_fkey";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "origindId",
ADD COLUMN     "originId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Airport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
