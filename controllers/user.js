const { User } = require("../models");

exports.getUserById = async (req, res, next) => {
  const id = req.params.userId;
  const user = await User.findByPk(id);
  req.user = user;
  next();
};

exports.getUser = (req, res) => {
  return res.json(req.user);
};
