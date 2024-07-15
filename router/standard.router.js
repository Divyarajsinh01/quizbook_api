const express = require('express')
const { addStadndard } = require('../controller/standard.controller')


const standardRouter = express.Router()


standardRouter.post('/add/stadndard', addStadndard)


module.exports = standardRouter