const { Conversation } = require("../models");

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
    where: { UserId: userId },
  });

  res.json({ count, rows });
};
