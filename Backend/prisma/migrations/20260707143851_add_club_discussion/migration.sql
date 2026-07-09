-- CreateTable
CREATE TABLE "ClubDiscussion" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubDiscussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubComment" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubDiscussionReaction" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ClubDiscussionReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClubDiscussion_clubId_createdAt_idx" ON "ClubDiscussion"("clubId", "createdAt");

-- CreateIndex
CREATE INDEX "ClubComment_discussionId_idx" ON "ClubComment"("discussionId");

-- CreateIndex
CREATE UNIQUE INDEX "ClubDiscussionReaction_discussionId_userId_key" ON "ClubDiscussionReaction"("discussionId", "userId");

-- CreateIndex
CREATE INDEX "ClubMember_clubId_idx" ON "ClubMember"("clubId");

-- CreateIndex
CREATE INDEX "UserBook_userId_status_idx" ON "UserBook"("userId", "status");

-- CreateIndex
CREATE INDEX "UserBook_userId_finishedAt_idx" ON "UserBook"("userId", "finishedAt");

-- AddForeignKey
ALTER TABLE "ClubDiscussion" ADD CONSTRAINT "ClubDiscussion_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubDiscussion" ADD CONSTRAINT "ClubDiscussion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubComment" ADD CONSTRAINT "ClubComment_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "ClubDiscussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubComment" ADD CONSTRAINT "ClubComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubDiscussionReaction" ADD CONSTRAINT "ClubDiscussionReaction_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "ClubDiscussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubDiscussionReaction" ADD CONSTRAINT "ClubDiscussionReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
