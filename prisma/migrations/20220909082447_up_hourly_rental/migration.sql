/*
  Warnings:

  - You are about to drop the `HourlyRental` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "HourlyRental";

-- CreateTable
CREATE TABLE "hourly_rentals" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "originLat" DECIMAL(65,30) NOT NULL,
    "originLng" DECIMAL(65,30) NOT NULL,
    "originName" TEXT NOT NULL,
    "departureTimestamp" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "hourly_rentals_pkey" PRIMARY KEY ("id")
);
