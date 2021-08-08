const { Message } = require("../models");

exports.createMsg = async (req, res) => {
  const { conversationId, senderId, message } = req.body;
  Message.create({
    ConversationId: conversationId,
    senderId: senderId,
    message: message,
  });
  res.json("Message created");
};

exports.getAllMsg = async (req, res) => {
  const conversationId = req.params.convId;
  const { count, rows } = await Message.findAndCountAll({
    where: { ConversationId: conversationId },
  });
  res.json({ count, rows });
};
