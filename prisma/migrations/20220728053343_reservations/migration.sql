-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromWhere" TEXT NOT NULL,
    "toWhere" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "isRoundTrip" BOOLEAN,
    "returnDate" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
