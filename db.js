const mongoose = require('mongoose')
// const config = require('config')
// const db = process.env.mongoURI

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('mongoDB connected')
    } catch(err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB