-- CreateTable
CREATE TABLE "user_visits_book" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "user_visits_book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_visits_book" ADD CONSTRAINT "user_visits_book_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_visits_book" ADD CONSTRAINT "user_visits_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
