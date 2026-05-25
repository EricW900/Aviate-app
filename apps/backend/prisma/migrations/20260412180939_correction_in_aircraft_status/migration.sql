/*
  Warnings:

  - The values [MAINTANCE] on the enum `AircraftStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AircraftStatus_new" AS ENUM ('ACTIVE', 'MAINTENANCE', 'INACTIVE', 'GROUNDED', 'ORDERED');
ALTER TABLE "Aircraft" ALTER COLUMN "status" TYPE "AircraftStatus_new" USING ("status"::text::"AircraftStatus_new");
ALTER TYPE "AircraftStatus" RENAME TO "AircraftStatus_old";
ALTER TYPE "AircraftStatus_new" RENAME TO "AircraftStatus";
DROP TYPE "AircraftStatus_old";
COMMIT;
