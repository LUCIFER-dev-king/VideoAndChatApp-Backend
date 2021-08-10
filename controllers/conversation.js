const { Conversation } = require("../models");
const { Op } = require("sequelize");

exports.createConversation = (req, res) => {
  const { userId, receiverId } = req.body;

  Conversation.create({
    UserId: userId,
    receiverId: receiverId,
  });

  res.json("Conversation created");
};

exports.getAllConversation = async (req, res) => {
  const userId = req.params.userId;

  const { count, rows } = await Conversation.findAndCountAll({
    where: {
      [Op.or]: [{ UserId: userId }, { receiverId: userId }],
    },
  });

  res.json({ count, rows });
};
