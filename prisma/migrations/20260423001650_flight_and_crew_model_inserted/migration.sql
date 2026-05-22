-- CreateEnum
CREATE TYPE "CrewRole" AS ENUM ('PILOT', 'FIRST_OFFICER', 'CABIN_CREW', 'FLIGHT_ENGINEER');

-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('SCHEDULED', 'BOARDING', 'DEPARTED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "aircraftId" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "status" "FlightStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightCrew" (
    "id" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "CrewRole" NOT NULL,

    CONSTRAINT "FlightCrew_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flightNumber_departureTime_key" ON "Flight"("flightNumber", "departureTime");

-- CreateIndex
CREATE UNIQUE INDEX "FlightCrew_flightId_userId_key" ON "FlightCrew"("flightId", "userId");

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightCrew" ADD CONSTRAINT "FlightCrew_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightCrew" ADD CONSTRAINT "FlightCrew_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
