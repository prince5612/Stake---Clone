const express = require('express');
const router = express.Router();
const Transactions = require('../models/Transactions');
const { authToken } = require('./userAuth');

// Create Transaction
router.post('/transactions',authToken, async (req, res) => {
    try {
        const {email , amount} = req.body;
        const {id} = req.headers;

        const newTransaction = new Transactions({
            user_id:id,
            email,
            amount
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get All Transactions
router.get('/getalltransactions',authToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const transaction = await Transactions.find({ user_id: id }).populate('user_id');
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


// Delete Transaction
router.delete('/transactions', authToken, async (req, res) => {
    try {
        const {transactionid} = req.headers;
        if (!transactionid) {
            return res.status(400).json({ msg: "Transaction ID is required" });
        }
        const transaction = await Transactions.findByIdAndDelete(transactionid);
        if (!transaction){
            return res.status(404).json({msg: "Transaction not found"});
        } 
        res.status(200).json({msg:"Transaction deleted successfully"});
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;
