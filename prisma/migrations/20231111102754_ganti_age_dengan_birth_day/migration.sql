/*
  Warnings:

  - You are about to drop the column `age` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "age",
ADD COLUMN     "birth_date" TIMESTAMPTZ NOT NULL;
