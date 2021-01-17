const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    //when we make a request and we send data, its only going to accept text and amount. We're not going to be able to send anything else. 
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema)


