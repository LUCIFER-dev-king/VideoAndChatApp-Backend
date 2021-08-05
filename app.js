const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const convRoutes = require("./routes/conversation");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Video and ChatApp Backend");
});

app.use("/api", authRoutes);
app.use("/api", convRoutes);
app.use("/api", userRoutes);
app.use("/api", messageRoutes);

const PORT = process.env.PORT || 8080;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
});
