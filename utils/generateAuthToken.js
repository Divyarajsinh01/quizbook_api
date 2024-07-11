const jwt = require('jsonwebtoken')
const User = require('../model/user.model')


const genarateToken = async (id) => {
    try {
        const user = await User.findOne({_id : id})

    if(!user){
        throw new Error('user not found')
    }

    const token = jwt.sign({id}, 'nodejsQuizbookApp')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
    } catch (error) {
        throw error
    }
}

module.exports = genarateToken