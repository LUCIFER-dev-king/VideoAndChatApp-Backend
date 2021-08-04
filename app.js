const express = require("express");
const app = express();
const db = require("./models");
app.get("/", (req, res) => {
  res.send("hi");
});

const PORT = process.env.PORT || 8080;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
  });
});
