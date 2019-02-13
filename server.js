const express = require('express');
const server = express();
const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());

server.get('/', (req, res) => {
    userDb
    .get()
    .then( users => {
        res.status(200).json(users)
    })
    .catch( err => {
        console.log(err)
    })
});

module.exports = server;