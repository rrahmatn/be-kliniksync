/*
  Warnings:

  - You are about to drop the column `payment_statuss` on the `Medical_History` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Medical_History" DROP COLUMN "payment_statuss",
ADD COLUMN     "payment_status" BOOLEAN NOT NULL DEFAULT false;
