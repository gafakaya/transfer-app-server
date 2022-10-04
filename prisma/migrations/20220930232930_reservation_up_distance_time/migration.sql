/*
  Warnings:

  - Added the required column `distanceText` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distanceValue` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeText` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeValue` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "distanceText" TEXT NOT NULL,
ADD COLUMN     "distanceValue" INTEGER NOT NULL,
ADD COLUMN     "timeText" TEXT NOT NULL,
ADD COLUMN     "timeValue" INTEGER NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vehicleId" TEXT;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
