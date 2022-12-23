/*
  Warnings:

  - Added the required column `gh_generated_token` to the `GithubCreds` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GithubCreds" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gh_key" TEXT NOT NULL,
    "gh_username" TEXT NOT NULL,
    "gh_generated_token" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "GithubCreds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GithubCreds" ("createdAt", "gh_key", "gh_username", "id", "updatedAt", "userId") SELECT "createdAt", "gh_key", "gh_username", "id", "updatedAt", "userId" FROM "GithubCreds";
DROP TABLE "GithubCreds";
ALTER TABLE "new_GithubCreds" RENAME TO "GithubCreds";
CREATE UNIQUE INDEX "GithubCreds_userId_key" ON "GithubCreds"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
