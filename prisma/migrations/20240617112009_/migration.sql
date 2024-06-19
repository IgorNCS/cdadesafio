/*
  Warnings:

  - You are about to drop the column `imagemURL` on the `Badge` table. All the data in the column will be lost.
  - Added the required column `imagem` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "imagemURL",
ADD COLUMN     "imagem" TEXT NOT NULL;
