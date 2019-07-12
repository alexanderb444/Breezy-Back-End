const mongoose = require('mongoose')
const ClothesSchema = new mongoose.Schema({
            name: String,
            quanity: Number,
            price: Number
    }
)

module.exports = mongoose.model('clothes', ClothesSchema)