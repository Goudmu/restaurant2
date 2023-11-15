-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_usernameUser_fkey";

-- DropIndex
DROP INDEX "Cart_usernameUser_key";
