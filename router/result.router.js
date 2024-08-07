const express = require('express')
const { addResults, user_history } = require('../controller/result.controller')
const auth = require('../middleware/auth')

const resultRouter = express.Router()


resultRouter.post('/add/result',auth, addResults)
resultRouter.get('/history', user_history)

module.exports = resultRouter