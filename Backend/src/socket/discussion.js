const prisma = require('../config/db')
const {
    createDiscussion
} = require("../services/discussionservice");

module.exports = (io, socket) => {

    socket.on("joinClub", (clubId) => {

        socket.join(`club_${clubId}`)

        console.log(`${socket.userId} joined club ${clubId}`)
    })

    socket.on("sendDiscussion",

        async (data) => {

            const { clubId, message } = data;

            try {
                const discussion =
                    await createDiscussion({
                        clubId,
                        userId: socket.userId,
                        message
                    });

                io.to(`club_${clubId}`)
                    .emit("newDiscussion", discussion)


            } catch (error) {
                socket.emit(
                    "discussionError",
                    error.message
                );
            }
        }
    )
}