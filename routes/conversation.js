const {
  createConversation,
  getAllConversation,
} = require("../controllers/conversation");
const express = require("express");
const router = express.Router();

router.post("/createConv", createConversation);

router.get("/getConv/:userId", getAllConversation);

module.exports = router;
