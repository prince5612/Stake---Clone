const mongoose =require('mongoose')

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
    user_id: {
        type : Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount : {
        type : Number,
        required: true
    },
    type : {
        type : String,
        required : true
    },
    date :{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Transactions" , TransactionsSchema);