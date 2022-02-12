const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const convRoutes = require("./routes/conversation");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const httpServer = require("http").createServer(app);
const session = require("express-session");
const { User } = require("./models");

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

var users = [];

const addUser = async (socketId, userId) => {
  const currentUser = await User.findByPk(userId);
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId, user: currentUser });

  io.emit("activeUsers", users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
  var user = users.find((user) => user.userId == id);
  return user.socketId;
};

const getAvailableUsersList = (id) => {
  var userarr = [];
  var availableUsers = users.find((user) => user.socketId !== id);
  // console.log(users);
  // availableUsers.forEach(async (user) => {
  //   const available = await User.findByPk(id);
  //   userarr.push(available);
  // });

  return userarr;
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(socket.id, userId);
  });

  socket.on("getAvailableUsers", () => {
    // console.log(getAvailableUsersList(socket.id));
  });

  socket.on("sendMsg", (message) => {
    io.to(getUser(message[message.length - 1].receiverId)).emit(
      "getMsg",
      message
    );
  });

  socket.on("callUser", ({ fromId, toId, signal }) => {
    io.to(getUser(toId)).emit("callUser", {
      fromId,
      signal,
    });
    // console.log({ fromId, toId, signal });
  });

  socket.on("answerCall", ({ toId, signal }) => {
    io.to(getUser(toId)).emit("callAccepted", signal);
    console.log({ toId, signal });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("activeUsers", users);
  });
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Google",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
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
