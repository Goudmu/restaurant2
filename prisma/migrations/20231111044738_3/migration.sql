-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_usernameUser_fkey" FOREIGN KEY ("usernameUser") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
