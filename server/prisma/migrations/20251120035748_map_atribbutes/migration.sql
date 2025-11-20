/*
  Warnings:

  - You are about to drop the column `businessId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `users` table. All the data in the column will be lost.
  - Added the required column `business_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_time` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `phone` on the `businesses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `business_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_clientId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_businessId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_businessId_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "businessId",
DROP COLUMN "clientId",
DROP COLUMN "createdAt",
DROP COLUMN "dateTime",
DROP COLUMN "serviceId",
ADD COLUMN     "business_id" INTEGER NOT NULL,
ADD COLUMN     "client_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "service_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "businesses" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "businessId",
ADD COLUMN     "business_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "businessId",
ADD COLUMN     "business_id" INTEGER;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
