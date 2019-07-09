const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator/check')

const User = require('../../models/User')

//route     POST api/auth
// @desc    Authenticate user and get token
// @access  public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')

    }
})

//route     GET api/users
// @desc    register user
// @access  public
router.post('/', [
    check('email', 'Valid Email Required').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const { email, password} = req.body

    try{

    //see if user exists
    let user = await User.findOne({ email })

    if(!user) {
        return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] })
    }

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload, 
        config.get('jwtToken'),
        {expiresIn: 3600000},
        (err,token) => {
            if(err) throw err
            res.json({ token })
        }
        )


    } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
    }
})

module.exports = router;