const mongoose =require('mongoose')

const { Schema } = mongoose;

const BetsSchema = new Schema({
    user_id: {
        type : Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    game_name: {
        type : String,
        required: true,
        ref: 'Games'
    },
    bet_amount: {
        type : Number,
        required: true
    },
    payout_amount: {
        type : Number,
        required: true
    },
    outcome:{
        type: String,
        rrequired: true
    }
});

module.exports = mongoose.model("Bets" , BetsSchema);