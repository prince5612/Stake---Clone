const mongoose =require('mongoose')

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
    user_id: {
        type : Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    email: {
        type : String,
        required: true,
        unique : true
    },
    amount : {
        type : Number,
        required: true
    },
});

module.exports = mongoose.model("Transactions" , TransactionsSchema);