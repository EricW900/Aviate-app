-- CreateEnum
CREATE TYPE "AircraftStatus" AS ENUM ('ACTIVE', 'MAINTANCE', 'INACTIVE', 'GROUNDED', 'ORDERED');

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AircraftModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,

    CONSTRAINT "AircraftModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "id" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "rangeKm" INTEGER NOT NULL,
    "status" "AircraftStatus" NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_name_key" ON "Manufacturer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AircraftModel_name_manufacturerId_key" ON "AircraftModel"("name", "manufacturerId");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_prefix_key" ON "Aircraft"("prefix");

-- AddForeignKey
ALTER TABLE "AircraftModel" ADD CONSTRAINT "AircraftModel_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "AircraftModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
