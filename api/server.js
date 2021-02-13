const express = require('express');

const server = express();

const AuthRouter = require('../api/auth/auth-router')

server.use(express.json());
server.use('/api/auth',AuthRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });
// server.use('/api/users',UsersRouter);

module.exports = server;