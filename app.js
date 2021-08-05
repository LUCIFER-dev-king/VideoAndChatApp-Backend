const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Video and ChatApp Backend");
});

app.use("/api", authRoutes);

const PORT = process.env.PORT || 8080;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
});
