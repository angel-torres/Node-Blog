const express = require('express');
const server = express();
const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');
const routerPosts = require('./posts/posts-router.js');
const routerUsers = require('./users/users-router.js');

server.use(express.json());

server.use('/users', routerUsers);
server.use('/posts', routerPosts);

module.exports = server;