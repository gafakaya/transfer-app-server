-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "litrePerKm" INTEGER NOT NULL,
    "costPerGasLitre" INTEGER NOT NULL,
    "pricePerKm" INTEGER NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);
