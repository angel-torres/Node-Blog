const express = require('express');
const routerPosts = express.Router();
const Posts = require('../data/helpers/postDb.js');

module.exports = routerPosts;