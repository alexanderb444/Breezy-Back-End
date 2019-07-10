const express = require('express')
const router = express.Router()
const config = require('config')
const {check, validationResult} = require('express-validator/check')

const Clothes = require('../../models/Clothes')

// price.toFixed(2) remember to do that for the total price

//route     GET api/users
// @desc    register user
// @access  public
router.post('/', 
async (req, res) => {
    //const errors = validationResult(req)
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array()})
    // }

    const {
        name,
        price
    } = req.body

    console.log(name,price)
    try{

    clothes = new Clothes({
        name,
        price
    })

    await clothes.save()

    return res.json(clothes)


    } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
    }

    
})

router.get('/', async (req,res) => {
    try {
        const clothesarray = await Clothes.find()
        res.json(clothesarray)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({msg: "server error"})
    }
})

module.exports = router;