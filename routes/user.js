const express = require("express");
const router = express.Router();
const { getUserById, getUser } = require("../controllers/user");

router.get("/user/:userId", getUserById, getUser);

router.get("/user", getUser);

module.exports = router;
