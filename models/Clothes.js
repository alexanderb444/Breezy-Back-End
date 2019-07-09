const mongoose = require('mongoose')
const ClothesSchema = new mongoose.Schema({
            name: String,
            price: Number
    }
)

module.exports = mongoose.model('clothes', ClothesSchema)