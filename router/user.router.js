const express = require('express')
const { signUpUser, getUser, getAllUser, login, addUser, logOutUser } = require('../controller/user.controller')
const auth = require('../middleware/auth')

const userRouter = express.Router()


userRouter.post('/signup', signUpUser)
userRouter.post('/login', login)
userRouter.get('/profile', auth ,getUser)
userRouter.get('/allUserData', getAllUser)
// userRouter.post('/add/user',addUser)
userRouter.post('/logout', auth, logOutUser)

module.exports = userRouter