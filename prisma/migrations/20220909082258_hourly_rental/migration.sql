-- CreateTable
CREATE TABLE "HourlyRental" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "originLat" DECIMAL(65,30) NOT NULL,
    "originLng" DECIMAL(65,30) NOT NULL,
    "originName" TEXT NOT NULL,
    "departureTimestamp" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "HourlyRental_pkey" PRIMARY KEY ("id")
);
