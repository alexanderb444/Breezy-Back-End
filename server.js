const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB();

//init middleware
app.use(express.json({extended: false}))

app.get('/', (req,res) => res.send('API RUNNING'))

//define routes

app.use('/api/users', require('./routes/api/users'))

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`))