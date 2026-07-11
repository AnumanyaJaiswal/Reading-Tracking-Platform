const prisma = require('../config/db')

const createDiscussion = async ({
    clubId,
    userId,
    message
}) => {

    //Checking if the user is the member of the club or not
    const membership = await prisma.clubMember.findUnique({
        where: {
            clubId_userId: {
                clubId,
                userId,
            },
        },
    });

    if (!membership) {
        throw new Error("You must join the club before posting.");
    }

    return prisma.clubDiscussion.create({
        data: {
            clubId,
            userId,
            message
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
}

const getDiscussions = async(clubId)=>{
    const discussions = await prisma.clubDiscussion.findMany({
        where:{
            clubId
        },
        include: {

            user: {
                select: {
                    id: true,
                    username: true,
                },
            },

            _count: {
                select: {
                    comments: true,
                    reactions: true,
                },
            },

        },

        orderBy: {
            createdAt: "asc",
        },
    })

    return discussions.map((discussion) => ({
        id: discussion.id,
        message: discussion.message,
        createdAt: discussion.createdAt,
        updatedAt: discussion.updatedAt,
        isPinned: discussion.isPinned,

        user: discussion.user,

        commentCount: discussion._count.comments,
        reactionCount: discussion._count.reactions,
    }));
}

module.exports = {
    createDiscussion,
    getDiscussions
}