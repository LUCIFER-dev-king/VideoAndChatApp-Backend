const { User } = require("../models");

exports.getUserById = async (req, res, next) => {
  const id = req.params.userId;
  const user = await User.findByPk(id);
  req.user = user;
  next();
};

exports.getUser = (req, res) => {
  // console.log(req.user);
  //TODO: able to get user by calling from /home add same token after signin with username and password
  // return res.json("success");
  return res.json(req.user);
};
