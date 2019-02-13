const express = require('express');
const server = express();
const routerPosts = require('./posts/posts-router.js');
const routerUsers = require('./users/users-router.js');

server.use(express.json());
server.use('/users', routerUsers);
server.use('/posts', routerPosts);

module.exports = server;