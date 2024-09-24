const mongoose =require('mongoose')

const { Schema } = mongoose;

const GamesSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    // type: {
    //     type : String,
    // },
    // provider: {
    //     type : String,
    //     required: true
    // },
    // min_bet: {
    //     type : Number,
    //     required: true
    // },
    // max_bet: {
    //     type : Number,
    //     required: true
    // },
    // return_to_player: {
    //     type : Number,
    //     required: true
    // },
});

module.exports = mongoose.model("Games" , GamesSchema);