/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Guitar` table. All the data in the column will be lost.
  - You are about to drop the `_GuitarToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GuitarToOrder" DROP CONSTRAINT "_GuitarToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_GuitarToOrder" DROP CONSTRAINT "_GuitarToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Guitar" DROP COLUMN "updatedAt",
ADD COLUMN     "orderId" INTEGER;

-- DropTable
DROP TABLE "_GuitarToOrder";

-- AddForeignKey
ALTER TABLE "Guitar" ADD CONSTRAINT "Guitar_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
