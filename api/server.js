require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbconnection = require("../data/db-config");

// routes
const userRoutes = require("../routes/userRoutes");

const server = express();

server.use(express.json());
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

const sessConfig = {
  name: "noteriffic",
  secret: process.env.SESSION_SECRET || "this is the session secret lol",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  store: new KnexSessionStore({
    knex: dbconnection,
    createtable: true,
    tablename: "sessions",
    sidfieldname: "sessionid",
    clearInterval: 1000 * 60 * 60 * 24
  }),
  resave: false,
  saveUninitialized: false
};
server.use(session(sessConfig));

server.use("/user", userRoutes);

server.get("/api", (req, res) => {
  res.status(200).json({ message: "API up" });
});

module.exports = server;
