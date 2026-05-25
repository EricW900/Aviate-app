/*
  Warnings:

  - Added the required column `updatedAt` to the `Aircraft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AircraftStatus" ADD VALUE 'DEACTIVATED';

-- AlterTable
ALTER TABLE "Aircraft" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
