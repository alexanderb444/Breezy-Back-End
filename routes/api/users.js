const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

const User = require('../../models/User')

//route     POST api/users
// @desc    register user
// @access  public
router.post('/', [
    check('email', 'Valid Email Required').isEmail(),
    check('password', 'Password needs more then 6 characters').isLength({min: 6})
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

    if(user) {
        return res.status(400).json({ errors: [{msg: 'User already exists'}] })
    }

    user = new User({
        email,
        password,
    })
    //Encrypt password

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    //Return jsonwebtoken

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload,
        process.env.jwtToken,
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
// To delete an account

router.delete('/', async (req,res) => {
    try {

        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id})
        //remove user
        await User.findOneAndRemove({ _id: req.user.id})

        res.json({msg: 'User removed'})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: "server error"})
    }
})
})
module.exports = router;