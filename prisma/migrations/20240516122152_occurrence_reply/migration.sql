-- CreateTable
CREATE TABLE "occurrences_replies" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255) DEFAULT '',
    "user_id" INTEGER NOT NULL,
    "occurrence_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occurrences_replies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "occurrences_replies" ADD CONSTRAINT "occurrences_replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occurrences_replies" ADD CONSTRAINT "occurrences_replies_occurrence_id_fkey" FOREIGN KEY ("occurrence_id") REFERENCES "occurrences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
