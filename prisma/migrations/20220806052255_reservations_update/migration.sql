/*
  Warnings:

  - You are about to drop the column `fromWhere` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `toWhere` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `destinationLat` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationLng` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originLat` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originLng` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "fromWhere",
DROP COLUMN "toWhere",
ADD COLUMN     "destinationLat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "destinationLng" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "originLat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "originLng" DECIMAL(65,30) NOT NULL;
