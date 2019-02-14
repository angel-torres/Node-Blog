const express = require('express');
const routerPosts = express.Router();
const Posts = require('../data/helpers/postDb.js');

routerPosts.get('/', (req, res) => {
    Posts
    .get()
    .then( users => {
        res.status(200).json(users)
    })
    .catch( err => {
        res.status(500).json({ error: "The posts could not be retrieved." })
    })
});

routerPosts.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts
    .getById(id)
    .then( post => {res.status(200).json(post)})
    .catch( err => {res.status(500).json({errorMessage: 'The post could not be retreived.'})})
})

routerPosts.post('/', (req, res) => {
    const post = req.body;
    if (!req.body.text | !req.body.user_id) {
        res.status(400).json({ errorMessage: "Please provide text and user id for the post." })
    } else {
        Posts
        .insert(post)
        .then( post => {res.status(200).json(post)})
        .catch( err => {res.status(500).json({ errorMessage: "Could not post." })})
    }
})

routerPosts.put('/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if(!req.body.text | !req.body.user_id) {
        res.status(400).json({errorMessage:"Please provide text and user id for the post."})
    } else {
        try {
            const updatedPost = await Posts.update(id, changes);
            if (updatedPost) {
                res.status(200).json(updatedPost);
            } else {
                res.status(404).json({errorMessage:"Post could not be found."});
            }
        } catch {
            res.status(500).json({errorMessage:"Could not update post"})
        }
    }
})

routerPosts.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Posts.remove(id);
        if(!deleted) {
            res.status(400).json({errorMessage:"Post could not be found."})
        } else {
            res.status(200).json(deleted)
        }
    } catch {
        res.status(500).json({errorMessage:"Could not update post"});
    }
})

module.exports = routerPosts;