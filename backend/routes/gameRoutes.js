const express = require('express');
const router = express.Router();
const Games = require('../models/Games');

//create game
router.post('/game',  async (req, res) => {
    try {
        const { name } = req.body;
        const game = new Games(
            {
                name:name,
            }
        );

        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});
// Get Game
router.get('/getgame', async (req, res) => {
    try {
        const {game_id} = req.headers;
        const game = await Games.find({ _id : game_id });
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
