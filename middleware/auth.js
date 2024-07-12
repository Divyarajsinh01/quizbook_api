const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", '')
        // console.log(token);
        const decode = jwt.verify(token, 'nodejsQuizbookApp')
        // console.log(decode);

        const user = await User.findOne({_id: decode.id, 'tokens.token': token})
        // console.log(user);
        if(!user){
            throw new Error('user not found!')
        }

        req.user = user

        next()
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: `authanitcation failed: ${error}`
        })
    }
}

module.exports = auth