const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()


app.use(cors())

connectDB();

//init middleware
app.use(express.json({extended: false}))

app.get('/', (req,res) => res.send('API RUNNING'))

//define routes

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/clothes', require('./routes/api/clothes'))
app.use('/api/orders', require('./routes/api/orders'))
app.use('/api', require('./routes/api/email'))


const PORT = 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`))