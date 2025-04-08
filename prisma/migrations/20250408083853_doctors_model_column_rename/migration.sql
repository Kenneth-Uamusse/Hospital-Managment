/*
  Warnings:

  - You are about to drop the column `specializaton` on the `doctors` table. All the data in the column will be lost.
  - Added the required column `specialization` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "specializaton",
ADD COLUMN     "specialization" VARCHAR(255) NOT NULL;
