var formidable = require("formidable");
const { Message } = require("../models");
const fs = require("fs");
// exports.createMsg = async (req, res) => {
//   if (req.files.file) {
//     const { ConversationId, senderId, receiverId } = req.body;
//     var uploadFile = req.files.file;
//     console.log(uploadFile);
//   } else {
//     const { ConversationId, senderId, receiverId, message } = req.body;
//     Message.create({ ConversationId, senderId, receiverId, message });
//     res.json("Message saved");
//   }
// };

exports.createMsg = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send(400).json({
        err: "There is a problem with image",
      });
    }
    const { ConversationId, senderId, receiverId, message, createdAt } = fields;
    console.log(ConversationId, senderId, receiverId, message, createdAt);
    var newMsg = await Message.create({
      ConversationId,
      senderId,
      receiverId,
      message,
      created: createdAt,
    });
    if (files.photo) {
      newMsg.data = fs.readFileSync(files.photo.path);
      newMsg.save();
    }

    res.json(newMsg);
  });
};

exports.getAllMsg = async (req, res) => {
  const conversationId = req.params.convId;
  const { count, rows } = await Message.findAndCountAll({
    where: { ConversationId: conversationId },
  });
  res.json({ count, rows });
};
