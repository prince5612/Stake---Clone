const express = require('express');
const router = express.Router();
const Games = require('../models/Games');

// Create Game
router.post('/games', async (req, res) => {
    try {
        const game = new Games(req.body);
        await game.save();
        res.status(201).send(game);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get All Games
router.get('/games', async (req, res) => {
    try {
        const games = await Games.find();
        res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get Game by ID
router.get('/games/:id', async (req, res) => {
    try {
        const game = await Games.findById(req.params.id);
        if (!game) return res.status(404).send();
        res.send(game);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Game
router.put('/games/:id', async (req, res) => {
    try {
        const game = await Games.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!game) return res.status(404).send();
        res.send(game);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Game
router.delete('/games/:id', async (req, res) => {
    try {
        const game = await Games.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).send();
        res.send(game);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
