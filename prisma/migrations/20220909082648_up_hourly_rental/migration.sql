-- AlterTable
ALTER TABLE "hourly_rentals" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "hourly_rentals" ADD CONSTRAINT "hourly_rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
