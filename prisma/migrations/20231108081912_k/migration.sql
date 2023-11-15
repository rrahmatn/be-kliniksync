/*
  Warnings:

  - Added the required column `name` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "name" TEXT NOT NULL;
