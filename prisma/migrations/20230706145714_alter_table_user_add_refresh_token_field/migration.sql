/*
  Warnings:

  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `refresh_token` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;
