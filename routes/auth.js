const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signup, signin } = require("../controllers/auth");
router.post("/signup", signup);

router.post("/signin", signin);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://www.localhost:3000/",
  })
);

module.exports = router;
