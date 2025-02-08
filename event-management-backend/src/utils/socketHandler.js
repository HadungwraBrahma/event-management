const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinEvent", (eventId) => {
      socket.join(eventId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = socketHandler;
