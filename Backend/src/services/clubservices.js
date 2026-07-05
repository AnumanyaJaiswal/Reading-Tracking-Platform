const prisma = require("../config/db");

const createClub = async ({
    name,
    description,
    coverImage,
    ownerId,
    isPrivate,
}) => {

    const club = await prisma.club.create({
        data: {
            name,
            description,
            coverImage,
            ownerId,
            isPrivate,
        },

        include: {
            owner: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });

    // Automatically add the owner as the first member
    await prisma.clubMember.create({
        data: {
            clubId: club.id,
            userId: ownerId,
        },
    });

    return club;
};

module.exports = {
    createClub,
};