const express = require('express')
const { addResults } = require('../controller/result.controller')
const auth = require('../middleware/auth')

const resultRouter = express.Router()


resultRouter.post('/add/result',auth, addResults)


module.exports = resultRouter