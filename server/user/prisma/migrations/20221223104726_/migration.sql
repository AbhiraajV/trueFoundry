/*
  Warnings:

  - A unique constraint covering the columns `[gh_generated_token]` on the table `GithubCreds` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GithubCreds_gh_generated_token_key" ON "GithubCreds"("gh_generated_token");
