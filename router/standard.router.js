const express = require('express')
const { addStadndard, getStandard } = require('../controller/standard.controller')


const standardRouter = express.Router()


standardRouter.post('/add/stadndard', addStadndard)
standardRouter.get('/get/standard', getStandard)


module.exports = standardRouter