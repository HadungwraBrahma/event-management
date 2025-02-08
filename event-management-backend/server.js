const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.set("io", io);

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/events", require("./src/routes/eventRoutes"));
app.use("/api/upload", require("./src/routes/uploadRoutes"));

require("./src/utils/socketHandler")(io);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, from Server");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
