const express = require("express");
const router = express.Router();
const { createMsg, getAllMsg } = require("../controllers/message");

router.post("/createMsg", createMsg);

router.get("/getMsg/:convId", getAllMsg);

module.exports = router;
