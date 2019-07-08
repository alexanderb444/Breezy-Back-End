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
    clothes: [
        {
            trousers: {
                type: Number
            },
            Jacket: {
                type: Number
            },
            Dress: {
                type: Number
            },
            Skirt: {
                type: Number
            },
            Blouse: {
                type: Number
            },
            Mens_shirt: {
                type: Number
            }        
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Order = mongoose.model('order', OrderSchema)