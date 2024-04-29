-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Aberto', 'Finalizado', 'Andamento');

-- CreateTable
CREATE TABLE "occurrences" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(127) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occurrences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "occurrences" ADD CONSTRAINT "occurrences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
