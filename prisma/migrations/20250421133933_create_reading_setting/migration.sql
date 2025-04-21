-- CreateTable
CREATE TABLE "reading_settings" (
    "id" TEXT NOT NULL,
    "font_family" TEXT NOT NULL,
    "font_size" DECIMAL(65,30) NOT NULL,
    "font_spacing" TEXT NOT NULL,
    "screen_brightness" DECIMAL(65,30) NOT NULL,
    "theme" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "reading_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reading_settings_userId_key" ON "reading_settings"("userId");

-- AddForeignKey
ALTER TABLE "reading_settings" ADD CONSTRAINT "reading_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
