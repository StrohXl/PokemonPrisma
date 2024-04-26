-- CreateTable
CREATE TABLE "Generation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Generation_name_key" ON "Generation"("name");
