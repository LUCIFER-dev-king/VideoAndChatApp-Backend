const { User } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
    },
    async (accestoken, refreshToken, profile, done) => {
      const { sub: id, name, email, picture: url } = profile._json;
      try {
        const user = await User.findOne({
          where: { googleId: id },
        });

        if (!user) {
          const newuser = User.create({
            username: name,
            email: email,
            googleId: id,
            profileUrl: url,
          });

          return done(null, newuser);
        }

        return done(null, user);
        //   return res.json({ ...user, accestoken });
      } catch (e) {
        console.log(e);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  console.log(user);
  const currentUser = await User.findOne({ where: { id: user.id } });

  done(null, currentUser);
});

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email: email,
      username: username,
      password: hash,
    });
    res.json("registration succes");
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (!user || user === null) res.send("no users found");
  bcrypt.compare(password, user.password).then((result) => {
    if (!result) {
      res.send("Username and Password not correct");
      return;
    }
    const accestoken = sign({ username: user.username }, "videochatapp");
    res.json({ ...user, accestoken });
  });
};
