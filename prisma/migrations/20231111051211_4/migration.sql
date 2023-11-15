/*
  Warnings:

  - A unique constraint covering the columns `[usernameUser]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cart_usernameUser_key" ON "Cart"("usernameUser");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_usernameUser_fkey" FOREIGN KEY ("usernameUser") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
