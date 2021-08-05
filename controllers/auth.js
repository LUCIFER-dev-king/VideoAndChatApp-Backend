const { User } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      username: username,
      password: hash,
    });
    res.json("registration succes");
  });
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });

  if (!user) res.send("no users found");

  bcrypt.compare(password, user.password).then((result) => {
    if (!result) {
      res.send("Username and Password not correct");
      return;
    }
    const accestoken = sign(
      { username: user.username, id: user.id },
      "videochatapp"
    );
    res.json({ ...user, accestoken });
  });
};
