/*
  Warnings:

  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;
