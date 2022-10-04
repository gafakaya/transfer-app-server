/*
  Warnings:

  - Added the required column `isActive` to the `Pricing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pricing" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
