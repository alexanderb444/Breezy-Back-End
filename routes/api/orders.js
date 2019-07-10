const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator/check')
const request = require('request')
const config = require('config')

const Order = require('../../models/Order')
const User = require('../../models/User')

//route     GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user')

        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'})
        }

        res.json(profile)
    }catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//route     Post api/profile
// @desc    Create ir update user profile
// @access  Private
router.post('/', [ auth, ],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const {
        price,
        location
    } = req.body

    //build profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if(price) profileFields.price = price
    if(location) profileFields.location = location

    try {
        let profile = await Profile.findOne({user: req.user.id})

        //create
        profile = new Order(profileFields)

        await profile.save()
        res.json(profile)

    } catch(err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

//route     GET api/profile
// @desc    get all profiles
// @access  Public

router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find().populate('user')
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: "server error"})
    }
})

//route     GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user')

    if(!profile)
    return res.status(400).json({ msg: "Profile not found"})

    res.json(profile)

        } catch (err) {
            console.error(err.message)
            if(err.kind === 'ObjectId') {
                return res.status(400).json({ msg: "Profile not found"})
            }
            res.status(500).json({msg: "server error"})
    }
})

//route     DELETE api/profile
// @desc    Delete profile, user and posts
// @access  Private

router.delete('/', auth, async (req,res) => {
    try {
        //@todo remove user posts

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

module.exports = router;