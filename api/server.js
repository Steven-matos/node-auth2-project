const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const server = express();

const authRouter = require("../auth/router");
const userRouter = require("../users/users-router");
const restricted = require("../auth/restricted-middleware");

const sessionConfig = {
  name: "YDK",
  secret: "The worlds know nothing",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api", authRouter);
server.use("/api", restricted, userRouter);

module.exports = server;
