const jwt = require('jsonwebtoken')
// const config = require('config')

module.exports = function(req, res, next) {
//get token
const token = req.header('x-auth-token')

//check if no token
if(!token) {
    return res.status(401).json({msg: 'no token, authorization DENIED'})
}


//Verify token
try {
    const decoded = jwt.verify(token, process.env.jwtToken)
    req.user = decoded.user
    next()
} catch(err) {
    res.status(401).json({msg: 'Token is not valid'})
}
}




// const jwt = require('jsonwebtoken')
// const config = require('config')

// module.exports = function(req, res, next) {
// //get token
// const token = req.header('x-auth-token')

// //check if no token
// if(!token) {
//     return res.status(401).json({msg: 'no token, authorization DENIED'})
// }


// //Verify token
// // Find user with ID that is uncovered after decoded
// try {
//     const decoded = jwt.verify(token, process.env.jwtToken)
//     const profile = Profile.findOne({ user: decoded}).populate('user')
//     if (req.user = decoded.user.account === true) {
//         next()
//     } else {
//         console.log(profile)
//         // console.log("not today")
//         res.status(401).json({msg: 'Not Today'})
//         // res.json(profile)
//     }
    
// } catch(err) {
//     console.error(err.message)
//     res.status(401).json({msg: 'Token is not valid'})
// }
// }

//above is test code

