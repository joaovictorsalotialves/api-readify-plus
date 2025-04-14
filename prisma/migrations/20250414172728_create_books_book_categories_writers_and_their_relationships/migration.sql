-- CreateTable
CREATE TABLE "favorites_writers_of_users" (
    "writer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "favorites_writers_of_users_pkey" PRIMARY KEY ("user_id","writer_id")
);

-- CreateTable
CREATE TABLE "favorites_categories_book_of_users" (
    "book_category_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "favorites_categories_book_of_users_pkey" PRIMARY KEY ("user_id","book_category_id")
);

-- CreateTable
CREATE TABLE "favorites_books_of_users" (
    "book_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "favorites_books_of_users_pkey" PRIMARY KEY ("user_id","book_id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url_cover" TEXT NOT NULL,
    "book_path" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "number_page" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "writer_id" TEXT NOT NULL,
    "book_category_id" TEXT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "book_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "writers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorites_writers_of_users" ADD CONSTRAINT "favorites_writers_of_users_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "writers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_writers_of_users" ADD CONSTRAINT "favorites_writers_of_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_categories_book_of_users" ADD CONSTRAINT "favorites_categories_book_of_users_book_category_id_fkey" FOREIGN KEY ("book_category_id") REFERENCES "book_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_categories_book_of_users" ADD CONSTRAINT "favorites_categories_book_of_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_books_of_users" ADD CONSTRAINT "favorites_books_of_users_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_books_of_users" ADD CONSTRAINT "favorites_books_of_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "writers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_book_category_id_fkey" FOREIGN KEY ("book_category_id") REFERENCES "book_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
