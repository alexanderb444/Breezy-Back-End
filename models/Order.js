const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    clothes: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'clothes'
        }
    ]
});

module.exports = Order = mongoose.model('order', OrderSchema)