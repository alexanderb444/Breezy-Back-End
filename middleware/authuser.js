const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
//get token
const token = req.header('x-auth-token')

//check if no token
if(!token) {
    return res.status(401).json({msg: 'no token, authorization DENIED'})
}


//Verify token
try {
    const decoded = jwt.verify(token, config.get('jwtToken'))
    if (req.user = decoded.user.account === true) {
        next()
    } else {
        console.log("not today")
        res.status(401).json({msg: 'Not Today'})
    }
    
} catch(err) {
    res.status(401).json({msg: 'Token is not valid'})
}
}