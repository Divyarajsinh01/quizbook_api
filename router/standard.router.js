const express = require('express')
const { addStadndard, getStandard, updateStandard } = require('../controller/standard.controller')


const standardRouter = express.Router()


standardRouter.post('/add/stadndard', addStadndard)
standardRouter.get('/get/standard', getStandard)
standardRouter.patch('/update/standard', updateStandard)

module.exports = standardRouter