/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cashier` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Cashier` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Clinic` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Clinic` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Master_Service` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Master_Service` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Medical_History` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Medical_History` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pharmacy` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pharmacy` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Receptionist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Receptionist` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SuperAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SuperAdmin` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Cashier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Master_Service` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Master_Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `Medical_History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Receptionist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cashier" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Clinic" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Master_Service" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Medical_History" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Pharmacy" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Receptionist" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SuperAdmin" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
