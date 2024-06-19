/*
  Warnings:

  - You are about to drop the column `imagem` on the `Badge` table. All the data in the column will be lost.
  - Added the required column `image` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "imagem",
ADD COLUMN     "image" TEXT NOT NULL;
