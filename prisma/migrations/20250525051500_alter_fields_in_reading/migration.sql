-- AlterTable
ALTER TABLE "readings" ALTER COLUMN "start_time" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "duration" SET DEFAULT 0,
ALTER COLUMN "last_page_read" SET DEFAULT 0;
