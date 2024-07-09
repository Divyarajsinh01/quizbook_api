const express = require('express')
const { signUpUser, getUser, getAllUser, login } = require('../controller/user.controller')

const userRouter = express.Router()


userRouter.post('/signup', signUpUser)
userRouter.post('/login', login)
userRouter.get('/profile/:id', getUser)
userRouter.get('/allUserData', getAllUser)

module.exports = userRouter