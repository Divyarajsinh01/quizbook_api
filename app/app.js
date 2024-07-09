const express = require('express')
const userRouter = require('../router/user.router')
require('../config/dbConnect')
const app = express()

app.use(express.json())
app.use('/user', userRouter)

app.get('/', async(req, res) => {
    res.status(200).send('welcome!')
})

module.exports = app