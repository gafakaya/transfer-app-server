/*
  Warnings:

  - Added the required column `destinationName` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originName` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "destinationName" TEXT NOT NULL,
ADD COLUMN     "originName" TEXT NOT NULL;
