-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pickUpPoint" TEXT NOT NULL,
    "destinationPoint" TEXT NOT NULL,
    "pickUpDate" TIMESTAMP(3) NOT NULL,
    "isRoundTrip" BOOLEAN,
    "dateOfReturn" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
