/*
  Warnings:

  - Added the required column `medical_history_id` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "medical_history_id" INTEGER NOT NULL;
