const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { jwtSecret } = require("../Config/secret");
const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const userInfo = req.body;

  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;

  Users.add(userInfo)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to save user", error: err });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          welcome: user.username,
          token
        });
      } else {
        res.status(401).json({ message: "invalid credentials!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error finding user", error: err });
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
