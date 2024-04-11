const jwt = require('jsonwebtoken')
const User = require('../models/users')

const authenticate = (req,res,next) => {
    try {
        const token = req.header('Authorization')
        console.log('token', token)
        const user = jwt.verify(token,'hello')

        console.log('userId',user.userId)

        User.findByPk(userId).then(user =>{
            console.log(JSON.stringify(user))
            req.user = user
            next()
        }).catch(err => { throw new Error(err)})
    } catch(err) {
        console.log(err);
        return res.status(401).json({success:false})
    }
}