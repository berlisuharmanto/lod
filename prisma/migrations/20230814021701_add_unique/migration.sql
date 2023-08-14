/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Role_User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Transaction_List` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cart_id_key` ON `Cart`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Menu_id_key` ON `Menu`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Role_id_key` ON `Role`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Role_User_id_key` ON `Role_User`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_id_key` ON `Transaction`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_List_id_key` ON `Transaction_List`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
