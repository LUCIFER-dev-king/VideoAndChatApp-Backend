const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const convRoutes = require("./routes/conversation");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

var users = [];

const addUser = (socketId, userId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
  var user = users.find((user) => user.userId == id);
  return user.socketId;
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(socket.id, userId);
    io.emit("activeUsers", users);
    console.log(users);
  });

  socket.on("sendMsg", (message) => {
    io.to(getUser(message[message.length - 1].receiverId)).emit(
      "getMsg",
      message
    );
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("activeUsers", users);
  });
});

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use("/api", authRoutes);
app.use("/api", convRoutes);
app.use("/api", userRoutes);
app.use("/api", messageRoutes);

const PORT = process.env.PORT || 8080;
db.sequelize.sync().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
});
