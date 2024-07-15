const express = require('express')
const userRouter = require('../router/user.router')
const standardRouter = require('../router/standard.router')
require('../config/dbConnect')
const app = express()

app.use(express.json())
app.use('/user', userRouter)
app.use(standardRouter)

app.get('/', async(req, res) => {
    res.status(200).send('welcome!')
})

module.exports = app