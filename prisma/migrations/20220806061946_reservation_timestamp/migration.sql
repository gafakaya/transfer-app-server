/*
  Warnings:

  - You are about to drop the column `departureDate` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `departureTimestamp` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "departureDate",
DROP COLUMN "returnDate",
ADD COLUMN     "departureTimestamp" INTEGER NOT NULL,
ADD COLUMN     "returnTimestamp" INTEGER;
