const socketAuth = require('./auth')
const discussionSocket = require("./discussion");

module.exports = (io) => {

    io.use(socketAuth);

    io.on("connection", (socket) => {
        console.log("User Connected", socket.userId);
        discussionSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("User Disconnected", socket.userId);
        })

    })
}