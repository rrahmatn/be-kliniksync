-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "specialist" DROP NOT NULL,
ALTER COLUMN "specialist" SET DEFAULT 'umum';