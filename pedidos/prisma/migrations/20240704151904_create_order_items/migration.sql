-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItems" (
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "orderItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
