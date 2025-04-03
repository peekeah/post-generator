-- DropIndex
DROP INDEX "SocialMediaPost_userId_key";

-- DropIndex
DROP INDEX "Subscription_userId_key";

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "SocialMediaPost_userId_idx" ON "SocialMediaPost"("userId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");
