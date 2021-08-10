const { Message } = require("../models");

exports.createMsg = async (req, res) => {
  const { ConversationId, senderId, receiverId, message } = req.body;
  Message.create({ ConversationId, senderId, receiverId, message });
  res.json("Message created");
};

exports.getAllMsg = async (req, res) => {
  const conversationId = req.params.convId;
  const { count, rows } = await Message.findAndCountAll({
    where: { ConversationId: conversationId },
  });
  res.json({ count, rows });
};
