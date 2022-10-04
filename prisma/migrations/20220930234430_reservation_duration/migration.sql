/*
  Warnings:

  - You are about to drop the column `timeText` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `timeValue` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `durationText` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationValue` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "timeText",
DROP COLUMN "timeValue",
ADD COLUMN     "durationText" TEXT NOT NULL,
ADD COLUMN     "durationValue" INTEGER NOT NULL;
