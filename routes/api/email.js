const sendEmail = require('./emailsent')

const express = require('express')

const router = express.Router()

router.get('/email/hello', (req,res,next) => {
    res.json("World")
})

router.post('/email', async (req,res,next) => {
    try {
        await sendEmail('bishop.alexander@gmail.com', req.body.email, req.body.subject, req.body.message)
        res.send("email sent")
    } catch (error) {
        console.error(error)
        res.status(500)
    }
})


module.exports = router;