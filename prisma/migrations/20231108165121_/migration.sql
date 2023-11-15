/*
  Warnings:

  - You are about to drop the column `token` on the `Clinic` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_count` on the `Clinic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cashier" DROP CONSTRAINT "Cashier_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "Master_Service" DROP CONSTRAINT "Master_Service_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "Medical_History" DROP CONSTRAINT "Medical_History_cashier_id_fkey";

-- DropForeignKey
ALTER TABLE "Medical_History" DROP CONSTRAINT "Medical_History_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "Medical_History" DROP CONSTRAINT "Medical_History_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Medical_History" DROP CONSTRAINT "Medical_History_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Medical_History" DROP CONSTRAINT "Medical_History_pharmacy_id_fkey";

-- DropForeignKey
ALTER TABLE "Medical_History" DROP CONSTRAINT "Medical_History_receptionist_id_fkey";

-- DropForeignKey
ALTER TABLE "Pharmacy" DROP CONSTRAINT "Pharmacy_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "Receptionist" DROP CONSTRAINT "Receptionist_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_master_service_id_fkey";

-- AlterTable
ALTER TABLE "Clinic" DROP COLUMN "token",
DROP COLUMN "transaction_count";

-- AlterTable
ALTER TABLE "Medical_History" ALTER COLUMN "patient_id" DROP NOT NULL,
ALTER COLUMN "doctor_id" DROP NOT NULL,
ALTER COLUMN "receptionist_id" DROP NOT NULL,
ALTER COLUMN "cashier_id" DROP NOT NULL,
ALTER COLUMN "pharmacy_id" DROP NOT NULL,
ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "medicine" DROP NOT NULL,
ALTER COLUMN "payment_statuss" DROP NOT NULL;
