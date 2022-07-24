/*
  Warnings:

  - You are about to drop the `reservations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_userId_fkey";

-- DropTable
DROP TABLE "reservations";
