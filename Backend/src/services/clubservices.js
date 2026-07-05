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

const getAllClubs = async (userId) => {

    const clubs = await prisma.club.findMany({

        include: {

            owner: {
                select: {
                    id: true,
                    username: true,
                },
            },

            members: {
                select: {
                    userId: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return clubs.map((club) => ({

        id: club.id,

        name: club.name,

        description: club.description,

        coverImage: club.coverImage,

        createdAt: club.createdAt,

        owner: club.owner,

        memberCount: club.members.length,

        joined: club.members.some(
            (member) => member.userId === userId
        ),

    }));
};

const getMyClubs = async (userId) => {
    const memberships = await prisma.clubMember.findMany({
        where: {
            userId,
        },
        include: {
            club: {
                include: {
                    owner: {
                        select: {
                            id: true,
                            username: true,
                        }
                    },
                    members: {
                        select: {
                            userId: true,
                        },
                    },
                }
            }
        }
    })

    return memberships.map((membership) => ({

        id: membership.club.id,

        name: membership.club.name,

        description: membership.club.description,

        coverImage: membership.club.coverImage,

        createdAt: membership.club.createdAt,

        owner: membership.club.owner,

        memberCount: membership.club.members.length,

    }));
}

const joinClub = async ({ clubId, userId }) => {

    // Check if the club exists
    const club = await prisma.club.findUnique({
        where: {
            id: clubId,
        },
    });

    if (!club) {
        throw new Error("Club not found");
    }

    // Check if the user is already a member
    const existingMember = await prisma.clubMember.findFirst({
        where: {
            clubId,
            userId,
        },
    });

    if (existingMember) {
        throw new Error("You are already a member of this club");
    }

    // Join the club
    return prisma.clubMember.create({
        data: {
            clubId,
            userId,
        },
    });


};

const leaveClub = async ({ clubId, userId }) => {
    // Check if the club exists
    const club = await prisma.club.findUnique({
        where: {
            id: clubId,
        }
    })

    if (!club) {
        throw new Error("Club not found");
    }

    // Check if the user is a member
    const existingMember = await prisma.clubMember.findFirst({
        where: {
            clubId,
            userId,
        }
    })

    if (!existingMember) {
        throw new Error("You are not a member of this club");
    }

    //Owner cannot leave the club
    if (club.ownerId === userId) {
        throw new Error("Club owner cannot leave the club");
    }

    // Remove the user from the club
    await prisma.clubMember.delete({
        where: {
            id: existingMember.id,
        }
    })
}

const getClubDetails = async ({ clubId, userId }) => {
    const club = await prisma.club.findUnique({
        where: {
            id: clubId,
        },

        include: {
            owner: {
                select: {
                    id: true,
                    username: true,
                }
            },
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                        }
                    }
                }
            }
        }
    })
    if (!club) {
        throw new Error("Club not found");
    }

    return {
        id: club.id,

        name: club.name,

        description: club.description,

        coverImage: club.coverImage,

        createdAt: club.createdAt,

        owner: club.owner,

        memberCount: club.members.length,

        joined: club.members.some(
            (member) => member.userId === userId
        ),

        members: club.members.map((member) => ({
            id: member.user.id,
            username: member.user.username,
            joinedAt: member.joinedAt,
        })),

    }
}

const deleteClub = async ({ clubId, userId }) => {
    // Check if the club exists
    const club = await prisma.club.findUnique({
        where: {
            id: clubId,
        }
    })

    if(!club) {
        throw new Error("Club not found");
    }

    // Check if the user is the owner
    if(club.ownerId !== userId) {
        throw new Error("Only the club owner can delete the club");
    }

    // Delete the club
    return prisma.club.delete({
        where:{
            id: clubId,
        }
    })
}

module.exports = {
    createClub,
    getAllClubs,
    getMyClubs,
    joinClub,
    leaveClub,
    getClubDetails,
    deleteClub,
};