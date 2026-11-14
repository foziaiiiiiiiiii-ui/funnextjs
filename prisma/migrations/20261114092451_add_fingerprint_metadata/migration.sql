/*
  Warnings:

  - Added the required column `ipAddress` to the `Fingerprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Fingerprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `Fingerprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgent` to the `Fingerprint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fingerprint" ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT NOT NULL;
