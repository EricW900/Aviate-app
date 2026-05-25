/*
  Warnings:

  - Added the required column `employee_code` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role_type" AS ENUM ('ADMIN', 'PILOT', 'FIRST_OFFICER', 'FLIGHT_ENGINEER', 'CABIN_CREW', 'SYSTEM_USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "employee_code" TEXT NOT NULL,
ADD COLUMN     "role" "role_type" NOT NULL DEFAULT 'SYSTEM_USER';
