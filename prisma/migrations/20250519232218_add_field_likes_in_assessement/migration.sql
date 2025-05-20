/*
  Warnings:

  - Added the required column `likes` to the `assessement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assessement" ADD COLUMN     "likes" INTEGER NOT NULL;
