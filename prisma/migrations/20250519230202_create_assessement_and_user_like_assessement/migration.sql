-- CreateTable
CREATE TABLE "assessement" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "assessement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_like_assessement" (
    "user_id" TEXT NOT NULL,
    "assessement_id" TEXT NOT NULL,

    CONSTRAINT "user_like_assessement_pkey" PRIMARY KEY ("user_id","assessement_id")
);

-- AddForeignKey
ALTER TABLE "assessement" ADD CONSTRAINT "assessement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessement" ADD CONSTRAINT "assessement_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_like_assessement" ADD CONSTRAINT "user_like_assessement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_like_assessement" ADD CONSTRAINT "user_like_assessement_assessement_id_fkey" FOREIGN KEY ("assessement_id") REFERENCES "assessement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
