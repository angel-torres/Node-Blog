const express = require('express');
const routerUsers = express.Router();
const Users = require('../data/helpers/userDb.js');

routerUsers.get('/', (req, res) => {
    Users
    .get()
    .then( users => {
        res.status(200).json(users)
    })
    .catch( err => {
        res.status(500).json({ error: "The users could not be retrieved." })
    })
});

routerUsers.get('/:id', (req, res) => {
    const id = req.params.id;
    Users
    .getById(id)
    .then( user => {res.status(200).json(user)})
    .catch( err => {res.status(500).json({message: 'The user could not be retreived.'})})
})

routerUsers.get('/:id/posts', async (req, res) => {
    const id = req.params.id;
    try {
        const posts =  await Users.getUserPosts(id);
        console.log(posts)
        if (posts.length < 1) {
            res.status(404).json({errorMessage: "There are no posts to retreive."})
        } else {
            res.status(200).json(posts)
        }
    } catch {
        res.status(500).json({errorMessage:"Could not retreive user posts."})
    }
})

routerUsers.post('/', (req, res) => {
    const user = req.body;
    if (!req.body.name) {
        res.status(400).json({ errorMessage: "Please provide name for the user." })
    } else {
        Users
        .insert(user)
        .then( user => {res.status(200).json(user)})
        .catch( err => {res.status(500).json({ errorMessage: "Could not add user." })})
    }
})

module.exports = routerUsers;