/*
  Warnings:

  - You are about to drop the column `departureTimestamp` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `returnTimestamp` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `departureDate` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "departureTimestamp",
DROP COLUMN "returnTimestamp",
ADD COLUMN     "departureDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "returnDate" TIMESTAMP(3);
