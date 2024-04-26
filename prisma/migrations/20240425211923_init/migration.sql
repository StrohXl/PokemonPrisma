-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "generationId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Pokemon_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("id", "name", "number") SELECT "id", "name", "number" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
CREATE UNIQUE INDEX "Pokemon_number_key" ON "Pokemon"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
