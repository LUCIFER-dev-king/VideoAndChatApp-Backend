const { Conversation } = require("../models");
const { Op } = require("sequelize");

exports.createConversation = async (req, res) => {
  const { userId, receiverId, coversationLinkId } = req.body;

  const conv = await Conversation.create({
    UserId: userId,
    receiverId: receiverId,
    coversationLinkId: coversationLinkId,
  });

  res.status(200).json({ conv });
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
